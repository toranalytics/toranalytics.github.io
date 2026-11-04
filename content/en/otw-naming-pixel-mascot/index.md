---
emoji: ''
title: 'I tried to rename my coding-agent plugin. Then I found another tool with almost the same name'
date: '2026-11-03'
category: projects
tags: off-the-wall claude-code codex opensource
description: 'A naming collision, a pixel robot mascot, and the limitations of my coding-agent plugin.'
lang: en
translationKey: otw-naming-pixel-mascot
---

> After I wrote this, I settled on the name Dude Toldya. The repository is now `dude-toldya` and the command is `duto`.

"Did you actually run the tests?"

I've asked Claude Code and Codex versions of that question more than once. I built a plugin to save my corrections and show them again with later requests. I called it [Off the Wall](https://github.com/toranalytics/off-the-wall).

The problem: the name doesn't tell you what it does. The README had a parrot, too. I didn't really want the tool to just repeat me like a parrot. I wanted it to bring my earlier correction back when the agent needed the context.

So I started looking for a new name and a different character. The name part didn't go quite as planned.

## FFS Again?

One idea was `FFS Again`. It captures the feeling of watching your coding agent make the same mistake again. But if you saw it in a plugin list, would you know it had anything to do with Claude Code or Codex? Probably not without a description.

Then I considered `dude-toldya`. It sounded closer to what I was trying to say: dude, I already told you.

Then I searched for it.

## There was already a toldya

[toldya](https://www.npmjs.com/package/toldya) is an existing tool that looks for repeated corrections in Claude Code history and writes selected ones into a rules file with the user's approval.

My plugin takes a different approach: it keeps the original wording and shows selected quotes again rather than turning them into rules. But if I called it `dude-toldya`, I could see someone assuming it was another version of that tool.

I haven't settled on the name. The GitHub README calls it a working title, and the install commands still use `off-the-wall`. I haven't completed a package-name or trademark check either.

## I made a sticky note, but it didn't look like AI

I also tried changing the character. The first AI-generated idea was a crumpled sticky note. That made sense for storing old corrections, but it didn't really show the situation I had in mind: a coding agent doing something odd and me having to correct it again.

I looked at [Gajae Code's GitHub page](https://github.com/Yeachan-Heo/gajae-code). Its pixel character stands out in the README. I used the pixel-art and dark-background feel as a reference, not its character or logo.

Then I thought of the Korean ["Please be quiet!" meme](https://namu.wiki/w/조용히%20하세요!). The next AI-generated draft was a confused little terminal robot getting a gentle bonk on the head.

![AI-generated pixel-art terminal robot getting a gentle bonk](/img/dude-toldya-ai-mascot.png)

That one felt closer to the frustration behind the project. Neither the name nor the mascot is final.

## A new name won't fix this part

The plugin still has a problem: the selected quote isn't always relevant. I ran `otw explain` on a haiku request, and its preview selected unrelated coding corrections to attach. This is the tool's output from a fake repository with corrections made up for the demo.

![A preview selects unrelated coding corrections for a haiku request, using a fake repository and made-up corrections](/img/otw-explain-unrelated-en.png)

Showing a correction again also doesn't mean the agent will follow it. I haven't measured whether real users need fewer repeated corrections.

For now, the [GitHub README](https://github.com/toranalytics/off-the-wall) has the new mascot. The name can wait a bit longer. I'd like one that doesn't get confused with another tool and still makes the problem recognizable.
