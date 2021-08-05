import { alpha, makeStyles } from '@material-ui/core/styles';
import {Drawer, ListItem, List, Divider, ListItemText, IconButton, Typography, Toolbar, AppBar, Badge, ListItemIcon} from '@material-ui/core';
import {BrowserRouter as Router, Link as RouterLink, useHistory} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Profile from './Profile';
import Notifications from './Notifications';
import EditEmployee from './EditEmployee';
import Calendar from './Calendar';
import Holiday from './Holiday';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute'
import { IsAdmin } from '../lib/mylib';
import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor : "#3f51b5",
    color : "white",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  appbar : {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }
}));

export default function Nav() {
  const history = useHistory()
  const classes = useStyles();
  const {profile} = useContext(UserContext)
  const logout = async () =>{
    const url = 'http://localhost:5050/api/logout'
    const res = await fetch(url, {
      method: 'POST', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    });
    console.log(res.status)
    localStorage.removeItem("token")
    history.push("/login")
  }
  return (
    <div className={classes.grow}>
        <Router>
          <AppBar position="sticky" className={classes.appbar}>
            <Toolbar>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" component={RouterLink} to='/home/profile'>
                    <AccountCircle/>
                </IconButton>
                <IconButton color="inherit" onClick={logout}>
                    <ExitToAppRoundedIcon/>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer className={classes.drawer} variant="persistent" anchor='left' open={true}  classes={{
              paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerHeader}>
            <IconButton color="inherit"><MenuIcon /></IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Menu
              </Typography>
            </div>
            <Divider />
            <List>
              {[{text : 'notifications',link : '/home/notifications',icon : (<Badge badgeContent={17} color="secondary" ><NotificationsRoundedIcon/></Badge>)},
               {text : 'request a holiday',link : '/home/holidays',icon : (<QuestionAnswerRoundedIcon />)},
               {text : 'Calendar',link : '/home/calendar',icon : (<EventAvailableRoundedIcon/>)}].map((el) => (
                    <ListItem button key={el.text} component={RouterLink} to={el.link}>
                      <ListItemIcon>{el.icon}</ListItemIcon>
                      <ListItemText primary={el.text} />
                    </ListItem>
              ))}
              { IsAdmin(profile ? profile : {role : "other"}) ?
              <ListItem button key={'Add/Edit Employees'} component={RouterLink} to={'/home/employees'}>
                    <ListItemIcon><AddCircleRoundedIcon /></ListItemIcon>
                    <ListItemText primary={'Add/Edit Employees'} />
              </ListItem> :<></> }
            </List>
          </Drawer>
          <PrivateRoute path="/home/profile" component={Profile}/>
          <AdminRoute path="/home/employees" component={EditEmployee}/>
          <PrivateRoute path="/home/holidays" component={Holiday}/>
          <PrivateRoute path="/home/notifications" component={Notifications}/>
          <PrivateRoute path="/home/calendar" component={Calendar}/>    
      </Router>
    </div>
  );
}
