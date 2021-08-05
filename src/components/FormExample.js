import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Box, Paper, Typography } from '@material-ui/core';
import { Capitalize } from '../lib/mylib';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '50%',
    width: 100,
    height: 100,
    backgroundImage: `url(${'https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?b=1&k=6&m=871752462&s=612x612&w=0&h=su9GconcV7Pr_uuQm1GDnPEFoqgGz0dliMHMfmJf_ro='})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  box: {
    margin: "auto",
    padding: '5%',
    display: "flex",
    justifyContent: "space-between"
  },
  text: {
    margin: 'auto'
  }
}));

export default function ProfileForm({employee,profile,update }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.box}>
        <Paper className={classes.paper}></Paper>
        <Box margin="auto">
            <Typography className={classes.text}>{Capitalize(employee.firstName) + " " + Capitalize(employee.lastName)}</Typography>
            <Typography className={classes.text}>{employee.hiring_date}</Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"firstName-" + employee.id}
            name="firstName"
            label="First name"
            defaultValue={employee.firstName}
            onChange={(e)=>{update({...profile, firstName : e.target.value})}}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"lastName-" + employee.id}
            name="lastName"
            label="Last name"
            defaultValue={employee.lastName}
            onChange={(e)=>{update({...profile, lastName : e.target.value})}}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id={"phonePrimary-" + employee.id}
            name="phone_primary"
            label=" primary phone number"
            defaultValue={employee.phone_primary}
            onChange={(e)=>{update({...profile, phone_primary : e.target.value})}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={"phoneSecondary-" + employee.id}
            name="phone_secondary"
            defaultValue={employee.phone_secondary}
            onChange={(e)=>{update({...profile, phone_secondary : e.target.value})}}
            label="secondary phone number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"email-" + employee.id}
            name="email"
            label="email"
            defaultValue={employee.email}
            onChange={(e)=>{update({...profile, email : e.target.value})}}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id={"Adress-" + employee.id} name="adress" label="Home Adress" defaultValue={employee.adress}
            onChange={(e)=>{update({...profile, adress : e.target.value})}} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="date"
            id={"hiring_date-" + employee.id}
            name="hiring_date"
            label="date hired"
            defaultValue={employee.hiring_date}
            onChange={(e)=>{update({...profile, hiring_date : e.target.value})}}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}