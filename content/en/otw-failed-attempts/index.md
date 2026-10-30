---
emoji: 🦜
title: 'I tried five ways to improve my Claude Code plugin. None passed my own bar.'
date: '2026-10-29'
category: projects
tags: off-the-wall claude-code codex
description: 'Five attempts to cut unrelated quotes in Off the Wall, with the numbers and why none passed my own bar.'
lang: en
translationKey: otw-failed-attempts
---

> English version of the [Korean original](/otw-failed-attempts/). If they differ, the Korean article is authoritative.

Off the Wall is a plugin for Claude Code and Codex. It saves the corrections you give your agent and shows them again, word for word, when you ask for something similar later. This post is about what did not work. I learned more from that.

## First, what does work

A model can't know how you write commit messages or dates. I made up 11 habits like that and turned them into tasks, 3 runs each, 33 runs per condition, run headless.

- Claude Sonnet without the plugin followed the habit 2 times out of 33. With it: 20.
- With haiku: 1 to 17 in the first run, and 2 to 25 in a rerun.

These are habits I invented, not real users' records. I fixed a grader bug after seeing results, so the rerun is not an independent replication either. I have not measured Opus or the Codex models. The test design is in the [plain-language post](/en/otw-what-it-does/).

## The problem I wanted to fix

The plugin also attaches quotes to unrelated requests. On 8 prompts that had nothing to do with the stored corrections, it attached 1.8 quotes on average. I had first written "if nothing is similar, nothing is attached". That was false, and I corrected it publicly. Here is what it looks like now, real `otw explain` output on a made-up repository with a haiku request:

![Real otw explain output: a haiku request still gets three quotes](/img/otw-explain-unrelated-en.png)

I wanted to cut this noise and keep the useful quotes. Before running anything I wrote the plan and the pass bar into files, then ran the ideas one by one. Short version: none of the five passed.

## Attempt 1. A word condition

Attach only when two words overlap, or one rare word. On a store with 150 corrections, unrelated quotes dropped from 6.0 to 2.0. It looked great. On a store with 240 corrections where habits repeat, it went from 6.0 to 5.5, almost no change. A condition that works on one store only is not worth keeping, so I dropped it.

## Attempt 2. Six variants for short inputs

To cut the quotes attached to short inputs I made six variants. None passed the bar. I kept the guard that was already there (short input uses the older rule).

## Attempt 3. An embedding model

To see whether picking by meaning would work, I tried a small local embedding model (all-MiniLM-L6-v2). One setting cut the noise a lot, but on held-out cases it missed too many useful quotes. Three more settings failed the same bar.

## Attempt 4. Show the original request next to each correction

I checked whether showing "what I had asked back then" next to the correction helps the model follow it. Quote only: 20 of 33. Quote plus request: 19 of 33. No gain, so I did not add it.

## Attempt 5. Merge repeats of the same correction

An idea from a wiki-style memory: merge repeats into one. 18/40 against 20/40, a gain of 11%. My bar was 25%. Rejected.

## Three more after that (added October 30)

I wondered whether borrowing what the big memory tools do would make the effect larger, so I tested three more. Again the bar was set before each run, and again none cleared it.

**Attempt 6. Show a second wording of a repeated correction.** If the same correction was saved several times, show another wording of it instead of an unrelated quote at the bottom. Text similarity recognised only 40 of 90 repeats, and the policy lost one task where the target correction had been shown.

**Attempt 7. Ask the judge model whether it is a repeat.** At capture time I asked the judge whether a new correction is the same habit as an earlier one. It linked 73 of 90 repeats correctly (73 was the ceiling, since the right answer was among the 5 candidates for only that many), but it also linked 73 of 90 corrections that were not repeats. It could not tell "the same habit said again" from "another correction of the same kind".

**Attempt 8. Change the wording around the quotes.** I replaced the text around the quotes with "standing preferences, apply what fits" and "check your answer against these before replying". On haiku the passes out of 33 were 21 for the current wording and 22 and 20 for the new ones. No difference.

Looking at the tasks that were not followed, the cause was not the wording. For one task the correction never reached the model (a retrieval miss). For two tasks the correction was shown, but the model seems to have put the explicit current request ahead of the old habit (I did not read the raw outputs to confirm). If so, that is exactly what the block says to do ("the current request takes precedence"), so I leave it alone. These two are what remains.

Every experiment so far is listed with its result in the repository's [experiment list](https://github.com/toranalytics/off-the-wall/blob/main/docs/experiments.md).

## What I learned besides the results

- The runner cut my selection at 3 quotes in two experiments. The default is 6. I found it, wrote it down and left the original numbers in.
- One task's grader was wrong and I re-scored it afterwards. The original table stays, with the correction next to it.
- Passing a test I made is not the same as helping a real user. The real test is whether your own corrections pile up and come back at the right time. I do not have that evidence yet.

Code, plans, data and every failed run are in the [repository docs](https://github.com/toranalytics/off-the-wall/tree/main/docs). If an unrelated quote shows up in your session, or a needed one is missing, tell me through an [issue](https://github.com/toranalytics/off-the-wall/issues). You do not need to send your original text.
