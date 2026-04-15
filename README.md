# Retirement Planner Miniapp

Retirement Planner is a WeChat Mini Program concept for people who are about to retire or have recently retired.

This product is not trying to be a general AI assistant or a heavy recommendation engine.
Its core job is much simpler and more useful:

**be a daily life starter**

Every day, the product gives the user one realistic place to begin:

- take a 20-minute walk nearby
- message one friend
- learn one small thing
- join one lightweight local activity

## Core Scope

The current MVP keeps only four core functions:

1. Onboarding survey for cold-start signals
2. Daily anchor as the primary action of the day
3. Local suggestions based on city, weather, and interest
4. Optional next-day reminder

## Project Structure

```text
retirement-planner-miniapp/
├── README.md
├── docs/
├── miniprogram/
├── cloudfunctions/
└── database/
```

## What Is Included

- product docs for positioning, core logic, personas, and experiments
- a Mini Program scaffold with core pages and reusable components
- local mock recommendation logic for quick prototyping
- placeholder cloud functions for future backend integration
- seed JSON data for anchors, user profiles, and locations

## Suggested Next Steps

1. Connect `miniprogram/utils/request.js` to real cloud functions and weather APIs
2. Replace mock location data with city-level POI datasets
3. Add subscription message authorization for next-day reminders
4. Track completion, swap, and retention metrics for the daily anchor
