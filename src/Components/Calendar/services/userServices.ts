import axios from 'axios';
import { Event } from '../../../types';

async function getUserEvents(id: number = 0): Promise<Array<Event>> {
  const response: any = await axios.get(`/api/v1/user/${id}/getEvents`);
  const userEvents: Array<Event> = response.data;
  return userEvents;
}

export default {
  getUserEvents,
};
