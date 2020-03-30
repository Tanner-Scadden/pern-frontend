import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { User } from '../../../types';
import userServices from '../services/userServices';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

interface UserDialogProps {
  loadUsers: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateRows: 70,
      gridRowGap: 10,
    },
    actionWrapper: {
      display: 'grid',
      gridTemplateColumns: '45% 45%',
      justifyContent: 'space-between',
    },
  })
);

const UserDialog: React.FC<UserDialogProps> = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
  });

  function update(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();
      await userServices.post(user);
      await props.loadUsers();
      setOpenDialog(false);
    } catch (e) {
      console.log(e.response);
    }
  }

  return (
    <>
      <Button onClick={(e: any) => setOpenDialog(true)}>Create User</Button>
      <Dialog
        maxWidth={'sm'}
        fullWidth
        open={openDialog}
        onClose={(e: any) => setOpenDialog(false)}
        aria-labelledby="user-dialog-title"
      >
        <DialogTitle id="user-dialog-title">User</DialogTitle>
        <DialogContent>
          <form onSubmit={submit} className={classes.root}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              id="first_name"
              value={user.first_name || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              id="last_name"
              value={user.last_name || ''}
              onChange={(e: any) => update(e)}
              InputLabelProps={{
                shrink: true,
              }}
              required
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

export default UserDialog;
