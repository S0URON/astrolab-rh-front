import { Box, Typography, Grid, Paper, makeStyles, Divider, Accordion, AccordionSummary, AccordionDetails, Button, TextField } from "@material-ui/core"
import { HolidayContext, UserContext } from "../lib/UserContext"
import { useContext, useState, useEffect } from "react"
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { IsAdmin } from "../lib/mylib"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "50%"
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
        margin: "5px"

    },
    button: {
        margin: "1%"
    }
}));

const Notifications = ({requestedHolidays}) => {
    const classes = useStyles()
    const { holidays } = useContext(HolidayContext)
    const { profile } = useContext(UserContext)
    const [state, setState] = useState(false)
    const [reason, setReason] = useState("none")
    const [notification, setNotification] = useState([])
    const history = useHistory()

    const handleRequest = async (holiday, state) => {
        const res = await fetch("https://astro-rh-back.herokuapp.com/api/holidays/handle", {
            method: "PATCH",
            mode: 'cors',
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ id: holiday._id, state: state, reason: reason })
        })
        const data = await res.status
        if (data !== 200)
            console.log(data)
        else {
            console.log(data)
        }
    }

    useEffect(() => {
        if(requestedHolidays.length !== 0){
            setNotification(requestedHolidays)
        }else{
            setNotification(holidays?.filter(holiday => holiday.requestedHoliday.thereIsARequest === true))
        }
    }, [requestedHolidays, holidays])

    return (
        <Box margin="5% auto" className={classes.root}>
            <Grid container spacing={3} direction="column">
                {   
                    notification?.map((holiday) => (
                        <Grid item xs={12} margin="auto" key={holiday._id}>
                            {IsAdmin(profile ? profile : { role: "other" }) ?
                                <Accordion key={holiday._id}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Box display="flex" justifyContent='space-between' width="100%">
                                            <Typography className={classes.heading}>{holiday.owner && typeof (holiday.owner) === "object" ? '(' + holiday.owner.firstName + " " + holiday.owner.lastName + ') has requested a holiday' : "you have requested a holiday"}</Typography>
                                            <Typography className={classes.heading}>{holiday.state ? "accepted" : (holiday.requestedHoliday.thereIsARequest ? "pending" : "rejected")}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box width="100%" marginBottom="5%">
                                            <Divider width="100%" />
                                            <Box margin="5%">
                                                <Typography>
                                                    {'from : ' + holiday.requestedHoliday.from}
                                                </Typography>
                                                <Typography>
                                                    {'to : ' + holiday.requestedHoliday.to}
                                                </Typography>
                                                <Typography>
                                                    {'motive : ' + holiday.requestedHoliday.label}
                                                </Typography>
                                                <Typography>
                                                    {'description : ' + holiday.requestedHoliday.description}
                                                </Typography>
                                            </Box>
                                            <Box display={state ? 'block' : 'none'} >
                                                <TextField
                                                    label="reason"
                                                    onChange={e => setReason(e.target.value)}
                                                />
                                                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => { handleRequest(holiday, false); setState(!state); history.go(0) }}>comfirm reject</Button>
                                            </Box>
                                            <Box>
                                                <Button variant="outlined" component={RouterLink} to={"/home/calendar"}>check calendar</Button>
                                                <Button variant="outlined" color='primary' className={classes.button} onClick={() => {handleRequest(holiday, true) ; history.go(0)}}>accept</Button>
                                                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => setState(!state)}>reject</Button>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion> :
                                <></>}
                        </Grid>
                    ))
                }
                <Divider style={{margin : 20}}/>
                {
                    IsAdmin(profile ? profile : { role: "other" }) ? (holidays ? holidays.map(holiday => (
                        <Paper className={classes.paper} elevation={3} key={holiday._id}>
                            <Typography className={classes.heading}>{holiday.owner && typeof (holiday.owner) === "object" ? '(' + holiday.owner.firstName + " " + holiday.owner.lastName + ') has requested a holiday' : "you have requested a holiday"}</Typography>
                            <Typography>{holiday.requestedHoliday.from + "/" + holiday.requestedHoliday.to}</Typography>
                            <Typography className={classes.heading}>{holiday.state ? "accepted" : (holiday.requestedHoliday.thereIsARequest ? "pending" : `rejected, reason: ${holiday.requestedHoliday.reason}`)}</Typography>
                        </Paper>
                    )) : <></>) :  holidays ? holidays.filter(holiday => holiday.owner?._id === profile?._id).map(holiday => (
                        holiday.requestedHoliday.thereIsARequest || holiday.requestedHoliday.reason ?
                        <Paper className={classes.paper} elevation={3} key={holiday._id}>
                            <Typography className={classes.heading}>{"you have requested a holiday"}</Typography>
                            <Typography>{holiday.requestedHoliday.from + "/" + holiday.requestedHoliday.to}</Typography>
                            <Typography className={classes.heading}>{holiday.state ? "accepted" : (holiday.requestedHoliday.thereIsARequest ? "pending" : `rejected, reason: ${holiday.requestedHoliday.reason}`)}</Typography>
                        </Paper>
                    : <Typography variant="h6">you have no notifications</Typography> )) : <></>
                }
            </Grid>
        </Box>
    )
}

export default Notifications
