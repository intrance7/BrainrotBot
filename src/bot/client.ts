import { Client, GatewayIntentBits, Collection } from 'discord.js';

export class BrainrotClient extends Client {
  public commands: Collection<string, any>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });

    this.commands = new Collection();
  }
}

export const client = new BrainrotClient();
