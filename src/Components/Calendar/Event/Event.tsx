import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Event, SelectOptions } from '../../../types';
import eventServices from '../services/eventServices';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';

interface EventDialogProps {
  loadEvents: any;
  userOptions: SelectOptions[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateRows: 60,
      gridRowGap: 10,
    },
    actionWrapper: {
      display: 'grid',
      gridTemplateColumns: '45% 45%',
      justifyContent: 'space-between',
    },
    select: {
      width: '100%',
    },
  })
);

const EventDialog: React.FC<EventDialogProps> = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [event, setEvent] = useState<Event>({
    user_id: 1,
    title: '',
    start_date: new Date(),
    end_date: new Date(),
  });

  function update(e: React.ChangeEvent<HTMLInputElement>): void {
    setEvent({
      ...event,
      [e.target.id]: e.target.value,
    });
  }

  function updateSelect(name: string, value: number): void {
    setEvent({
      ...event,
      [name]: value,
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();
      await eventServices.post(event);
      await props.loadEvents();
      setOpenDialog(false);
    } catch (e) {
      console.log(e.response);
    }
  }

  return (
    <>
      <Button onClick={(e: any) => setOpenDialog(true)}>Create Event</Button>
      <Dialog
        maxWidth={'sm'}
        fullWidth
        open={openDialog}
        onClose={(e: any) => setOpenDialog(false)}
        aria-labelledby="event-dialog-title"
      >
        <DialogTitle id="event-dialog-title">Event</DialogTitle>
        <DialogContent>
          <form onSubmit={submit} className={classes.root}>
            <Select
              options={props.userOptions}
              onChange={(e: any) => updateSelect('user_id', e.value)}
              className={classes.select}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              id="title"
              value={event.title || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
              style={{
                zIndex: 0,
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              id="description"
              value={event.description || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
              style={{
                zIndex: 0,
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Start Date"
              id="start_date"
              type="datetime-local"
              value={event.start_date || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
              style={{
                zIndex: 0,
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="End Date"
              id="end_date"
              type="datetime-local"
              value={event.end_date || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
              style={{
                zIndex: 0,
              }}
            />
            <div className={classes.actionWrapper}>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default EventDialog;
