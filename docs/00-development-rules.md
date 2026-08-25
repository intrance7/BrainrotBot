# Development Rules

1. Never put business logic inside Discord commands.
2. Use TypeScript strict mode.
3. All database access goes through repositories.
4. Never hardcode secrets.
5. Every command must have cooldown handling.
6. Every game mechanic must have unit tests.
7. Use PostgreSQL for persistent data.
8. Use Redis only for temporary state/cache.
9. AI must never directly modify user statistics.
10. Keep modules independently testable.
11. Do not create unnecessary abstractions.
12. Prefer small services over giant files.
