---
emoji: 🦜
title: 'Off the Wall: when a past correction returns before a new request'
date: '2026-10-16'
category: projects
tags: off-the-wall claude-code codex
description: 'A record of measuring whether a model follows personal preferences when the Claude Code and Codex plugin Off the Wall shows it the original text of past corrections. Synthetic results (1/33, 9/33, 17/33), the limits, and the weaknesses an independent review found.'
lang: en
translationKey: off-the-wall
---

> **In plain words.** Off the Wall is a plugin that shows your own earlier corrections again, unshortened, before the agent answers. I gave Claude 33 tasks about habits a model can't know: without the plugin it followed the habit 2 times, with it 20 times (Claude Sonnet, test habits I made up). What it does and does not do is in the [plain-language article](/en/otw-what-it-does/). This article is the longer measurement log that came before it.
>
> Updated 2026-10-29. The same effect showed up with a larger model (Sonnet), and `otw forget`, which deletes saved corrections, shipped in 0.3.1. The latest numbers and limits are in the plain-language article.


> English translation of the [Korean original](/off-the-wall/). If they differ, the Korean article is authoritative.
>
> Updated 2026-10-28. For the first time, an effect was measured on personal preferences the model cannot know (section 7 below). The tests are synthetic, so the effect on real histories is still unknown.
>
> Updated 2026-10-27. The input-boundary fix shipped in the public release (0.2.0), and the 0.2.1 candidate (capture blocked on config errors, no saving after deletion, hook checks in `otw status`) was merged. I added a single run on a real Codex host and a prompt-length measurement.
>
> Updated 2026-10-23. I separated the past experiment, what the public code reproduces, and the user effect I have not yet confirmed.

When you correct a coding agent, the important thing was not only a rule like "do better next time". **What you corrected, in which request, and how** has to still be there before the next task.

