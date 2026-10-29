---
emoji: 🦜
title: 'Off the Wall: a plugin that shows your past corrections back to your coding agent, word for word'
date: '2026-10-29'
category: projects
tags: off-the-wall claude-code codex
description: 'A plain-language account of what the open-source Claude Code and Codex plugin Off the Wall does and does not do: it shows your own past corrections again, unshortened, before the next answer.'
lang: en
translationKey: otw-what-it-does
---

> English translation of the [Korean original](/otw-what-it-does/). If they differ, the Korean article is authoritative.

> **A model can't know your habits, like how you write commit messages or dates. I gave Claude 33 tasks like that. Without Off the Wall, Claude (Sonnet) followed the habit 2 times. With it, 20 times.** It works because your own earlier correction is shown again, word for word. These are test habits I made up, not real users' records. With the haiku model it went from 1 to 17, and from 2 to 25 when I measured again. The details are under "Test results" below.

Off the Wall is a plugin for Claude Code and Codex. It saves the corrections you give your agent on your own computer. When you ask for something similar later, it shows those corrections again, in your own words. It is open source (MIT), has no packages to install, and runs on Node 18 or newer.

```toc
```

## In one sentence

Your earlier corrections from the same folder, shown again unshortened before the agent answers.

## Why I built it

A coding agent does not remember earlier chats. So you keep saying "stop asking, just pick one" and "did you actually run the tests?". If you squeeze a correction into a one-line rule, the situation it came from is lost: which test you asked for, which file you said not to touch. The original words still have that.

## How it differs

- It shows what you said, not a summary.
- It only uses the same working folder. It does not pull corrections from other projects or fill the slots with recent ones. Subfolders and git worktrees count as different projects.
- No separate API key. Deciding whether a message is a correction runs through the `claude` or `codex` command you already use. The part of the chat used for that goes to your model company.
- It does not slow your answers. That check runs on its own, and your request does not wait for it.
- Records stay on your computer (`~/.otw`). Nothing goes to the author.
- It checks where a record came from. Messages a plugin sent automatically are not saved as your corrections, and old records without a source or folder are kept but not used. If the settings file is broken, the features stay off.

## What it can do

**1. Show earlier corrections again.** Each time you send a request, it picks up to 6 saved corrections from the same folder whose original request looks like the new one, and cuts each at 200 characters. It adds them to what the agent reads. They do not appear as a card on your screen; only the agent gets them. A line is added saying this is not a new instruction or permission.

For example (an invented case): you saved "Don't just run lint and say tests pass. Run the checkout integration test and show the real exit code." Later you ask "Verify the payment handler change with the checkout integration test." The agent gets that correction word for word.

You can preview what would be attached with `otw explain`. This is real output on a made-up repository (the 0.52 is how close the match is):

![Real otw explain output: the checkout-test correction is first with similarity 0.52](/img/otw-explain-related.png)

The lower ones (0.04, 0.05) are attached too. That is the current design, not a bug. For an unrelated request such as a haiku about autumn, three quotes are still attached. This is the plugin's biggest weakness, so I show it up front:

![Real otw explain output: a haiku request still gets three quotes](/img/otw-explain-unrelated.png)

**2. Save your corrections automatically.** A model checks, on its own, whether your next message is fixing the previous answer, and saves it if so. This is on by default; `capture: false` turns it off.

**3. Show what you correct most.** `otw report` has a model pick out, from the Claude Code and Codex chats already on your computer, the replies where you were fixing how the agent worked, and groups them by kind with your own words. `--seed` starts saving from that result. The grouping is done by a model and can be wrong.

**4. Show its status.** `otw status` shows how many corrections are saved, when the hooks last ran and how many Codex entries you allowed. If nothing is saved yet it says so. It also lists the Codex models it uses and any model it does not use because its description names no tier.

**5. Preview what would be shown.** `otw explain "<sentence>"` shows which corrections would be attached to that sentence, with how close each match is. It does not call a model and changes nothing. This command is only in the latest source (main), not in the 0.3.1 release.

**6. Delete your records.** `otw forget --all --yes` deletes the saved corrections, session records and log. `otw forget --project --yes` deletes only the current folder's records. Without `--yes` it only shows what would go. It cannot delete your Claude Code or Codex chats or anything already sent to the model company.

**7. Suggest which model a helper agent should use.** It tells the agent to use a small model for search and conversion, a middle one for building and review, and a large one for finding root causes and design, and sends back once any helper call that names no model. It does not force a model and does not promise lower cost.

## What it cannot do, and what to know

