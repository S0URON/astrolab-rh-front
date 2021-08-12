import { Box, Typography, Grid, Paper, makeStyles, Divider, Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core"
import { HolidayContext, UserContext } from "../lib/UserContext"
import { useContext } from "react"
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { IsAdmin } from "../lib/mylib"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "40%"
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"

    },
    button: {
        margin: "1%"
    }
}));

const Notifications = () => {
    const classes = useStyles()
    const { holidays } = useContext(HolidayContext)
    const { profile } = useContext(UserContext)
    const history = useHistory()

    const handleRequest = async (holiday, state) => {
        const res = await fetch("http://localhost:5050/api/holidays/handle", {
            method: "PATCH",
            mode: 'cors',
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ id: holiday._id, state: state })
        })
        const data = await res.status
        if (data !== 200)
            console.log(data)
        else{
            console.log(data)
            history.go(0)
        }
           
    }
    return (
        <Box margin="5% auto" className={classes.root}>
            <Grid container spacing={3} direction="column">
                {
                    holidays ? holidays.filter((holiday) => holiday.requestedHoliday.thereIsARequest === true).map((holiday) => (
                        <Grid item xs={12} margin="auto" key={holiday._id}>
                            {IsAdmin(profile ? profile : { role: "other" }) ?
                                <Accordion>
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
                                            </Box>
                                            <Box>
                                                <Button variant="outlined" component={RouterLink} to={"/home/calendar"}>check calendar</Button>
                                                <Button variant="outlined" color='primary' className={classes.button} onClick={() => handleRequest(holiday, true)}>accept</Button>
                                                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => handleRequest(holiday, false)}>reject</Button>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion> :
                                <></>}
                        </Grid>
                    )) : <></>
                }
                {
                   !IsAdmin(profile ? profile : {role : "other"}) ? (holidays ? holidays.map(holiday => (
                        <Paper className={classes.paper} elevation={3} key={holiday._id}>
                            <Typography className={classes.heading}>{holiday.owner && typeof (holiday.owner) === "object" ? '(' + holiday.owner.firstName + " " + holiday.owner.lastName + ') has requested a holiday' : "you have requested a holiday"}</Typography>
                            <Typography>{holiday.requestedHoliday.from + "/" + holiday.requestedHoliday.to}</Typography>
                            <Typography className={classes.heading}>{holiday.state ? "accepted" : (holiday.requestedHoliday.thereIsARequest ? "pending" : "rejected")}</Typography>
                        </Paper>
                    )) : <></>) : <></>
                }
            </Grid>
        </Box>
    )
}

export default Notifications
