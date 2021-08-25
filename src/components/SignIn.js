import { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../lib/UserContext'
import {errorHandler} from "../lib/errorHandler"
import validator from 'validator';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © astrolab '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { setProfile } = useContext(UserContext)
  const history = useHistory();
  const classes = useStyles();
  const [creds, setCreds] = useState({ email: "", password: "" })
  const [loginErr, setloginErr] = useState({ msg: "", type: "" })

  const login = async () => {
    const url = 'https://astro-rh-back.herokuapp.com/api/login'
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(creds)
    });

    const data = await response.json()
    if (data.user) {
      setProfile(data.user);
      localStorage.setItem('token', data.token);
      history.push('/home');
    } else {
      setloginErr(errorHandler(data.error))
    }
  }

  const signInValidator = (e) => {
    e.preventDefault()
    if (creds.email === "")
      setloginErr({ msg: 'email is required', type: "email" })
    else if (!validator.isEmail(creds.email))
      setloginErr({ msg: 'wrong email format', type: "email" })
    else if (creds.password === "")
      setloginErr({ msg: 'password is required', type: "password" })
    else
      login()

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signin
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            autoFocus
            error={loginErr.type === "email"}
            helperText={loginErr.type === "email" ? loginErr.msg : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            autoComplete="current-password"
            error={loginErr.type === "password"}
            helperText={loginErr.type === "password" ? loginErr.msg : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInValidator}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}