- It cannot promise fewer mistakes. It worked on test habits; I have not measured it on real usage records.
- It does not understand meaning. It matches by overlapping words and letter pairs, so a picked correction may not relate to the request.
- It can attach quotes to unrelated requests. Since 0.3.0 every request of 20 characters or more gets up to 6 (about 300 tokens). Shorter input uses the earlier rule (closeness of 0.18 or more). Put `"recallWide": false` in the settings to turn this off.
- It can save a message that is not a correction, or miss a real one. On one person's chats, 82% of what it saved was right and it found 72% of the real corrections.
- The delete command exists since 0.3.1, but it cannot remove your Claude Code or Codex chats or copies at the model company.
- In Codex you must allow the hooks once in `/hooks`. Until then nothing happens.
- I did not check the screen where you use Claude Code directly. I ran it automatically without a screen and confirmed saving and showing again once.
- The current version is the 0.3.1 pre-release, not a stable release.

## Try it

In Claude Code:

```
/plugin install off-the-wall --marketplace toranalytics/off-the-wall
```

In Codex:

```bash
codex plugin marketplace add toranalytics/off-the-wall
codex plugin add off-the-wall@off-the-wall
```

In Codex, open `/hooks` once and allow the hooks. To see what the output looks like before installing, run `report` on the made-up chat history in the repository.

```bash
git clone https://github.com/toranalytics/off-the-wall && cd off-the-wall
node bin/otw.mjs report --host claude --claude-dir examples/claude-history --days 0
```

To look in the browser first, there is a [demo of showing corrections again](/otw-recall-lab.html) (the interface is in Korean). It needs no install or login, and every input is an invented case. The source is on [GitHub](https://github.com/toranalytics/off-the-wall).

## Test results

All of this used made-up records. I ran Claude Code 2.1.311 automatically without a screen, with a small model (haiku) and a larger one (Sonnet). The numbers apply to these tests only and do not show an effect in real use.

**Does the model follow personal habits?** I turned 11 habits a model cannot know (commit format, tools, tone, date format and so on) into tasks and ran each 3 times. A model other than me wrote the tasks and the graders, grading is automatic, and I fixed the plan before the runs.

| Condition | First run (haiku) | Rerun after fixing a grader bug (haiku) | Sonnet |
|---|---|---|---|
| No Off the Wall | 1/33 | 2/33 | 2/33 |
| Earlier default (narrow search) | 9/33 | 14/33 | |
| Wide search (default since 0.3.0) | 17/33 | 25/33 | 20/33 |

- When the right correction was shown, the model followed it much more often. When it was not found, nothing changed.
- The same held for the larger model (Sonnet): better in 7 tasks, worse in none (hard to put down to chance, p = 0.016). Without Off the Wall the larger model also did not follow these habits.
- I fixed the grader after seeing the results, so the rerun is not an independent replication. The higher numbers come partly from the fix and partly from run-to-run variation, and I cannot separate the two.
- In 4 of the 11 tasks neither model followed the correction even when it was shown. Simply pasting 150 rules scored higher overall, but that does not work once the history grows.
- I have not measured Opus or the Codex models.

**Does it hurt when it is attached to unrelated requests?** I ran 14 tasks that have nothing to do with habits, 3 times each: no Off the Wall 40/42, wide search 41/42. The pass rate did not drop and output tokens rose about 9%. I did not test the protection for input under 20 characters with a model.

**Every attempt to improve it was left out.** To cut quotes on unrelated requests I tried a word condition: on 150 records 6 quotes became 2, but on 240 records it stayed at about 5.5. An embedding model removed almost all the quotes but also missed relevant ones. Adding the original request next to each correction gave no gain (19 of 33 against 20 without). Merging repeats of the same correction had little effect. The records are in the repository docs.

**The earlier replay of 39 requests.** I replayed 39 real requests from one person as text. Six corrections plus a line "predict what this person would object to" beat adding nothing, 25 wins, 11 ties, 3 losses. The direct comparison with random rules, 17 wins, 14 ties, 8 losses, is not solid evidence of an advantage. Corrections and the prediction line were tested together, and I have not rerun it with the current selection.

**Checks in the real programs.** On Codex 0.162.1 I confirmed install, allowing hooks, saving a correction and showing it again on the next request, once. On Claude Code 2.1.311 I confirmed, automatically, saving and showing again in a new session, once. In the third request of the same test the model produced strangely long output for 6 minutes once (it did not appear in 8 reruns).

**Code tests.** 239 tests pass on Node 18, 20, 22 and 26, all with fake input and fake commands. CI runs on Windows, Linux and macOS with Node 18, 20 and 22.

Plans, scripts, data and the weaknesses found by an independent review are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs). If an unrelated correction showed up or a needed one was missing, please tell me through an [issue](https://github.com/toranalytics/off-the-wall/issues). You do not need to send original text, code or company names.
