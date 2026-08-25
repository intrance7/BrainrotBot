import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { StatsRepository } from '../../game/stats/StatsRepository';

export const data = new SlashCommandBuilder()
  .setName('based')
  .setDescription('Give a random based score to yourself or someone else.')
  .addUserOption(option => 
    option.setName('target')
      .setDescription('The user to rate')
      .setRequired(false)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    
    // Ensure the target has a profile
    await StatsRepository.getOrCreateUserProfile(targetUser.id, targetUser.username);

    const basedScore = Math.floor(Math.random() * 101); // 0 to 100
    const auraGain = Math.floor(Math.random() * 11) + 5; // +5 to +15
    const xpGain = 10; 

    await StatsRepository.updateStats(targetUser.id, {
      aura: { increment: auraGain }
    });
    await StatsRepository.addBalance(targetUser.id, xpGain);

    const embed = new EmbedBuilder()
      .setColor('#e74c3c')
      .setDescription(`🔥 <@${targetUser.id}> is **${basedScore}% BASED**\n\n*Gained +${auraGain} Aura and +${xpGain} XP!*`);

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Error executing based command:', error);
    await interaction.editReply('An error occurred while running the based command.');
  }
};
