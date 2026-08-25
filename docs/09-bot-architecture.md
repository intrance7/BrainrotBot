# Bot Architecture

Define how the code should be organized.

**Important Rule:** Discord interaction logic isn't mixed with game logic.

```text
src/
│
├── bot/
│   ├── commands/
│   ├── events/
│   └── middleware/
│
├── game/
│   ├── stats/
│   ├── economy/
│   ├── achievements/
│   ├── quests/
│   └── events/
│
├── database/
│   ├── models/
│   ├── repositories/
│   └── migrations/
│
├── services/
│   ├── ai/
│   ├── leaderboard/
│   └── notifications/
│
├── config/
└── utils/
```
