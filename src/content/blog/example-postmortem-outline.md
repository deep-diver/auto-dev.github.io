---
title: 'A postmortem outline worth reusing'
description: 'A compact template for incident writeups and technical retrospectives.'
pubDate: '2026-03-12'
tags:
  - postmortem
  - reliability
  - template
---

When writing incident notes, use a structure that makes future-you grateful:

## Summary
Two or three sentences. What failed, who noticed, and what broke.

## Timeline
List the moments that changed the outcome.

## Root cause
Describe the actual mechanism, not just the symptom.

## Resolution
What you changed immediately.

## Follow-ups
What still needs to happen so this does not return wearing a fake mustache.

This format works just as well for production incidents, migration mistakes, or weird local-dev failures.
