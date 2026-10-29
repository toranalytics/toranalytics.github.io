---
emoji: 🦜
title: 'I got tired of repeating myself to Claude Code, so I built Off the Wall'
date: '2026-10-29'
category: projects
tags: off-the-wall claude-code codex
description: 'Why I built Off the Wall, an open-source plugin that shows your own past corrections back to Claude Code and Codex word for word, what it does, what it cannot do, and how I tested it.'
lang: en
translationKey: otw-what-it-does
---

> English version of the [Korean original](/otw-what-it-does/). If they differ, the Korean article is authoritative.

> A model can't know your habits, like how you write commit messages or dates. I gave Claude 33 tasks like that. Without Off the Wall, Claude (Sonnet) followed the habit 2 times. With it, 20 times. It works because your own earlier correction is shown again, word for word. These are test habits I made up, not real users' records. With the haiku model it went from 1 to 17, and from 2 to 25 when I measured again.

```toc
```

## I kept saying the same things every session

If you work with Claude Code or Codex for a while, you end up repeating yourself. "Stop asking, just pick one." "Did you actually run the tests?" "Only do what I asked." Start a new session and the agent has forgotten all of it.

At first I squeezed each correction into a one-line rule and put it in CLAUDE.md. It did not help much. My guess is that the squeeze throws away the situation the correction came from: which test I wanted run, which file I said not to touch. The original sentence still has that. The one-line rule does not.

So I stopped shortening them. I built a plugin that shows what I said, word for word, before the agent answers. It is called Off the Wall. It works with Claude Code and Codex, it is open source (MIT), there is nothing else to install, and it runs on Node 18 or newer.

## How it works

Every time you send a request, it looks at the corrections saved for the same working folder and picks up to 6 whose original request looks like the new one. It cuts each at 200 characters and adds them to what the agent reads. Nothing shows up as a card on your screen; only the agent gets them. A line is added saying this is a record for reference, not a new instruction or permission.

Say you saved this earlier (every example in this post is made up):

> Don't just run lint and say tests pass. Run the checkout integration test and show the real exit code.

Later you ask "Verify the payment handler change with the checkout integration test." You can preview what would be attached with `otw explain`. This is real output on a made-up repository:

![Real otw explain output: the checkout-test correction is first with similarity 0.52](/img/otw-explain-related-en.png)

The right correction is on top with 0.52. But look further down: 0.04 and 0.05 are attached too. That is the current design, not a bug. Any request of 20 characters or more gets up to 6 quotes whatever the similarity, and the test results below are why I did it that way.

What about an unrelated request? I tried "write a haiku about autumn".

![Real otw explain output: a haiku request still gets three quotes](/img/otw-explain-unrelated-en.png)

Even the haiku gets 3 quotes. This is the biggest weakness of the plugin, so I am showing it first. It does not understand meaning. It picks by overlapping words and letter pairs.

## How corrections get saved

A model decides, on its own, whether your next message is fixing the previous answer, and saves it if so. It is on by default, and `capture: false` turns it off. That check runs through the `claude` or `codex` command you already use, so there is no separate API key. The part of the chat used for it goes to your model company. Records stay on your computer in `~/.otw`, and nothing goes to the author.

It does not slow your answers down. The check runs as its own process, and your request does not wait for it.

It also checks where a record came from. Messages a plugin sent automatically are not saved as your corrections. Old records with no source or folder are kept but never used. If the settings file is broken, the features stay off instead of running anyway.

It only uses the same working folder. It does not pull in corrections from other projects or fill the slots with recent ones. Subfolders and git worktrees count as separate projects.

## Commands I ended up adding

- `otw report`: has a model pick out, from the Claude Code and Codex chats already on your computer, the replies where you were fixing how the agent worked, and groups them by kind with your own words under each. `--seed` starts saving from that result. The grouping is done by a model and can be wrong.
- `otw status`: how many corrections are saved, when the hooks last ran, how many Codex entries you allowed. It also lists the Codex models it uses and the ones it skips because their description names no tier.
- `otw explain "<sentence>"`: the one above. It does not call a model and changes nothing. It is only in the latest source (main), not in the 0.3.1 release.
- `otw forget --all --yes` / `--project --yes`: deletes saved corrections, session records and the log. Without `--yes` it only shows what would go. It cannot delete your Claude Code or Codex chats, or anything already sent to the model company.

Right after install, before anything is saved, `otw status` tells you so:

