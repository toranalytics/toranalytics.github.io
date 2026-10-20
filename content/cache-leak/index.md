---
emoji: 🧾
title: 'My coding agent cost $1,064 last week. 44% of it was the cache re-writing itself'
date: '2026-10-19'
category: experiments
tags: claude-code prompt-caching cost measurement
---

I run coding agents all day, so I added up a week of my own API usage: 19,733 Claude calls, about **$1,064** at API
prices. The biggest line was not output and not cache reads. It was cache **writes**: $469, 44% of the bill.

A cache write is what you pay the first time a prefix is seen. In a long conversation almost everything should be a
read. A write that large means the agent kept paying for conversations it had already paid for.

## Leak 1: a note that "preserves the cache"

The agent runs with a context plugin that adds a short note (routing hints, memory) to each prompt. It added that note
after the last message of the request, and the code comment said this placement preserves the prompt cache.

With automatic caching the cache breakpoint is the end of the request, so the entry was written right at the note.
The next prompt no longer carries that note, so nothing it sends matches what was cached, and the whole conversation is
written again.

Three one-word prompts in one session:

| | cache read | cache write |
| :-- | --: | --: |
| prompt 1 | 0 | 35,050 |
| prompt 2 | 0 | 34,908 |
| prompt 3 | 0 | 34,922 |

The note stored once in the conversation history instead, same three prompts:

| | cache read | cache write |
| :-- | --: | --: |
| prompt 1 | 0 | 35,045 |
| prompt 2 | 35,045 | 320 |
| prompt 3 | 35,365 | 14 |

In a week of real use this was the largest single cause of full rewrites in my logs: 355 of them.

## Leak 2: no breakpoint on the system prompt

Every new session in a project sends the same tools and system prompt, about 30k tokens. With one breakpoint at the
end of the request, a new session has nothing to read: its messages differ from every earlier session, so the shared
part has no cache entry of its own. Two fresh sessions a minute apart each wrote ~35k and read 0.

One more breakpoint on the last system block (the API allows four):

| second fresh session, first request | cache read | cache write |
| :-- | --: | --: |
| before | 0 | ~35,000 |
| after | 33,460 | ~1,600 |

Restarts, new sessions and subagents all start from that prefix, so the saving repeats for each.

## What I take from it

Both leaks were placed where they were *to protect* the cache, and both comments were reasonable. Neither had been
measured. The bill was the measurement.

I keep counting what my agents do, corrections included, in
[Off the Wall](https://github.com/toranalytics/off-the-wall).
