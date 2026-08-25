import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { StatsRepository } from '../../game/stats/StatsRepository';

export const data = new SlashCommandBuilder()
  .setName('profile')
  .setDescription('View your Brainrot Bot profile and stats.');

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const user = await StatsRepository.getOrCreateUserProfile(interaction.user.id, interaction.user.username);

    if (!user.stats || !user.economy) {
      await interaction.editReply('There was an issue fetching your profile.');
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Brainrot Profile: ${user.username}`)
      .setColor('#9b59b6')
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields(
        { name: '✨ Aura', value: `${user.stats.aura}`, inline: true },
        { name: '🧠 Braincells', value: `${user.stats.braincells}`, inline: true },
        { name: '🍀 Luck', value: `${user.stats.luck}`, inline: true },
        { name: '💰 $BRAIN Balance', value: `${user.economy.balance}`, inline: true },
        { name: '☕ Coffee', value: `${user.stats.coffee}`, inline: true },
        { name: '🌱 Touch Grass', value: `${user.stats.touchGrass}`, inline: true }
      )
      .setFooter({ text: 'Keep brainrotting!' });

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Error fetching profile:', error);
    await interaction.editReply('An error occurred while fetching your profile.');
  }
};
