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

> English version of the [Korean original](/off-the-wall/). If they differ, the Korean article is authoritative.

> In plain words, Off the Wall is a plugin that shows my own earlier corrections again, unshortened, before the agent answers. I gave Claude 33 tasks about habits a model can't know: without the plugin it followed the habit 2 times, with it 20 times (Claude Sonnet, test habits I made up). What it does and does not do is in the [plain-language post](/en/otw-what-it-does/). This post is the longer measurement log I wrote before it.
>
> Update history. 2026-10-29: the same effect showed up with a larger model (Sonnet), and `otw forget`, which deletes saved corrections, shipped in 0.3.1. 2026-10-28: the first measurement of an effect on personal preferences the model cannot know (section 7 below). 2026-10-27: the input-boundary fix shipped in 0.2.0, and I added a single run on a real Codex host. 2026-10-23: I separated what the old experiment shows from what the public plugin demonstrates. The latest numbers and limits are in the plain-language post.

When you correct a coding agent, the important thing was not only a rule like "do better next time". What you corrected, in which request, and how has to still be there before the next task.

[Off the Wall](https://github.com/toranalytics/off-the-wall) is an early plugin that quotes the saved text of your past corrections into the context of the next request in Claude Code and Codex. It is not a tool that guarantees better answers or lower cost.

**[See the recall demo without any personal history](/otw-recall-lab.html)**

The demo opens with no install and no login. Every input is a made-up case, and it shows the context the public hook really returned next to an empty store. It is not a staged before/after of a better model answer.

```toc
```

## 1. The moment the original text comes back

The example below is not from a personal chat. I made it up for the demo.

> Don't just run lint and say "tests pass". Run the checkout integration test and show the real exit code.

Later I send a new request: "Verify the payment handler change with the checkout integration test." Instead of a general "verify well", the exact test and the exact evidence I asked for come back in the context, in my own words.

![Synthetic correction input and the context output of the real public hook](../../off-the-wall/recall-example.png)

*A screen from an isolated run on synthetic input. I did not run the model's next answer. Corrections about other tasks' scope get mixed in too, which is a limit I come back to in section 4.*

The demo has a case that keeps the task scope, a case where I delegated the choice so the agent should not ask again, and a limit case where an unrelated request still receives recent corrections. The corrections for the three core cases are older than the latest 6 items.

## 2. What I actually checked

I ran the fixed commit `07fe3d3d4f4accc153eb0684f506e0d3c206fdcc` of public OTW 0.1.1 without changing it.

- 4 synthetic requests × empty and stored states × Claude and Codex hook modes: 16 CLI hook runs in total.
- The stored corrections and requests are fixtures I made by hand. I did not verify automatic judging or extraction from past history.
- I checked that related, recent corrections are selected and end up in `additionalContext`, and that future-dated corrections are left out.
- I used no personal history, no model provider and no real Claude Code or Codex session.

Recalled, followed by the model, the real task succeeding, and the user correcting less are different stages. This reproduction only confirmed the first.

### 2-1. One run on a real Codex (added October 27)

The reproduction above ran the hooks without a host. So I ran plugin 0.2.0 once on a real Codex on macOS (codex-cli 0.162.1) with an isolated home directory and synthetic prompts. I confirmed plugin install, hook trust, saving a correction in one turn, that correction being injected as a developer message in the next turn, and `otw report` on the bundled example history (9 of 20 answers classified). The record is in the [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/live-codex-smoke-2026-10-27.md).

- Hooks do not run before you trust them. After install only, nothing happens, quietly. You have to trust them in `/hooks`, and since 0.2.1 `otw status` shows recent hook activity and the number of trusted entries.
- It is one run on one computer. I did not check whether the model followed the recalled correction.
- I could not run Claude Code interactively. At first there was no logged-in Claude Code, so I could not. Later I confirmed saving a correction and recalling it in a new session once, with plugin 0.2.1 in headless mode on Claude Code 2.1.311. In the third turn of the same test the model produced strangely long output for 6 minutes once (it did not reproduce in 8 reruns), and I did not check interactive use. The record is in the [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/live-claude-smoke-2026-10-27.md).

## 3. What the public version does now

When first published, it picked up to 3 saved corrections whose past requests resemble the new one in string features, then filled up to 6 with recent ones. Since 0.3.0 `recallWide` is on by default: a request of 20 characters or more gets up to 6 corrections ranked by similarity, and ones with no overlap at all are left out. Search is word and character-bigram TF-IDF, so I do not claim it understands meaning or judges scope exactly.

When the judging feature is on, a separate process reviews the previous answer and your new message and saves correction candidates. `report` is an optional diagnostic that classifies corrections in existing chats. There is also a model-selection hint, but I do not present it as automatic optimization or a general cost saving.

The quoted block is not a card in your chat window. It is extra context handed to the model. The demo in this post is a separate inspection screen for that hidden input.

## 4. Preserving the original text is not enough

For the payment test request in the demo, a one-off scope correction from another task, "only fix the login file", was selected too. For an unrelated question about Mars, the latest 6 corrections came in.

The key sentence coming in does not make the whole selection appropriate. I have to tell whether "this request" in the original points at a past task, and whether it is a preference that should still hold. I have not measured a case where the model actually behaved wrongly because of this.

What I want to look at next is separating standing preferences from one-off task instructions, showing the original request, project and scope as the source, and handling unrelated recent items. That does not mean it is already a public feature.

I also found an input-boundary problem: an automatic plugin message in a user role can be classified like a human correction. A fix with origin tags and working-directory recall shipped in 0.2.0. Even so, I cannot promise it filters all automatic input. A tally of my personal history that I once posted on social media (the most corrections out of several thousand, a rate and so on) may have been mixed up by this problem, so I retracted it and will not use it until I recheck.

## 5. What the old experiment says

Earlier I reported an exploratory experiment that replayed 39 requests picked from one person's history as text, without tools, and graded with a model. The condition with 6 quotes plus an instruction to predict the person's objection was tallied at 25 wins, 11 ties and 3 losses against attaching nothing.

But the direct comparison with random rules, 17 wins, 14 ties and 8 losses, is not solid evidence of an advantage (reported two-sided p of about 0.11). The quote format and the prediction instruction were not separated, so I cannot call it the causal effect of the original text alone.

I checked the totals and the conditions in the saved execution logs, but I did not independently rerun the original per-case outputs. Most work that needs running things or checking facts cannot be evaluated by this kind of text replay. The real task success rate of the current public version, long-term retention and average cost saving need separate verification.

## 6. Data and cost

Saved results and session state live by default in local `~/.otw`. But judging and personal report analysis send conversation excerpts through the Claude or Codex CLI I use to that model provider. The statement "no data leaves the computer" is not true. Even without a separate API key, provider calls can use plan limits, usage and fees.

I also measured once how much the recall block grows the prompt (Codex 0.162.1, 6 synthetic corrections, the second turn of `codex exec resume`). With recall off the input was 13,743 tokens, recall only 14,028 (+285), subagent model-selection hint only 14,364 (+621), both 14,781 (+1,038). One run per condition, so it is for reference. I also saw the model-selection hint injected twice in a resumed session, and I fixed that duplication in 0.2.2 (a resume test was added). This measured prompt size only, not answer quality or cost saving. The record is in the [measurement note](https://github.com/toranalytics/off-the-wall/blob/main/docs/token-overhead-2026-10-27.md). Judging runs in a separate process, but I do not guarantee there is no delay in the whole experience. Deleting the store and the provider's handling of data are separate things.

## 7. The October 28 measurement: does the model follow habits it didn't know

The earlier tests picked mistakes the model already avoids (running tests, finishing the job), so it got full marks with recall on or off. The place where OTW has to be useful is not there. It is personal habits the model cannot know: commit format, package tool, tone, date format.

So I turned 11 such preferences into tasks and ran each 3 times, 33 runs. A model other than me wrote the tasks and the graders, and grading is fully automatic. I fixed the plan before the runs.

| Condition | Times the habit was followed |
|---|---|
| No OTW | 1/33 |
| OTW earlier default (narrow search) | 9/33 |
| OTW wide search (`recallWide`, default since 0.3.0) | 17/33 |

- I switched to another store and reran it, and a gap of a similar size came out (16/33 against 8/33, 17/33 against 9/33).
- The cause is search. When the right past correction makes it into the quotes the model follows much more often, and when it is not found nothing changes. Wide search finds it more often.
- The limits are clear too. In 1 of the 11 tasks the "one sentence" format was too strict, so the model did not follow even with the quote shown. Another task at 0/3 turned out to be a grader bug I found later (it failed answers wrapped in a code block), and on rereading the records 5 of the 6 runs that saw the correction followed it (a later regrading, so the number in the table stays as it was, and it understates the real effect). I found no benefit on mistakes the model already avoids (14 of 16 tasks), and just pasting 150 rules scored higher overall. But once the history grows, pasting all the rules does not work.
- After fixing the grader bug I ran the same store and tasks once more (99 runs): no recall 2/33, earlier default 14/33, wide search 25/33. The direction is the same. The numbers went up partly from the fix and partly from run-to-run variation, so I did not change the table above. The record is in the [repository docs](https://github.com/toranalytics/off-the-wall/blob/main/docs/preference-experiment-2026-10-28.md).
- What I still don't know: real users' long histories, models other than haiku and Sonnet (Opus, Codex models), interactive use, long-term effects. (On October 29 I ran the same tasks on Sonnet: no recall 2/33, current default 20/33.) These corrections are synthetic records written by a model. Wide search has a cost of attaching up to 6 quotes (about 300 tokens) to every request, so I also checked separately whether it gets in the way on 14 tasks unrelated to preferences (no OTW 40/42, wide search 41/42, no interference seen; output tokens rose about 9%). That is why I turned it on by default from 0.3.0, and input under 20 characters uses the earlier rule (I did not test that protection itself). To turn it off, put `"recallWide": false` in the settings.

The experiment records, plans, scripts and the weaknesses found by an independent review are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs).

## 8. Before you try it

I'd like you to look at the [synthetic recall demo](/otw-recall-lab.html) first. Analysis of your own history and saving recall are separate choices. The input-boundary fix is public but has not been checked enough in real use, so this post does not yet recommend running `report --seed` on personal history.

For install and settings, see the [current README](https://github.com/toranalytics/off-the-wall). Codex needs the step of trusting hooks in `/hooks`, and if you skip it the hooks quietly do not run (`otw status` shows it). On Windows, keep passing tests and hook runs in CI separate from success in a real host session.

The feedback I need most is not only success stories. I want to know whether an unrelated correction came back, whether a needed one was missing, and whether the agent made the same mistake even after the recall. You can tell me through an [issue](https://github.com/toranalytics/off-the-wall/issues) without original text, code or company names. I am not asking for personal records or report text.
