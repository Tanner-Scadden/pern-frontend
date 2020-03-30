import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Event } from '../../types';
import eventServices from './services/eventServices';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventDialog from './Event';

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
    },
  })
);

const BigCalendar: React.FC = () => {
  const classes = useStyles();
  const [events, setEvents] = useState<Array<Event>>([]);

  async function loadEvents(): Promise<void> {
    try {
      const response: Array<Event> = await eventServices.getAll();
      setEvents(response);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);
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
        <EventDialog loadEvents={loadEvents} />
      </div>
    </div>
  );
};

export default BigCalendar;
