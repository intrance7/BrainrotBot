import { Events, Interaction } from 'discord.js';
import { BrainrotClient } from '../client';

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const client = interaction.client as BrainrotClient;
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
};
