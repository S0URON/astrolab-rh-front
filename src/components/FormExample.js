import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Capitalize } from '../lib/mylib';
import ImageUpload from './ImageUpload'

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

export default function ProfileForm({ employee, profile, update, error }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <Box>
          <ImageUpload updateImage={update} profile={profile} employee={employee}/>
        </Box>
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
            onChange={(e) => { update({ ...profile, firstName: e.target.value }) }}
            fullWidth
            autoComplete="given-name"
            error={error.type === "firstName"}
            helperText={error.type === "firstName" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"lastName-" + employee.id}
            name="lastName"
            label="Last name"
            defaultValue={employee.lastName}
            onChange={(e) => { update({ ...profile, lastName: e.target.value }) }}
            fullWidth
            autoComplete="family-name"
            error={error.type === "lastName"}
            helperText={error.type === "lastName" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"phonePrimary-" + employee.id}
            name="phone_primary"
            label=" primary phone number"
            type="number"
            defaultValue={employee.phone_primary}
            onChange={(e) => { update({ ...profile, phone_primary: e.target.value }) }}
            fullWidth
            error={error.type === "phone_primary"}
            helperText={error.type === "phone_primary" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id={"phoneSecondary-" + employee.id}
            name="phone_secondary"
            defaultValue={employee.phone_secondary}
            onChange={(e) => { update({ ...profile, phone_secondary: e.target.value }) }}
            label="secondary phone number"
            type="number"
            fullWidth
            error={error.type === "phone_secondary"}
            helperText={error.type === "phone_secondary" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={"birthdate-" + employee.id}
            type="date"
            defaultValue={employee.birthdate}
            onChange={(e) => { update({ ...profile, birthdate : e.target.value }) }}
            label="birthdate"
            fullWidth
            error={error.type === "birthdate"}
            helperText={error.type === "birthdate" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"email-" + employee.id}
            name="email"
            label="email"
            defaultValue={employee.email}
            onChange={(e) => { update({ ...profile, email: e.target.value }) }}
            fullWidth
            error={error.type === "email"}
            helperText={error.type === "email" ? error.msg : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id={"Adress-" + employee.id} name="adress" label="Home Adress" defaultValue={employee.adress}
            onChange={(e) => { update({ ...profile, adress: e.target.value }) }} fullWidth
            error={error.type === "adress"}
            helperText={error.type === "adress" ? error.msg : ""} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="date"
            id={"hiring_date-" + employee.id}
            name="hiring_date"
            label="date hired"
            defaultValue={employee.hiring_date}
            error={error.type === "date"}
            helperText={error.type === "date" ? error.msg : ""}
            onChange={(e) => { update({ ...profile, hiring_date: e.target.value }) }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            type="date"
            id={"leaving_date-" + employee.id}
            label="date leaving"
            defaultValue={employee.leaving_date}
            error={error.type === "leaving_date"}
            helperText={error.type === "leaving_date" ? error.msg : ""}
            onChange={(e) => { update({ ...profile, leaving_date: e.target.value }) }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            type="text"
            id={"post-" + employee.id}
            name="hiring_date"
            label="post"
            defaultValue={employee.post}
            error={error.type === "post"}
            helperText={error.type === "post" ? error.msg : ""}
            onChange={(e) => { update({ ...profile, post: e.target.value }) }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id={"CIN-" + employee.id}
            label="CIN"
            type="number"
            error={error.type === "cin"}
            helperText={error.type === "cin" ? error.msg : ""}
            defaultValue={employee.cin}
            onChange={(e) => { update({ ...profile, cin: e.target.value }) }}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}