[Off the Wall](https://github.com/toranalytics/off-the-wall) is an early plugin that quotes the saved text of your past corrections into the context of the next request in Claude Code and Codex. It is not a tool that guarantees better answers or lower cost.

**[See the recall demo without any personal history](/otw-recall-lab.html)**

The demo opens without installing or logging in. Every input is an invented case, and it shows the difference between the context the public hook actually returned and an empty store. It is not a staged before/after of an improved model answer. (The demo interface is in Korean.)

```toc
```

## 1. First, the moment the original text comes back

The following is **an invented demo case**, not a quote from a personal conversation.

> Don't just run lint and say "tests pass". Run the checkout integration test and show the real exit code.

Later, a new request arrives: "Verify the payment handler change with the checkout integration test." Instead of a generic "verify well", **which test and which evidence you asked for** comes back as the original text.

![Synthetic correction input and the context output of the real public hook](../../off-the-wall/recall-example.png)

*A screenshot of an isolated run on synthetic input. I did not run the model's next answer. As explained below, scope remarks from other tasks can get mixed in.*

The demo includes a case that keeps the task scope, a case where a delegated choice should not be asked about again, and a limit case where recent corrections enter even for an unrelated request. The corrections in the three core cases are older than the latest six.

## 2. What I actually verified this time

I ran the fixed commit `07fe3d3d4f4accc153eb0684f506e0d3c206fdcc` of public OTW 0.1.1 without modifying it.

- 4 synthetic requests × empty/stored state × Claude/Codex hook mode = 16 CLI hook runs.
- The stored corrections and requests are fixtures I wrote by hand. This did not verify automatic judging or extraction from past history.
- I checked that relevant and recent corrections are selected into `additionalContext`, and that future-dated corrections are excluded.
- I did not use personal history, a model provider, or real Claude Code/Codex host sessions.

**Recalled → the model follows → the real task succeeds → the user corrects less** are different stages. This reproduction confirmed only the first.

### 2-1. A single run on a real Codex host (added October 27)

The reproduction above ran only the hook, without a host. So I ran plugin 0.2.0 once in a real Codex on macOS (codex-cli 0.162.1) with an isolated home directory and synthetic prompts. I confirmed plugin installation, hook trust, saving a correction in one turn, that correction being injected as a developer message in the next turn, and `otw report` on the bundled example history (9 of 20 answers classified). The record is in the [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/live-codex-smoke-2026-10-27.md).

- **The hook does not run before you trust it.** After installing, nothing happens, silently. You must trust it in `/hooks`; since 0.2.1, `otw status` shows recent hook activity and the number of trusted entries.
- This was one run on one computer. I did not check whether the model followed the recalled correction.
- **I could not run Claude Code interactively.** At first there was no logged-in Claude Code to use. Later, in headless mode on Claude Code 2.1.311 with plugin 0.2.1, I confirmed once that a correction was saved and recalled in a new session. However, in the third turn of that same test the model produced abnormally long output for 6 minutes (it did not reproduce in an 8-run retest), and I have not checked interactive use. Record: [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/live-claude-smoke-2026-10-27.md).

## 3. What the current public version does

When you send a question, it first picks up to 3 saved corrections whose past requests resemble the new one in string features, then adds recent ones to quote up to 6. Search uses word and character-bigram TF-IDF; it does not guarantee semantic understanding or an exact judgment of scope.

When the judging feature is on, a separate process reviews the previous answer and your new message and saves correction candidates. `report` is an optional diagnostic that classifies corrections in existing conversation history. It also includes model-selection guidance, but I do not present that as automatic optimization or general cost saving.

The quote block is not a card shown in the user's chat window. It is **extra context passed to the model**. The demo in this article is a separate inspection screen for that hidden input.

## 4. Preserving the original text is not enough

For the demo's payment-test request, a one-off scope correction from another task ("fix only the login file") was selected too. Even for an unrelated question about Mars, the latest 6 corrections enter.

That a key sentence came in does not mean the whole selection is appropriate. You have to tell whether "this request" in the original text points to a past task, and whether it is a preference to keep holding now. I have not measured that the model actually behaved wrongly because of this.

The product's next review topics are separating lasting preferences from one-off task instructions, showing the origin of the original request, project, and scope, and handling unrelated recent items. **That does not mean they are shipped as public features.**

I also found an input-boundary problem: automatic plugin messages in the user role could be classified as human corrections. A fix with origin tags and working-directory-based recall shipped as 0.2.0. Even so, I cannot guarantee it filters out automatic input completely. I retracted the personal-history tallies I posted earlier on social media (the largest correction count among thousands, ratios, and so on) because this problem may have mixed into them, and I will not use them until I recheck.

## 5. What the past experiment tells you

Earlier, I reported an exploratory experiment that replayed 39 requests chosen from one person's history as text, without tools, using a model grader. The condition with 6 originals plus an objection-prediction instruction came out 25 wins, 11 ties, 3 losses against no attachment.

But the 17 wins, 14 ties, 8 losses in a direct comparison with random rules is not evidence of a definite advantage (reported two-sided p≈0.11). I also did not separate the original-text format from the prediction instruction, so you cannot call it the causal effect of the original text alone.

I checked the tallies and conditions in the preserved past run logs, but I did not independently rerun the original per-case outputs. Most execution and fact-checking work cannot be evaluated with this kind of text replay. **The real task success rate of the current public version, long-term retention, and average cost savings need separate verification.**

## 6. Data and cost

The default location for saved results and session state is the local `~/.otw`. However, judging and personal report analysis **send conversation excerpts to the model provider** through the Claude/Codex CLI you use. The claim "no data leaves your computer" is not accurate.

Even without a separate API key, provider calls can consume plan limits, usage, and fees.

I also measured once how much the recall block lengthens the prompt (Codex 0.162.1, 6 synthetic corrections, the second turn of `codex exec resume`). With recall off, input was 13,743 tokens; recall only, 14,028 (+285); subagent model-selection guidance only, 14,364 (+621); both on, 14,781 (+1,038). One run per condition, so treat it as a reference. I also observed the model-selection guidance injected twice in a resumed session; that duplication was fixed in 0.2.2 (with a resume test added). This measured only prompt size and does not mean answer quality or cost savings. Record: [measurement note](https://github.com/toranalytics/off-the-wall/blob/main/docs/token-overhead-2026-10-27.md). Judging runs as a separate process, but I cannot guarantee that the overall experience has no delay. Deleting the store and the provider's data handling are separate matters.

## 7. The October 28 measurement: does the model follow my habits it did not know?

The earlier tests picked mistakes the model already avoids well (running tests, finishing the job), so it scored full marks with recall on or off. Where OTW has to be useful is not there, but in **personal habits the model cannot know**: commit format, which package tool you use, tone of voice, date format.

So I turned 11 such preferences into tasks and ran each 3 times, 33 runs. The tasks and graders were written by a model other than the experimenter, and everything is auto-graded. I fixed the plan before running.

| Condition | Times the habit was followed |
|---|---|
| No OTW | 1/33 |
| OTW previous default (narrow search) | 9/33 |
| OTW wide search (`recallWide`, default since 0.3.0) | 17/33 |

- I changed the store and ran it again, and got the same size of gap (16/33 vs 8/33, 17/33 vs 9/33).
- The cause is search. When the right past correction enters the quote, the model follows much more often; when it is not found, nothing changes. Wide search finds it more often.
- The limits are also clear. 1 of the 11 tasks had a "one sentence" format that was too strict, so it was not followed even when the quote was visible. Another task that scored 0/3 turned out later to be a grader bug I found (it rejected answers wrapped in a code block); rereading the records, 5 of the 6 times the model saw the correction it followed it (a post-hoc recount, so the table keeps the original values, and it understates the real effect). I found no advantage on mistakes the model already avoids (14 of 16 tasks), and simply inserting 150 lines of rules scored higher overall. However, as the history grows, inserting all rules does not scale.
- After fixing the grader bug I ran the same store and tasks once more (99 runs): no OTW 2/33, previous default 14/33, wide search 25/33. Same direction; the higher numbers come partly from the fix and partly from run-to-run variation, so I did not replace the table above. Record: [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/preference-experiment-2026-10-28.md).
- What I still do not know: real users' long histories, models other than haiku and Sonnet (Opus, the Codex models), interactive use, long-term effects. (On October 29 I ran the same tasks with Sonnet too: no recall 2/33, current default 20/33.) These corrections are synthetic histories written by a model. Wide search has the cost of attaching up to 6 quotes (about 300 tokens) to every request, so I separately checked whether it interferes on 14 tasks unrelated to preferences (no OTW 40/42, wide search 41/42, no interference found; output tokens rose about 9%). So it has been on by default since 0.3.0, and inputs shorter than 20 characters use the old criterion (this safeguard itself is untested). To turn it off, put `"recallWide": false` in the settings.

The experiment records, plans, scripts, and even the weaknesses from the independent review are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs).

## 8. Before you try it

First look at the [synthetic recall demo](/otw-recall-lab.html). Analyzing real personal history and saving recall are a separate choice. The input-boundary fix is public but has not been verified enough by real use, so this article does not yet recommend running `report --seed` on personal history.

For installation and settings, check the [current README](https://github.com/toranalytics/off-the-wall). Codex requires a step of trusting the hook in `/hooks`; if you skip it, the hook silently does not run (you can check with `otw status`). On Windows, you have to distinguish CI test and hook runs from success in a real host session.

The feedback I most need is not only success stories. I want to know **whether an unrelated correction came back, whether a needed correction was missing, and whether the same mistake happened even after recall**. You can send it through [issues](https://github.com/toranalytics/off-the-wall/issues) without original text, code, or company names. I do not ask you to submit personal history or report text.
