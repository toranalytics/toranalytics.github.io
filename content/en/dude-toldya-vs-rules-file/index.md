---
emoji: ''
title: 'Why build Dude Toldya when one line in AGENTS.md would do? I compared them on Codex'
date: '2026-11-09'
category: experiments
tags: dude-toldya codex claude-code evaluation
description: 'On Codex with 11 made-up habits, I compared doing nothing, writing the habits as rules in AGENTS.md, and turning on Dude Toldya. The rules file scored higher. This post says what that result does and does not show.'
lang: en
translationKey: dude-toldya-vs-rules-file
---

> English version of the [Korean original](/dude-toldya-vs-rules-file/). If they differ, the Korean article is authoritative.

With coding agents, a habit problem can often be fixed by writing one line in a rules file. Put "commit messages use this format" in AGENTS.md or CLAUDE.md and you are done. So why do you need Dude Toldya? To answer that, I ran a direct comparison under the same conditions.

The short version: in this test, the rules file scored higher than Dude Toldya.

```toc
```

## How I compared them

The model is GPT-6.1-Sol in Codex CLI 0.162.1. The habits are 11 I made up, each with one task that checks it. Each condition ran 3 times per task, so 33 runs.

- **Nothing**: the plugin is installed but recall is off.
- **Rules file**: recall is off, and the 11 habits are written by hand as one-line rules in AGENTS.md.
- **Dude Toldya**: recall is on, and it brings back the stored corrections.

All three conditions installed the same plugin version (commit d10e79f). Only the settings above differed between them.

## Results

| Condition | Runs that followed the habit |
|---|---|
| Nothing | 8/33 |
| Rules file (AGENTS.md) | 30/33 |
| Dude Toldya | 27/33 |

![Codex comparison: nothing 8/33, rules file 30/33, Dude Toldya 27/33](/img/dude-toldya-codex-comparison-en.svg)

The rules file is 3 runs higher. This test cannot say whether that gap means anything. An independent audit confirmed that the 99 rows are unique and the totals add up, and no more than that. It did not conclude that either one is better, and it cannot conclude they are equal.

## What to watch for when reading these numbers

The three conditions show the model different things. With the rules file, all 11 rules go in every time. Dude Toldya picks the corrections that look relevant to each request, and it missed on some tasks. In 6 runs (two tasks, three runs each), I could not find the opening sentence of the target correction in the transcript. One of those tasks scored 0/3 with Dude Toldya and 3/3 with the rules file. The other scored 3/3 with Dude Toldya and 1/3 with the rules file.

Finding that sentence is not an exact measure either. Not finding it does not prove the target correction never reached the model, and finding it does not prove it changed the answer. The scorers check specific conditions per task and do not judge overall answer quality.

This is also one model and 11 made-up habits. It says nothing about Claude Code, real usage histories, or other models.

## So is a rules file enough?

If a habit is one you already know and can write down, this test points to the rules file working well. For those habits, a rules file is simpler.

What Dude Toldya tries to do is different. It brings back things you never turned into rules and that exist only as something you said during a session. This test did not measure that situation, because in the rules-file condition I had already organized the 11 habits and put them in. Which one is better once unorganized corrections pile up is not something this test can answer.

So what I can say now is limited. With 11 made-up habits on Codex, Dude Toldya did better than doing nothing (8/33 to 27/33), and the rules file was the same or higher (30/33). Anything beyond that needs measuring for yourself.

## Measuring it yourself

`duto bench` in the repository runs 11 habit tasks through your own `claude` CLI, once with recall off and once with it on. The Codex versus rules-file comparison in this post is not part of that command. I keep the run logs and rules for this comparison separately, and before publishing them I have to decide in what form they go into the repository. The only test record published so far is the [Claude Haiku bench](https://github.com/toranalytics/dude-toldya/blob/main/docs/data/bench-public-031/result.md).
