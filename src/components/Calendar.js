import { Box, makeStyles, Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from "@material-ui/core"
import { useState, useContext, useEffect } from "react"
import { HolidayContext, UserContext } from "../lib/UserContext"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { format } from "date-fns";
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    Resources,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { createDate } from "../lib/mylib";

const useStyles = makeStyles((theme) => ({
    box: {
        overflow: "hidden",
        marginLeft: "240px",
        position: "left",
        width: window.innerWidth - 245,
        height: window.innerHeight - 70,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #fff",
        borderRadius: "10px",
        boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        color: theme.typography.h4.color
    },
    Dialog: {
        margin: 30
    }
}));


const Calendar = () => {
    const { profile } = useContext(UserContext)
    const { holidays } = useContext(HolidayContext)
    const [selectedAppointment, setSelectedAppointment] = useState()
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const [currentDate, setCurrentDate] = useState("2015-02-01")

    useEffect(() => {
        const today = format(new Date(), 'yyyy-MM-dd')
        setCurrentDate(today)
        // eslint-disable-next-line
    }, [])

    const filterStuff = (e) => {
        const appointment = e.target.innerHTML.split('-')
        //if (profile?.role === "admin")
        const selectedHolidays = holidays?.filter((holiday) => holiday.owner?.firstName + ' ' + holiday.owner?.lastName === appointment[1]);
        //else
            //selectedHolidays = [profile.holiday]
        if(selectedHolidays.length > 0){
            setSelectedAppointment(selectedHolidays)
            setOpen(true)
        }else
            console.log("empty for some fkn reason")
    }

    let schedulerData;
    if (profile) {
        /*if (profile.role !== "admin") {
            if (typeof (profile.holiday) === "object" ? (profile.holiday.state === true || (profile.holiday.state === false && profile.holiday.requestedHoliday.thereIsARequest)) : false)
                schedulerData = [{ title: profile.holiday.requestedHoliday.label + '-' + profile.firstName + ' ' + profile.lastName, startDate: createDate(profile.holiday.requestedHoliday.from), endDate: createDate(profile.holiday.requestedHoliday.to), id: profile._id }];
        }
        else*/ 
        schedulerData = schedulerData = holidays ? holidays.filter(holiday => (holiday.state === true || (holiday.state === false && holiday.requestedHoliday.thereIsARequest))).map((holiday) => (
                { title: holiday ? holiday.requestedHoliday.label + '-' + holiday.owner?.firstName + ' ' + holiday.owner?.lastName : "", startDate: createDate(holiday ? holiday.requestedHoliday.from : ""), endDate: createDate(holiday ? holiday.requestedHoliday.to : ""), id: holiday._id }
            )) : [{ title: "", startDate: "", endDate: "", id: "" }]
    }
    const resource = [{
        fieldName: 'id',
        title: 'employee',
        instances: holidays ? holidays.filter(holiday => (holiday.state === true || (holiday.state === false && holiday.requestedHoliday.thereIsARequest))).map((holiday) => (
            { id: holiday._id, text: holiday.owner ? holiday.owner.firstName + ' ' + holiday.owner.lastName : holiday.requestedHoliday.label }
        )) : [{ id: "holiday._id", text: "" }]
    }]


    const Appointment = ({
        children, style, ...restProps
    }) => (
        <Appointments.Appointment
            {...restProps}
            onClick={(e) => { filterStuff(e) }}
        >
            {children}
        </Appointments.Appointment>
    );
    return (
        <Box className={classes.box}>
            <Scheduler
                data={schedulerData}
                height={window.innerHeight - 64}
            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />
                <MonthView
                />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments appointmentComponent={Appointment} />
                
                <Resources data={resource} mainResourceName={"id"} />
            </Scheduler>
            <Dialog open={open} aria-labelledby="form-dialog-title" width="100%">
                <DialogTitle id="form-dialog-title">Event Details</DialogTitle>
                <DialogContent>
                    <Box className={classes.Dialog}>
                        
                        {selectedAppointment?.map(holiday => (
                            <Box key={holiday._id}>
                            <Typography variant="h6">Employee : </Typography>
                            <Typography>{holiday.owner?.firstName ? holiday.owner?.firstName : profile.firstName} {holiday.owner.lastName ? holiday.owner.lastName : profile.lastName}</Typography>
                            <Typography variant="h6">Duration : </Typography>
                            <Typography>from : {format(new Date(holiday.requestedHoliday.from), "MMM dd yyyy")} / to : {format(new Date(holiday.requestedHoliday.to), "MMM dd yyyy")}</Typography>
                            <Typography variant="h6">Label :</Typography>
                            <Typography>{holiday.requestedHoliday.label}</Typography>
                            <Typography variant="h6">Description :</Typography>
                            <Typography>{holiday.requestedHoliday.description}</Typography>
                            <Typography variant="h6">State :</Typography>
                            <Typography>{holiday.state ? "accepted" : (holiday.requestedHoliday.thereIsARequest ? "pending" : "rejected")}</Typography>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Calendar
