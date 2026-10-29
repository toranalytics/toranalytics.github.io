---
emoji: 🦜
title: 'Off the Wall: a plugin that shows your past corrections back to your coding agent, word for word'
date: '2026-10-29'
category: projects
tags: off-the-wall claude-code codex
description: 'What the open-source Claude Code and Codex plugin Off the Wall does and does not do: it quotes your own past corrections, unsummarized, in front of the next answer.'
lang: en
translationKey: otw-what-it-does
---

> English translation of the [Korean original](/otw-what-it-does/). If they differ, the Korean article is authoritative.

Off the Wall is a plugin for Claude Code and Codex. It saves the corrections you give your agent ("stop asking, just pick one", "did you actually run the tests?") on your machine and, when you send a similar request later, shows them to the agent **in your own words**. It is open source (MIT), has no dependencies, and runs on Node 18 or newer.

> **Without Off the Wall, Claude followed a personal habit it could not know 2 times out of 33. With it: 20 out of 33.** Same tasks, Claude Code with Sonnet; with haiku the same jump was 1 to 17, and 2 to 25 in a rerun. Synthetic habits, 3 runs per cell, headless. The details are under "Test details" below.

```toc
```

## In one sentence

> Your corrections from the same working directory, quoted word for word, in front of the agent's next answer.

## What makes it different

1. **It shows the original text, not a summary.** Squeezing a correction into a one-line rule drops the context it came from. The original keeps details such as which test you asked for or which file was off limits.
2. **It only uses the same working directory.** It does not add corrections from other projects or filler made of recent ones. Subdirectories and git worktrees count as separate projects.
3. **No separate API key.** Judging whether a message is a correction runs through the `claude` or `codex` CLI you already use. The excerpts used for judging are still processed by your provider.
4. **It does not slow the answer down.** Judging runs in a detached process, and your prompt does not wait for it.
5. **Records stay on your machine (`~/.otw`).** There is no collection by the publisher.
6. **It tags origin and skips uncertain records.** Automatic plugin messages are filtered out so they are not saved as your corrections, and older records without an origin or working directory are kept but not recalled. If the settings file is invalid, features stay off instead of running silently.

## What it does, exactly

**1. Puts past corrections in front of your next request.**
On each prompt it picks up to 6 corrections from the same working directory whose past requests resemble the new one in character pieces, cuts each at 200 characters, and adds them to the agent's context. This is not a card in your chat window; it goes to the agent only. The block also says that history is not a new instruction or permission to act, publish or delete. (A demo example is below.)

> Saved correction: Don't just run lint and say "tests pass". Run the checkout integration test and show the real exit code.
> New request: Verify the payment handler change with the checkout integration test.
> What the agent receives: the correction above, verbatim.

**2. Saves your corrections automatically.**
A separate process has a model judge whether your next message corrects the previous answer, and saves it if so. This is on by default; set `capture: false` to turn it off.

**3. Shows what you correct most.**
`otw report` has a model classify, from the Claude Code and Codex history already on your machine, which of your replies tried to fix how the agent worked, and lists the kinds you corrected most with your own words. Add `--seed` to start recall from that result. The classification is by a model and can be wrong.

**4. Shows its state.**
`otw status` shows the number of stored records, recent hook activity, and the number of trusted Codex entries.

**5. Deletes your records.**
`otw forget` deletes the stored records, everything or one working directory at a time (since 0.3.1).

**6. Gives subagent model-selection guidance.**
It tells the agent to use a small model for search and conversion, a mid model for implementation and review, and a large model for root-cause analysis and design, and sends back a subagent call that names no model once. It does not force a model or guarantee cost savings.

## What it cannot do, and what to know

- **There is no guarantee of fewer mistakes.** In synthetic tests, models followed the preference much more often when the right correction was quoted, but I have not measured the effect on a real history.
- **It does not select by meaning.** It picks by overlap of words and two-character pieces. There is no guarantee the selected corrections relate to the current request.
- **It attaches to unrelated requests too.** Since 0.3.0, every prompt of 20 or more characters gets up to 6 quotes (about 300 tokens). Shorter inputs use the old criterion (similarity 0.18). Set `"recallWide": false` to turn this off.
- **It can save non-corrections or miss corrections.** On one person's history the judge had precision 0.82 and recall 0.72.
- **Deleting is one command.** Since 0.3.1, `otw forget --all --yes` deletes the stored records, session state and log, and `otw forget --project --yes` deletes only the current working directory's records (without `--yes` it only shows what would go). It does not remove your Claude Code or Codex histories or copies at the provider.
- **Codex needs a one-time trust step.** Until you trust the hooks in `/hooks`, they silently do not run.
- **Interactive Claude Code use is unverified.** I confirmed saving and recall once in headless mode.
- The current version is the 0.3.1 pre-release, not a stable release.

