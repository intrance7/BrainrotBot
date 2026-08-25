import { config } from 'dotenv';
config();

export const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
};

if (!env.DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is missing in .env');
}
if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in .env');
}
