import { client } from './bot/client';
import { loadEvents } from './bot/handlers/eventHandler';
import { env } from './config/env';

import { prisma } from './config/prisma';

async function bootstrap() {
  console.log('Starting Brainrot Bot...');
  
  // 1. Initialize DB / Prisma
  await prisma.$connect();
  console.log('Connected to Database');
  
  // 2. Load Discord Events
  loadEvents();
  
  // 3. Login to Discord
  try {
    await client.login(env.DISCORD_TOKEN);
  } catch (error) {
    console.error('Failed to connect to Discord:', error);
    process.exit(1);
  }
}

bootstrap();
