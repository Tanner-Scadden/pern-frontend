import React, { useState, useEffect, useMemo } from 'react';
import * as moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Event, User, SelectOptions } from '../../types';
import eventServices from './services/eventServices';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventDialog from './Event';
import UserDialog from './User';
import userServices from './services/userServices';
import Select from 'react-select';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      height: '95vh',
      display: 'flex',
    },
    calendarWrapper: {
      width: '85%',
      height: '100%',
    },
    dialogWrapper: {
      margin: '0 auto',
      paddingTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

const BigCalendar: React.FC = () => {
  const classes = useStyles();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  async function loadEvents(): Promise<void> {
    try {
      const response: Event[] = await eventServices.getAll();
      setEvents(response);
    } catch (e) {
      console.log(e.response);
    }
  }

  async function loadUsers(): Promise<void> {
    try {
      const response: User[] = await userServices.getAll();
      setUsers(response);
    } catch (e) {
      console.log(e.response);
    }
  }

  async function getUserEvents(e: any): Promise<void> {
    try {
      const { value }: { value: number } = e;
      const response: Event[] = await userServices.getUserEvents(value);
      setEvents(response);
    } catch (e) {
      console.log(e.response);
    }
  }

  useEffect(() => {
    loadEvents();
    loadUsers();
  }, []);

  const userOptions: SelectOptions[] = useMemo(() => {
    return users.map((user: User) => ({
      value: Number(user.id),
      label: `${user.first_name} ${user.last_name}`,
    }));
  }, [users]);

  return (
    <div className={classes.root}>
      <div className={classes.calendarWrapper}>
        <Calendar
          events={events}
          localizer={localizer}
          startAccessor="start_date"
          endAccessor="end_date"
        />
      </div>
      <div className={classes.dialogWrapper}>
        <Select onChange={(e) => getUserEvents(e)} options={userOptions} />
        <EventDialog loadEvents={loadEvents} userOptions={userOptions} />
        <UserDialog loadUsers={loadUsers} />
      </div>
    </div>
  );
};

export default BigCalendar;
