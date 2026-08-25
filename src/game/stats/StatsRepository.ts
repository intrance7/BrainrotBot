import { prisma } from '../../config/prisma';

export class StatsRepository {
  /**
   * Gets a user's complete profile (stats and economy), creating it if it doesn't exist.
   */
  static async getOrCreateUserProfile(discordId: string, username: string) {
    const user = await prisma.user.upsert({
      where: { discordId },
      update: { lastActive: new Date() },
      create: {
        discordId,
        username,
        stats: { create: {} },
        economy: { create: {} },
      },
      include: {
        stats: true,
        economy: true,
      },
    });
    return user;
  }

  /**
   * Updates a user's stats
   */
  static async updateStats(discordId: string, updates: {
    aura?: { increment?: number; decrement?: number };
    braincells?: { increment?: number; decrement?: number };
    // add others as needed
  }) {
    const user = await prisma.user.findUnique({ where: { discordId } });
    if (!user) throw new Error('User not found');

    return prisma.userStats.update({
      where: { userId: user.id },
      data: updates,
    });
  }

  /**
   * Add XP (which might be represented as an Economy balance or a hidden stat for now)
   */
  static async addBalance(discordId: string, amount: number) {
    const user = await prisma.user.findUnique({ where: { discordId } });
    if (!user) throw new Error('User not found');

    return prisma.economy.update({
      where: { userId: user.id },
      data: {
        balance: { increment: amount },
        lifetimeEarned: { increment: amount },
      },
    });
  }
}
