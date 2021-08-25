// eslint-disable-next-line
import { Box, makeStyles, TextField, Grid, Typography, Button, Divider, TextareaAutosize } from "@material-ui/core"
// eslint-disable-next-line
import { enGB } from 'date-fns/locale'
// eslint-disable-next-line
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import { useState, useContext } from "react"
import { SocketContext } from "../lib/UserContext"
import { useHistory } from "react-router-dom"
import { format } from "date-fns";


const useStyles = makeStyles((theme) => ({
    box: {
        margin: "2% auto",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #736b5e",
        borderRadius: "10px",
    },
    button: {
        width: "100px",
        margin: "20px auto"
    },
    divider: {
        margin: "20px auto 0 auto"
    },
    TextField: {
        maxWidth: "200px",
        margin: "50px 5px"

    },
    Typography: {
        marginTop: "50px"
    }
}));

const Holiday = () => {
    // eslint-disable-next-line
    const history = useHistory()
    const { socket } = useContext(SocketContext)
    const [label, setLabel] = useState();
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [description, setDescription] = useState()
    const [holidayErr, setHolidayErr] = useState({ msg: "", type: "" })
    const classes = useStyles();

    

    const handleRequest = () => {
        
        const makeRequest = async () => {
            const res = await fetch(`https://astro-rh-back.herokuapp.com/api/holidays`, {
                method: "PATCH",
                mode: 'cors',
                headers: new Headers({
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ label: label, from: format(startDate, 'yyyy-MM-dd'), to: format(endDate, 'yyyy-MM-dd'), description : description })
            })
            const data = await res.json()
            if (res.status !== 200)
                console.log(data)
            else
                socket?.emit('requestHoliday', data);
                //history.go(0)

                
        }
        
        if (label && startDate && endDate && description)
            makeRequest()
        else
            if (!label || label === "")
                setHolidayErr({ msg: "label is required !", type: "holiday label" })
            else if (!description || description === "")
                setHolidayErr({ msg: "description is required !", type: "holiday description" })
            else
                setHolidayErr({ msg: "start date and end date are required", type: "holiday date" })
    }

    return (
        <>
            <Box className={classes.box}>
                <Typography variant="h4" className={classes.Typography}>Request A Holiday</Typography>
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    minimumDate={new Date()}
                    minimumLength={1}
                    format='dd MMM yyyy'
                    locale={enGB}
                >
                    {({ startDateInputProps, endDateInputProps, focus }) => (
                        <div className='date-range'>
                            <input
                                className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                {...startDateInputProps}
                                placeholder='Start date'
                            />
                            <span className='date-range_arrow' />
                            <input
                                className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                {...endDateInputProps}
                                placeholder='End date'
                            />
                        </div>
                    )}
                </DateRangePicker>
                <Box>
                <TextField
                    type="text"
                    name="label"
                    variant="outlined"
                    onChange={(e) => { setLabel(e.target.value); setHolidayErr({ msg: "", type: "" }) }}
                    label="label"
                    className={classes.TextField}
                    error={holidayErr.type === "holiday label"}
                    helperText={holidayErr.type === "holiday label" ? holidayErr.msg : ""}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    multiline
                    className={classes.TextField}
                    name="description"
                    onChange={(e) => { setDescription(e.target.value); setHolidayErr({ msg: "", type: "" }) }}
                    label="description"
                    error={holidayErr.type === "holiday description"}
                    helperText={holidayErr.type === "holiday description" ? holidayErr.msg : ""}
                />
                </Box>
                <Typography variant="subtitle2" color="secondary">{holidayErr.type === "holiday date" ? holidayErr.msg : ""}</Typography>
                <Divider width="80%" variant="middle" className={classes.divider} />
                <Button variant="outlined" color='primary' onClick={handleRequest} className={classes.button}>request</Button>
            </Box>
        </>
    )
}

export default Holiday
