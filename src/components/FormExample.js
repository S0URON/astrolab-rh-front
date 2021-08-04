import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Box, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius : '50%',
    width : 100,
    height : 100,
    backgroundImage : `url(${'https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?b=1&k=6&m=871752462&s=612x612&w=0&h=su9GconcV7Pr_uuQm1GDnPEFoqgGz0dliMHMfmJf_ro='})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  box : {
      margin :"auto",
      padding : '5%'
  },
}));

export default function ProfileForm({id, firstName, lastName, email, phone_primary, phone_secondary, adress, hiring_date,index, update}) {
  const classes = useStyles();
  const HandleChange = (e) => {
      update(e, index);
  }
  return (
    <React.Fragment>
      <Box className={classes.box}>
          <Paper className={classes.paper}></Paper>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"firstName-"+id}
            name="firstName"
            label="First name"
            defaultValue={firstName}
            onChange={HandleChange}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"lastName-"+id}
            name="lastName"
            label="Last name"
            defaultValue={lastName}
            onChange={HandleChange}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id={"phonePrimary-"+id}
            name="phone_primary"
            label=" primary phone number"
            defaultValue={phone_primary}
            onChange={HandleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={"phoneSecondary-"+id}
            name="phone_secondary"
            defaultValue={phone_secondary}
            onChange={HandleChange}
            label="secondary phone number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"email-"+id}
            name="email"
            label="email"
            defaultValue={email}
            onChange={HandleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id={"Adress-"+id} name="adress" label="Home Adress" defaultValue={adress}
            onChange={HandleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="date"
            id={"hiring_date-"+id}
            name="hiring_date"
            label="date hired"
            defaultValue={hiring_date}
            onChange={HandleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}