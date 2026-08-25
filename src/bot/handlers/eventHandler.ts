import { client } from '../client';
import * as readyEvent from '../events/ready';
import * as interactionCreateEvent from '../events/interactionCreate';

export const loadEvents = () => {
  // Manual registration for MVP
  client.once(readyEvent.name, (...args) => readyEvent.execute(...args));
  client.on(interactionCreateEvent.name, (...args) => interactionCreateEvent.execute(...args));
};
