---
emoji: 🧪
title: 'I counted my corrections to coding agents. Rules distilled from them did no better than random rules'
date: '2026-10-19'
category: experiments
tags: claude-code codex evaluation off-the-wall
---

I use Claude Code and Codex every day, and I kept typing the same things: "do all of it, not just one example",
"did you actually run it before saying it's done?". So I counted.

Across 6,752 of my own agent transcripts (4,990 messages I wrote myself), the most common corrections were:

| What I corrected | Times |
| :-- | --: |
| Did only part of what I asked ("do all 8, not one and 'the rest the same way'") | 174 |
| Said "done" without running it | 63 |
| Went back to a direction we had already dropped in an earlier session | 31 |
| Stopped and waited for approval instead of trying another way | 25 |
| Retried or raised a timeout instead of finding the cause | 18 |
| Put a heavy process on a trivial task | 12 |

Every one of these was fixed inside the session where I said it, and came back in the next one.

The standard fix is a rules file (`CLAUDE.md`, `AGENTS.md`): distil each correction into a tidy line like
"always run the tests before claiming completion". Plenty of tools now do this distilling automatically. I turned the
counts above into exactly such a rules file, and I also ran a tool that distils every correction into a one-line
"lesson" and attaches the latest ones to each prompt.

Then I checked whether the lessons stuck. Over 1,399 turns, the distiller flagged 580 corrections. In **392 of 578
(68%)** that came after a lesson existed, a Sonnet judge said following a lesson already attached would have avoided
the correction. The rule was in front of the agent, and I made the same correction anyway. So I tested what, if
anything, those rules were doing.

```toc
```

## The experiment

- **39 requests** from my history where I really did correct the very next answer, limited to corrections you can
  judge from the text alone (scope cut, "done" without checking, and so on).
- **Four conditions.** The same request, re-answered by Opus 5.5 with one of these attached:
  1. the correction I actually made next (the answer key, so this is the ceiling)
  2. six of my past corrections, verbatim (the three most similar to this request plus the latest), with
     "predict what this user would object to, and avoid it"
  3. three one-line lessons distilled from my past corrections, picked at random (a placebo)
  4. the three one-line lessons the distiller would actually attach (the newest ones)

  My rules file (`CLAUDE.md`) was the system prompt in every condition, so each one is measured on top of it.
- **Grading.** Sonnet compared each answer with the answer that had nothing attached, without knowing which was which.
  I asked in both A/B orders and counted a win only when both orders agreed.
- **Checking the grader first.** My first grader answered "did this reply avoid the correction?" YES/NO. It said yes
  33 of 40 times even when I matched each reply to *another* case's correction, so it measured nothing and I threw it
  out. The pairwise grader passes both checks: the ceiling beats nothing-attached 36 to 0, and against mismatched
  corrections it comes out near even (9 to 7, 23 ties).

## The result

![Quoting your words beats summarising them](evidence.png)

| Attached | Better | Tie | Worse |
| :-- | --: | --: | --: |
| The actual correction (ceiling) | 36 | 3 | 0 |
| **6 verbatim past corrections + predict the objection** | **25** | **11** | **3** |
| 3 random distilled lessons (placebo) | 18 | 15 | 6 |
| 3 distilled lessons the tool attaches | 14 | 17 | 8 |

1. **The lessons the tool picked did no better than random ones.** Random lessons beat nothing (18 vs 6, sign test
   p = 0.023); the picked ones did not (14 vs 8, p = 0.29). A short reminder of my recurring complaints helps a
   little; which reminder it is doesn't matter.
2. **Verbatim quotes beat both.** Head to head against random lessons, quotes went 17 better, 14 tie, 8 worse.

My reading: "always do the full scope" is true, but the model can't tell whether *this* request is one where the
rule bites. A verbatim line like "I said the root directory AND Obsidian, you did one" keeps the situation and the
tone, and the model recognises the next similar situation. Summarising throws that cue away.

## What I'm not claiming

- **This is one person's history.** 39 requests, one user, one answering model. It is a first result, not a law.
- **The grader is a model.** Blind and order-swapped, but still Sonnet judging Opus.
- **"Random" lessons were still my lessons.** My corrections cluster around a few themes (scope, don't ask,
  verify), so a random one is often roughly on topic. Someone with more varied corrections, or a better picker, may
  get a different result.
- **Only 39 of the 392 repeats could be judged from text.** Most corrections need the work actually run
  ("keep going until it works"), which a text replay can't grade.

The cheapest way to find out whether it holds is for someone else to run it on their own history. That is why I
turned it into a tool.

## The tool, briefly

[Off the Wall](https://github.com/toranalytics/off-the-wall) is condition 2 as a plugin for Claude Code and Codex:
it keeps your corrections word for word and quotes the most relevant ones before each answer. It needs no API key
(judging runs through the `claude`/`codex` CLI you already use) and everything stays in `~/.otw`.

The part I'd most like you to try is the report, which reads the history already on your machine and lists what
you correct most, in your own words:

![otw report output](report.png)

```bash
git clone https://github.com/toranalytics/off-the-wall && cd off-the-wall
node bin/otw.mjs report
```

If your top correction is different from mine, or quoting does nothing for you, I want to know:
[open an issue](https://github.com/toranalytics/off-the-wall/issues) with your report. The full experiment, the
judge accuracy (precision 0.82, recall 0.72 on 56 hand-labelled turns) and the subagent-routing side are in the
[longer write-up](/off-the-wall/) (Korean) and the [README](https://github.com/toranalytics/off-the-wall#evidence).
