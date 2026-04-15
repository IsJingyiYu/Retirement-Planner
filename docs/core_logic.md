# Core Logic

## Design Principle

The system should always reduce friction.
Every key flow should answer one question:

**What is the easiest meaningful next step for this user today?**

## Primary Flow

1. User completes onboarding
2. System stores a simple profile
3. Daily anchor is generated from profile tags and history
4. User can complete or swap the anchor
5. System offers nearby suggestions when local context is helpful
6. User can opt in to a next-day reminder

## Anchor Generation Rules

The daily anchor should be:

- simple enough to start now
- aligned with user interests
- varied over time
- realistic for the user's city and daily context

### Example Categories

- movement
- social
- learning
- exploration
- calm routines

### Example Logic

- if the user prefers low-social activities, avoid strong social prompts
- if the weather is good, prioritize light outdoor anchors
- if the user swapped the same category often, reduce its weight
- if the user completed a category recently, rotate to another one

## Local Suggestion Rules

Local recommendations are secondary to the daily anchor.
They exist to make the product feel grounded in real life.

Prioritize:

- nearby
- low effort
- low commitment
- daytime-friendly

## Reminder Rule

Never force reminders.
The product asks only after the user has completed or positively engaged with the day's anchor.