## Try it

Claude Code:

```
/plugin install off-the-wall --marketplace toranalytics/off-the-wall
```

Codex:

```bash
codex plugin marketplace add toranalytics/off-the-wall
codex plugin add off-the-wall@off-the-wall
```

In Codex, open `/hooks` once and trust the hooks. To see the output format before installing, run `report` on the made-up history in the repository.

```bash
git clone https://github.com/toranalytics/off-the-wall && cd off-the-wall
node bin/otw.mjs report --host claude --claude-dir examples/claude-history --days 0
```

If you would rather look in the browser first, there is a [synthetic recall demo](/otw-recall-lab.html) (the interface is in Korean). It needs no install or login, and every input is an invented case. Source and settings are on [GitHub](https://github.com/toranalytics/off-the-wall).

## Test details

Everything below used synthetic records, run in Claude Code 2.1.311 headless mode with a small model (haiku) and a larger one (Sonnet). The numbers apply to these tests only and do not show an effect in real use.

**Does the model follow personal preferences?** I made 11 personal habits the model cannot know (commit format, tooling, tone, date format and so on) into tasks and ran each 3 times. The tasks and graders were written by a different model, scoring is automatic, and the plan was fixed before the runs.

| Condition | First run | Re-run after fixing a grader bug |
|---|---|---|
| No OTW | 1/33 | 2/33 |
| Previous default (narrow search) | 9/33 | 14/33 |
| Wide search (default in 0.3.0) | 17/33 | 25/33 |

- When the right correction was in the quote the model followed it much more often; when it was not found, nothing changed.
- I fixed the grader after seeing the results, so the re-run is not an independent replication. The higher numbers come partly from the fix and partly from run-to-run variation, and the two cannot be separated.
- One task had a "one sentence" format so strict that it was not followed even with the quote visible, and another (c104) scored 0/3 in every condition.
- On habits the model already keeps (14 of 16 tasks) I found no advantage, and simply inserting 150 lines of rules scored higher overall. That approach does not scale as history grows.

**Does it hold for a larger model?** I ran the same tasks and store with Sonnet instead of haiku, 3 runs each, 66 runs. No recall 2/33, current default 20/33; better in 7 tasks, worse in none (sign test p = 0.016). The larger model also did not follow these habits without recall. I have not measured Opus or the Codex models.

**Is wide search harmful?** On 14 tasks unrelated to preferences, 3 runs each: no OTW 40/42, wide search 41/42. No pass loss; output tokens rose about 9%. The protection for inputs under 20 characters was not tested.

**An attempt to cut quotes on unrelated requests.** I tried requiring word overlap. On a 150-record store it cut 6.0 quotes to 2.0, but on a 240-record store it stayed at 5.5, and on small stores the rate of finding the target dropped. With little gain I removed it.

**The 39-request replay (earlier experiment).** I replayed 39 real requests from one person as text. 6 past corrections plus an "predict what this person would object to" line beat attaching nothing, 25 wins, 11 ties, 3 losses. The direct comparison with random rules, 17 wins, 14 ties, 8 losses, is not evidence of a definite advantage. Quotes and the prediction line were tested together, and I have not rerun this with the current selection.

**Real hosts.** On Codex 0.162.1 I confirmed plugin install, hook trust, saving a correction and recalling it on the next turn once. On Claude Code 2.1.311 in headless mode I confirmed saving and recall in a new session once; in the third turn of the same test the model produced abnormally long output for 6 minutes once (not reproduced in an 8-run retest).

**Code tests.** 227 unit and integration tests pass on Node 18, 20, 22 and 26, all with synthetic input and fake CLIs. CI runs on Windows, Linux and macOS with Node 18, 20 and 22.

Plans, scripts, data and the weaknesses found by an independent review are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs). The most useful feedback is a case where an unrelated correction came back or a needed one was missing. Please send it as an [issue](https://github.com/toranalytics/off-the-wall/issues); there is no need to include original text, code or company names.
