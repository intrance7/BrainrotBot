import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { env } from '../../config/env';
import { client } from '../client';
import * as pingCommand from '../commands/ping';
import * as profileCommand from '../commands/profile';
import * as basedCommand from '../commands/based';

export interface Command {
  data: SlashCommandBuilder | any;
  execute: (interaction: any) => Promise<void>;
}

export const loadCommands = async () => {
  const commands: any[] = [];
  
  // Registering commands manually for MVP
  // In a full implementation, we'd read the directory dynamically
  client.commands.set(pingCommand.data.name, pingCommand);
  commands.push(pingCommand.data.toJSON());

  client.commands.set(profileCommand.data.name, profileCommand);
  commands.push(profileCommand.data.toJSON());

  client.commands.set(basedCommand.data.name, basedCommand);
  commands.push(basedCommand.data.toJSON());

  const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // If you want to register globally:
    // await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    
    // For now, let's just log it. The bot needs to be logged in to get its application ID,
    // so we'll actually call this function from the ready event once we have the client user.
    return commands;
  } catch (error) {
    console.error(error);
  }
};
