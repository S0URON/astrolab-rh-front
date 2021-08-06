import { Box, makeStyles } from "@material-ui/core"
// eslint-disable-next-line
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import { useState } from "react"

const useStyles = makeStyles((theme) => ({
    box: {
        margin: "5% auto",
        width: "400px",
        height: "390px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #fff",
        borderRadius: "10px",
        boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
}));

const Calendar = () => {
    const classes = useStyles();
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focus, setFocus] = useState(START_DATE)
    const handleFocusChange = newFocus => {
        setFocus(newFocus || START_DATE)
    }
    return (
        <>
            <p>Selected start date: {startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</p>
            <p>Selected end date: {endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}.</p>
            <p>Currently selecting: {focus}.</p>
            <div className={classes.box}>
                <DateRangePickerCalendar
                    startDate={startDate}
                    endDate={endDate}
                    focus={focus}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onFocusChange={handleFocusChange}
                    locale={enGB}
                />
            </div>
        </>
    )
}

export default Calendar
