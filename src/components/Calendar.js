import { Box, makeStyles } from "@material-ui/core"
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
    TodayButton,
    AppointmentTooltip
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
        boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
}));


const Calendar = () => {
    const { profile } = useContext(UserContext)
    const { holidays } = useContext(HolidayContext)
    const classes = useStyles();
    const [currentDate, setCurrentDate] = useState("2015-02-01")

    useEffect(() => {
        const today = format(new Date(), 'yyyy-MM-dd')
        setCurrentDate(today)
        // eslint-disable-next-line
    }, [])

    let schedulerData;
    if (profile) {
        if (profile.role !== "admin"){
            if(typeof (profile.holiday) === "object" ? profile.holiday.state === true : false)
                schedulerData = [{ title:  profile.holiday.requestedHoliday.label, startDate: createDate(profile.holiday.requestedHoliday.from), endDate: createDate(profile.holiday.requestedHoliday.to), id: profile._id }];
        }
        else
            schedulerData = holidays ? holidays.filter(holiday => holiday.state === true).map((holiday) => (
                { title: holiday ? holiday.requestedHoliday.label : "", startDate: createDate(holiday ? holiday.requestedHoliday.from : ""), endDate: createDate(holiday ? holiday.requestedHoliday.to : ""), id: holiday._id }
            )) : [{ title: "", startDate: "", endDate: "", id: ""}]
    }
    const resource = [{
        fieldName: 'id',
        title: 'employee',
        instances: holidays ? holidays.filter(holiday => holiday.state === true).map((holiday) => (
            { id: holiday._id, text: holiday.owner ? holiday.owner.firstName + ' ' + holiday.owner.lastName : holiday.requestedHoliday.label }
        )) : [{ id: "holiday._id", text: ""}]
    }]

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
                <Appointments />
                <AppointmentTooltip />
                <Resources data={resource} mainResourceName={"id"} />
            </Scheduler>
        </Box>
    )
}

export default Calendar
