// eslint-disable-next-line
import { Box, makeStyles, TextField, Grid, Typography, Button, Divider } from "@material-ui/core"
// eslint-disable-next-line
import { enGB } from 'date-fns/locale'
// eslint-disable-next-line
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import { useState, useContext } from "react"
import { UserContext } from "../lib/UserContext"
import { useHistory } from "react-router-dom"
import { format } from "date-fns";


const useStyles = makeStyles((theme) => ({
    box: {
        margin: "2% auto",
        width: "600px",
        height: "400px",
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
        marginTop: "100px"
    },
    TextField: {
        maxWidth: "200px",
        margin: "5px auto"

    },
    Typography : {
        marginTop : "50px"
    }
}));

const Holiday = () => {
    const history = useHistory()
    // eslint-disable-next-line
    const { profile } = useContext(UserContext)
    const [label, setLabel] = useState();
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const classes = useStyles();

    const handleRequest = () => {
        const makeRequest = async () => {
            const res = await fetch(`http://localhost:5050/api/holidays`, {
                method: "PATCH",
                mode: 'cors',
                headers: new Headers({
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({label : label , from: format(startDate, 'yyyy-MM-dd'), to: format(endDate, 'yyyy-MM-dd') })
            })
            const data = await res.status
            if (data !== 200)
                console.log(data)
            else
                history.go(0)
        }
        if(label && startDate && endDate)
            makeRequest()
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
                <TextField
                    type="text"
                    name="name"
                    onChange={(e) => setLabel(e.target.value)}
                    label="label"
                    className={classes.TextField}
                />
                <Divider width="100%" className={classes.divider} />
                <Button variant="outlined" color='primary' onClick={handleRequest} className={classes.button}>request</Button>
                {/*<Grid container direction="column" justifyContent="center" alignItems="center" spacing={1} style={{ margin: "auto" }}>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            type="date"
                            name="from"
                            label="from"
                            onChange={(e) => setRange({ ...range, from: e.target.value })}
                            defaultValue="1970-01-01"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            type="date"
                            name="to"
                            onChange={(e) => setRange({ ...range, to: e.target.value })}
                            fullWidth
                            label="to"
                            defaultValue="1970-01-01"
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            type="text"
                            name="name"
                            onChange={(e) => setRange({ ...range, label: e.target.value })}
                            fullWidth
                            label="label"
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button onClick={handleRequest}>request</Button>
                    </Grid>
                </Grid>*/}
            </Box>
        </>
    )
}

export default Holiday
