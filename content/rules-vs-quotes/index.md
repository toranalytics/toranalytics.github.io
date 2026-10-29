---
emoji: 🧪
title: 'What correction quotes preserve, and what a replay does not prove'
date: '2026-10-19'
category: experiments
tags: claude-code codex evaluation off-the-wall
description: 'A replay of 39 requests compares quoting a developer''s own past corrections with distilled rules, and spells out what that replay does and does not prove about Off the Wall.'
lang: en
translationKey: rules-vs-quotes
---

> **In plain words.** This article is about an older test that replayed 39 real requests as text. It compared showing a developer's own past corrections with short rules, and it is not proof that the plugin works in real use. A later test is easier to read: with made-up personal habits, Claude (Sonnet) followed the habit 2 times out of 33 without Off the Wall and 20 times with it. See the [plain-language article](/en/otw-what-it-does/).


> Updated 2026-10-28: the later measurement on personal preferences (followed 1/33 with no recall, 9/33 default, 17/33 with wide recall; synthetic tasks) is in the [Off the Wall article](/en/off-the-wall/). Wide recall has been the default since 0.3.0. This article's replay is unchanged.
>
> Updated 2026-10-23: this article separates a historical replay from what the public plugin actually demonstrates. It does not establish general superiority over rules.

A correction can contain details that a short rule omits: which test was missing, which files were outside the task, or which decision had already been delegated. That is the design question behind [Off the Wall](https://github.com/toranalytics/off-the-wall).

**[Open the synthetic recall demo](/otw-recall-lab.html)** before connecting any personal history. The interface is in Korean; the embedded JSON identifies the synthetic prompts, selected quotes, source version, and actual hook output.

## A quote is a mechanism, not an outcome

An authored example says: run the checkout integration test and show its exit code, rather than claiming success after lint. A later, related request receives that exact correction in its prompt context.

The demo runs the unmodified CLI hook from public OTW 0.1.1, commit `07fe3d3d4f4accc153eb0684f506e0d3c206fdcc`: four synthetic requests, empty/seeded stores, and both host modes, for 16 isolated hook executions. No private history, correction judge, model answer, or live Claude Code/Codex host session is involved. The stored corrections are seeded by the demo author.

It verifies context assembly and the exclusion of a future-dated fixture. It does **not** verify that the model follows the quote, that a real task succeeds, or that the user repeats fewer corrections.

## What the old replay reported

The historical experiment selected 39 requests from one person's history, restricted to corrections that could be graded from text. Opus 5.5 re-answered without tools. Sonnet compared pairs in both orders, counting a win only when the orders agreed.

The past-quotes-plus-objection-prediction condition was reported as 25 wins, 11 ties, and 3 losses against no added context. Head-to-head with random distilled lessons, it was 17/14/8, with a reported two-sided p-value of about 0.11. That is not conclusive evidence of superiority. The quote format and prediction instruction were a combined treatment, not an isolated test of verbatim wording.

Preserved execution logs support the reported totals and conditions. The original per-case outputs have not been independently rerun in this review. Selection, one user, model grading, and text-only tasks limit the result. Neither these numbers nor a model's counterfactual assessment is a measured prevention rate.

The hypothesis is that retaining a correction's details may help in a later relevant situation. It remains a hypothesis about behavior, not a general finding that rules are ineffective.

## What the current demo also gets wrong

The verification fixture retrieves a different task's instruction to edit only the login file. A completely unrelated request still receives the latest corrections. Retrieval uses word and character-bigram TF-IDF over earlier requests, followed by recent items; it does not resolve task scope.

The public context block quotes the correction without the original request's scope metadata. A statement such as “this task” can therefore lose its referent. That is a demonstrated selection/context limitation, not an observed model failure.

Separating standing preferences from one-off task constraints, exposing provenance, and handling unrelated recent corrections are proposed product improvements, not features already shipped. A human-input boundary fix (origin tags and working-directory-scoped recall) shipped in 0.2.0, because automated plugin-origin messages could otherwise enter correction analysis; it is not proven to filter all automated input.

## Privacy and model-selection guidance

Results and state are stored locally, by default in `~/.otw`. Judging and personal-history reports send excerpts through the user's Claude/Codex CLI to its model provider. No separate API key does not mean no usage, cost, limits, or provider-side handling.

The plugin also provides model-selection guidance to the orchestrator. It is not a general automatic-routing or cost-saving guarantee, and Codex model mapping has not been measured.

## Try the mechanism first

Start with the [synthetic demo](/otw-recall-lab.html), not a personal history upload or seed command. This article does not recommend personal `report --seed` onboarding: the input-boundary fix is public but has not been verified through real use.

The most useful feedback is concrete: a needed quote was missing, an unrelated quote appeared, or the agent still made the same mistake after exposure. [Open an issue](https://github.com/toranalytics/off-the-wall/issues) without private transcripts, code, company names, or credentials. Installation details remain in the [current README](https://github.com/toranalytics/off-the-wall).
