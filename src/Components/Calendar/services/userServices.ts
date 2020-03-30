import axios from 'axios';
import { User, Event } from '../../../types';

async function getUserEvents(id: number = 0): Promise<Event[]> {
  const response: any = await axios.get(`/api/v1/user/${id}/getEvents`);
  const userEvents: Event[] = response.data;
  return userEvents;
}

async function getAllUsers(): Promise<User[]> {
  const response: any = await axios.get(`/api/v1/user`);
  const users: User[] = response.data;
  return users;
}

async function createUser(user: User): Promise<User> {
  const response: any = await axios.post(`/api/v1/user`, user);
  const createdUser: User = response.data;
  return createdUser;
}

export default {
  getUserEvents,
  post: createUser,
  getAll: getAllUsers,
};
