import { Box, makeStyles } from "@material-ui/core"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../lib/UserContext"
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
        marginLeft : "240px",
        position: "left",
        width: window.innerWidth-240,
        height: window.innerHeight-64,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #fff",
        borderRadius: "10px",
        boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
}));


const Calendar = () => {
    const { profile } = useContext(UserContext)
    const classes = useStyles();
    const [holidays, setHoliays] = useState([{
        requestedHoliday: { from: "1970-01-01", to: "1970-01-01", label: "placeholder" },
        owner: {
            firstName: "placeholder"
        }
    }]);

    const [currentDate, setCurrentDate] = useState("2015-02-01")

    useEffect(() => {
        const getHolidays = async () => {
            const fetchedHolidays = await fetchHolidays()
            if (fetchedHolidays)
                setHoliays(fetchedHolidays)
            else
                alert('get holidays failed')
        }
        if(profile.role)
            getHolidays()
        const today = format(new Date(), 'yyyy-MM-dd')
        setCurrentDate(today)
    }, [])

    const fetchHolidays = async () => {
        const res = await fetch("http://localhost:5050/api/holidays", {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
            }),
        })
        const data = await res.json()
        if (res.status === 200)
            return data
        else
            return null
    }

    let schedulerData;
    if (profile) {
        if (profile.role !== "admin")
            schedulerData = [{ title: profile ? (typeof (profile.holiday) === "object" ? profile.holiday.requestedHoliday.label : "") : "", startDate: createDate(profile ? (typeof (profile.holiday) === "object" ? profile.holiday.requestedHoliday.from : "") : ""), endDate: createDate(profile ? (typeof (profile.holiday) === "object" ? profile.holiday.requestedHoliday.to : "") : ""), id: profile._id }];
        else
            schedulerData = holidays.map((holiday) => (
                { title: holiday ? holiday.requestedHoliday.label : "", startDate: createDate(holiday ? holiday.requestedHoliday.from : ""), endDate: createDate(holiday ? holiday.requestedHoliday.to : ""), id: holiday._id }
            ))
    }
    const resource = [{
        fieldName: 'id',
        title: 'employee',
        instances: holidays.map((holiday) => (
            { id: holiday._id, text: holiday.owner ? holiday.owner.firstName + ' ' + holiday.owner.lastName : holiday.requestedHoliday.label }
        ))
    }]

    return (
        <Box className={classes.box}>
            <Scheduler
                data={schedulerData}
                height={window.innerHeight-64}
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
