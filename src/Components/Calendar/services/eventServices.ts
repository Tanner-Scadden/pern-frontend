import axios from 'axios';
import { Event } from '../../../types';

async function getEvents(): Promise<Array<Event>> {
  const response: any = await axios.get(`/api/v1/event`);
  const events: Array<Event> = response.data;
  return events;
}

async function createEvent(data: Event): Promise<Event> {
  const response: any = await axios.post(`/api/v1/event`, data);
  const event: Event = response.data;
  return event;
}

export default {
  getAll: getEvents,
  post: createEvent,
};
