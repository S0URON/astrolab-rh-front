import { alpha, makeStyles } from '@material-ui/core/styles';
import { Drawer, ListItem, List, Divider, ListItemText, Avatar, IconButton, Typography, Toolbar, AppBar, Badge, ListItemIcon } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import Profile from './Profile';
import Notifications from './Notifications';
import EditEmployee from './EditEmployee';
import Calendar from './Calendar';
import Holiday from './Holiday';
import News from './News'
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute'
import { IsAdmin } from '../lib/mylib';
import { useContext } from 'react';
import { UserContext, HolidayContext } from '../lib/UserContext';

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
    backgroundColor: "#3f51b5",
    color: "white",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));


export default function Home({ setTheme, theme, requestedHolidays }) {
  const history = useHistory()
  const classes = useStyles();
  const { profile } = useContext(UserContext)
  const { holidays } = useContext(HolidayContext)

  const logout = async () => {
    const url = 'https://astro-rh-back.herokuapp.com/api/logout'
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

  const changetheme = () => {
    //theme === 'light' ? setTheme("dark") : setTheme("light")
    switch (theme) {
      case 'light':
        setTheme("dark")
        localStorage.setItem("theme", "dark")
        break;
      default:
        setTheme('light')
        localStorage.setItem("theme", "light")
        break;
    }
  }
  return (
    <div className={classes.grow}>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={() => changetheme()}>
              <Brightness4RoundedIcon />
            </IconButton>
            <IconButton color="inherit" component={RouterLink} to='/home/profile'>
              <Avatar alt="placeholder" src={profile?.profileImg} className={classes.small} />
              <Typography style={{ margin: "0 5px" }}>{profile?.firstName} {profile?.lastName}</Typography>
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <ExitToAppRoundedIcon />
              <Typography>Logout</Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor='left' open={true} classes={{
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
          {[{ text: 'news', link: '/home/news', icon: (<AnnouncementRoundedIcon />) },
          { text: 'notifications', link: '/home/notifications', icon: (<Badge badgeContent={IsAdmin(profile ? profile : { role: "other" }) ? (requestedHolidays?.filter((holiday) => holiday.requestedHoliday.thereIsARequest === true).length === 0 ? holidays?.filter((holiday) => holiday.requestedHoliday.thereIsARequest === true).length : requestedHolidays?.filter((holiday) => holiday.requestedHoliday.thereIsARequest === true).length) : 0} color="secondary" ><NotificationsRoundedIcon /></Badge>) },
          { text: 'request a holiday', link: '/home/holidays', icon: (<QuestionAnswerRoundedIcon />) },
          { text: 'Calendar', link: '/home/calendar', icon: (<EventAvailableRoundedIcon />) }].map((el) => (
            <ListItem button key={el.text} component={RouterLink} to={el.link}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={el.text} />
            </ListItem>
          ))}
          {IsAdmin(profile ? profile : { role: "other" }) ?
            <ListItem button key={'Add/Edit Employees'} component={RouterLink} to={'/home/employees'}>
              <ListItemIcon><AddCircleRoundedIcon /></ListItemIcon>
              <ListItemText primary={'Add/Edit Employees'} />
            </ListItem> : <></>}
        </List>
      </Drawer>
      <PrivateRoute path="/home/news" component={News} exact />
      <PrivateRoute path="/home/profile" component={Profile} exact />
      <AdminRoute path="/home/employees" component={EditEmployee} />
      <PrivateRoute path="/home/holidays" component={Holiday} />
      <PrivateRoute path="/home/notifications" component={Notifications} exact requestedHolidays={requestedHolidays} />
      <PrivateRoute path="/home/calendar" component={Calendar} />
    </div>
  );
}