![Real otw status output: the message shown when no corrections are stored yet](/img/otw-status-empty-en.png)

There is also a hint feature for helper agents: use a small model for search and conversion, a middle one for building and review, a large one for finding root causes and design, and a helper call that names no model is sent back once. It does not force a model and it does not promise lower cost.

## Install

In Claude Code:

```
/plugin install off-the-wall --marketplace toranalytics/off-the-wall
```

In Codex, then open `/hooks` once and allow the hooks. Until you do, nothing happens.

```bash
codex plugin marketplace add toranalytics/off-the-wall
codex plugin add off-the-wall@off-the-wall
```

To see what `report` looks like before installing, run it on the made-up chat history in the repository:

```bash
git clone https://github.com/toranalytics/off-the-wall && cd off-the-wall
node bin/otw.mjs report --host claude --claude-dir examples/claude-history --days 0
```

If you would rather look in the browser first, there is a [demo of showing corrections again](/otw-recall-lab.html) (the interface is in Korean). No install, no login, and every input is a made-up case. The source is on [GitHub](https://github.com/toranalytics/off-the-wall).

## How I tested it

Everything used made-up records. I ran Claude Code 2.1.311 automatically without a screen, with a small model (haiku) and a larger one (Sonnet). The numbers apply to these tests only. They do not show an effect in real use.

I turned 11 habits a model cannot know (commit format, tools, tone, date format and so on) into tasks and ran each 3 times. A model other than me wrote the tasks and the graders, grading is automatic, and I fixed the plan before the runs.

| Condition | First run (haiku) | Rerun after fixing a grader bug (haiku) | Sonnet |
|---|---|---|---|
| No Off the Wall | 1/33 | 2/33 | 2/33 |
| Earlier default (narrow search) | 9/33 | 14/33 | |
| Wide search (default since 0.3.0) | 17/33 | 25/33 | 20/33 |

- When the right correction was shown, the model followed it much more often. When it was not found, nothing changed.
- The same held for the larger model (Sonnet): better in 7 tasks, worse in none (hard to put down to chance, p = 0.016). Without Off the Wall the larger model also did not follow these habits.
- I fixed the grader after seeing the results, so the rerun is not an independent replication. The higher numbers come partly from the fix and partly from run-to-run variation, and I cannot separate the two.
- In 4 of the 11 tasks neither model followed the correction even when it was shown. Pasting 150 rules scored higher overall, but that does not work once the history grows.
- I have not measured Opus or the Codex models.

I also checked whether attaching quotes to unrelated requests does harm. I ran 14 tasks that have nothing to do with habits, 3 times each: no Off the Wall 40/42, wide search 41/42. The pass rate did not drop and output tokens rose about 9%. I did not test the protection for input under 20 characters with a model.

I tried several ways to cut the unrelated quotes, and none cleared the bar I had set, so none went in. I wrote that up in [a separate post](/en/otw-failed-attempts/).

I checked the real programs only once each. On Codex 0.162.1 I confirmed install, allowing the hooks, saving a correction and showing it again on the next request. On Claude Code 2.1.311 I confirmed, automatically, saving and showing again in a new session. In the third request of that test the model produced strangely long output for 6 minutes once (it did not appear in 8 reruns).

The code tests are 239 tests passing on Node 18, 20, 22 and 26, all with fake input and fake commands. CI runs on Windows, Linux and macOS with Node 18, 20 and 22.

## What it cannot do, and what to know

- It cannot promise fewer mistakes. It worked on test habits; I have not measured it on real usage records.
- It does not understand meaning, so unrelated requests get quotes too, as the screenshot shows. Since 0.3.0 every request of 20 characters or more gets up to 6 (about 300 tokens). Shorter input uses the earlier rule (closeness of 0.18 or more). Put `"recallWide": false` in the settings to turn this off.
- It can save a message that is not a correction, or miss a real one. On one person's chats, 82% of what it saved was right and it found 72% of the real corrections.
- The delete command exists since 0.3.1, but it cannot remove your Claude Code or Codex chats or copies at the model company.
- I did not check the screen where you use Claude Code directly. I ran it automatically without a screen and confirmed saving and showing again once, and that is all.
- The current version is the 0.3.1 pre-release, not a stable release.

If an unrelated correction showed up or a needed one was missing, please tell me through an [issue](https://github.com/toranalytics/off-the-wall/issues). It helps a lot, and you do not need to send original text, code or company names. Plans, scripts, data and the weaknesses found by an independent review are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs).
