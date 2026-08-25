import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong! MVP check.');

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply('Pong! The Brainrot Bot is alive! 🧠🔥');
};
