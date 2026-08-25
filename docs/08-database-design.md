# Database Design

Define the PostgreSQL schema.

```text
users
├── id
├── discord_id
├── username
├── created_at
└── last_active

user_stats
├── user_id
├── aura
├── braincells
├── luck
├── sleep
├── coffee
└── touch_grass

economy
├── user_id
├── balance
└── lifetime_earned

inventory
├── user_id
├── item_id
└── quantity

items
├── id
├── name
├── description
├── price
└── effect

events
├── id
├── type
├── name
├── description
└── effect

achievements
├── id
├── name
├── description
└── reward
```
