import { Events, Client, REST, Routes } from 'discord.js';
import { loadCommands } from '../handlers/commandHandler';
import { env } from '../../config/env';

export const name = Events.ClientReady;
export const execute = async (client: Client) => {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
  
  const commands = await loadCommands();
  if (commands && client.user) {
    const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);
    try {
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands }
      );
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error('Failed to register commands:', error);
    }
  }
};
