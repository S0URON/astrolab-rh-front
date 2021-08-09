// eslint-disable-next-line
import { Box, makeStyles, TextField, Grid, Typography, Button, Divider } from "@material-ui/core"
// eslint-disable-next-line
import { enGB } from 'date-fns/locale'
// eslint-disable-next-line
import { DateRangePickerCalendar } from 'react-nice-dates'
import { useState, useContext } from "react"
import { UserContext } from "../lib/UserContext"
import { useHistory } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    box: {
        margin: "5% auto",
        width: "600px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #fff",
        borderRadius: "10px",
        boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
}));

const Holiday = () => {
    const history = useHistory()
    // eslint-disable-next-line
    const { profile } = useContext(UserContext)
    const [range, setRange] = useState();
    const classes = useStyles();

    const handleRequest = async () => {
        const res = await fetch(`http://localhost:5050/api/holidays`, {
            method: "PATCH",
            mode: 'cors',
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(range)
        })
        const data = await res.status
        if (data !== 200)
            console.log(data)
        else
            history.get(0)
    }

    return (
        <>
            <Box className={classes.box}>
                {/*<DateRangePickerCalendar
                    startDate={createDate(profile ? profile.holiday.requestedHoliday.from : "")}
                    endDate={createDate(profile ? profile.holiday.requestedHoliday.to : "")}
                    locale={enGB}
                />*/}
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1} style={{ margin: "auto" }}>
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
                </Grid>
            </Box>
        </>
    )
}

export default Holiday
