---
emoji: 🧪
title: 'What correction quotes preserve, and what a replay does not prove'
date: '2026-10-19'
category: experiments
tags: claude-code codex evaluation off-the-wall
description: 'A replay of 39 requests compared quoting a developer''s own past corrections with short rules. This post says what that replay does and does not prove about Off the Wall.'
lang: en
translationKey: rules-vs-quotes
---

> In plain words: this is about an older test where I replayed 39 real requests as text. I compared showing my own past corrections with short rules. It is not proof that the plugin works in real use. A later test is easier to read: with made-up personal habits, Claude (Sonnet) followed the habit 2 times out of 33 without Off the Wall and 20 times with it. That one is in the [plain-language post](/en/otw-what-it-does/).
>
> Updated 2026-10-28: the later measurement on personal preferences (followed 1/33 with no recall, 9/33 default, 17/33 with wide recall; synthetic tasks) is in the [Off the Wall post](/en/off-the-wall/). Wide recall has been the default since 0.3.0. The replay below is unchanged.
>
> Updated 2026-10-23: I split what a historical replay shows from what the public plugin actually demonstrates. It does not establish that quotes beat rules in general.

A correction carries details that a short rule drops: which test was missing, which files were outside the task, which decision I had already handed to the agent. That was the design question behind [Off the Wall](https://github.com/toranalytics/off-the-wall).

**[Open the synthetic recall demo](/otw-recall-lab.html)** before connecting any personal history. The interface is in Korean. The embedded JSON shows the synthetic prompts, the selected quotes, the source version and the real hook output.

```toc
```

## A quote is a mechanism, not an outcome

Here is a made-up example. The correction says: run the checkout integration test and show its exit code, don't claim success after lint. Later I send a related request, and that exact correction lands in its prompt context.

The demo runs the unmodified CLI hook from public OTW 0.1.1, commit `07fe3d3d4f4accc153eb0684f506e0d3c206fdcc`. Four synthetic requests, empty and seeded stores, both host modes: 16 isolated hook runs. No private history, no correction judge, no model answer and no live Claude Code or Codex session was involved. I seeded the stored corrections myself.

So it verifies how the context is assembled, and that a future-dated fixture is left out. It does not verify that the model follows the quote, that a real task succeeds, or that I repeat fewer corrections.

## What the old replay said

I picked 39 requests from one person's history (mine), limited to corrections that could be graded from text. Opus 5.5 re-answered them without tools. Sonnet compared pairs in both orders, and a win counted only when both orders agreed.

The condition with past quotes plus a line asking the model to predict my objection came out at 25 wins, 11 ties and 3 losses against adding nothing. Against random distilled lessons it was 17 wins, 14 ties and 8 losses, with a reported two-sided p of about 0.11. That is not solid evidence of an advantage. The quote format and the prediction line were one combined treatment, so this was never a test of verbatim wording alone.

The saved execution logs back up the totals and the conditions. I have not rerun the original per-case outputs independently. One user, selected requests, model grading and text-only tasks limit what this says. Neither these numbers nor a model's guess about what would have happened is a measured prevention rate.

My hypothesis is that keeping the details of a correction may help in a later, relevant situation. It is still a hypothesis about behavior. It is not a finding that rules don't work.

## What the demo also gets wrong

The check fixture pulls in an instruction from a different task, "edit only the login file". A completely unrelated request still gets the latest corrections. Retrieval is word and character-bigram TF-IDF over earlier requests, then recent items. It does not work out task scope.

The context block also quotes the correction without the scope of the original request, so a phrase like "this task" can lose what it pointed to. That is a limitation I demonstrated in selection and context. I did not observe the model going wrong because of it.

Separating standing preferences from one-off task limits, showing where a quote came from, and handling unrelated recent corrections are improvements I have in mind, not shipped features. One boundary fix did ship in 0.2.0: origin tags and working-directory-scoped recall, because automatic plugin messages could otherwise end up in the correction analysis. It is not proven to filter all automatic input.

## Privacy and model-selection hints

Results and state are stored locally, by default in `~/.otw`. Judging, and reports on personal history, send excerpts through your Claude or Codex CLI to the model company. No separate API key does not mean no usage, cost, limits or handling on the provider side.

The plugin also gives the orchestrator hints about which model to use. That is not automatic routing and not a cost-saving guarantee, and I have not measured the Codex model mapping.

## Look at the mechanism first

Start with the [synthetic demo](/otw-recall-lab.html), not with your own history or a seed command. I don't recommend `report --seed` on personal history yet: the input-boundary fix is public but has not been checked in real use.

What helps me most is something concrete: a needed quote was missing, an unrelated quote showed up, or the agent made the same mistake even after seeing the quote. [Open an issue](https://github.com/toranalytics/off-the-wall/issues) without private transcripts, code, company names or credentials. Install steps are in the [current README](https://github.com/toranalytics/off-the-wall).
