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

I built Off the Wall, a plugin for Claude Code and Codex. It saves the corrections you give your agent and shows them again, word for word, when you ask for something similar later. This post is about what did not work, because that is where I learned the most.

## What I can say it does

A model can't know how you write commit messages or dates. I made up 11 habits like that and turned them into tasks, 3 runs each, 33 runs per condition, run headless.

- Claude Sonnet without the plugin followed the habit 2 times out of 33. With it: 20.
- With haiku: 1 to 17 in the first run, and 2 to 25 in a rerun.

These are habits I invented, not real users' records. I fixed a grader bug after seeing results, so the rerun is not an independent replication. I have not measured Opus or the Codex models.

## The problem I tried to fix

The plugin also attaches quotes to unrelated requests. On 8 prompts that have nothing to do with the stored corrections, it attached 1.8 quotes on average. I had written "if nothing is similar, nothing is attached". That was false, and I corrected it publicly.

This is what it looks like now, real `otw explain` output on a made-up repository with a haiku request:

![Real otw explain output: a haiku request still gets three quotes](/img/otw-explain-unrelated.png)

So I tried to cut that noise without losing the useful quotes. I wrote the plan and the pass bar first, then ran each idea.

## Five attempts

1. **Word conditions (two shared words, or one rare word).** On 150 stored corrections, unrelated quotes dropped from 6.0 to 2.0. On 240 corrections with repeated habits it went from 6.0 to 5.5. It did not generalize. Dropped.
2. **Six variants for short inputs.** None passed the bar. Kept the existing guard.
3. **A small local embedding model** (all-MiniLM-L6-v2). One setting cut noise a lot but lost too many useful quotes on held-out cases. Three more settings failed the same bar. Dropped.
4. **Show the original request next to each correction.** Quote only: 20 of 33. Quote plus request: 19 of 33. No gain. Not added.
5. **Merge repeats of the same correction** (an idea from a wiki-style memory). 18/40 against 20/40, a gain of 11%. My bar was 25%. Rejected.

## What I learned besides the results

- The runner cut my selection at 3 quotes in two experiments. The default is 6. I found it, wrote it down and left the original numbers in.
- One task's grader was wrong and I re-scored it after the fact. The original table stays, with the correction next to it.
- Passing my own tests never meant it helps real users. The real test is whether your own corrections pile up and come back at the right time. I do not have that evidence yet.

Code, plans, data and every failed run: https://github.com/toranalytics/off-the-wall (docs/). A plain-language overview: https://toranalytics.github.io/en/otw-what-it-does/

If an unrelated quote shows up in your session, or a needed one is missing, an issue would help a lot. You do not need to send your original text.
