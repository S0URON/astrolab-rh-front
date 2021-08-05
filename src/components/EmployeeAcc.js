import { useState } from 'react';
import { Capitalize } from '../lib/mylib'
import ProfileForm from './FormExample';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Paper, Box, Typography, makeStyles, Divider, Button, Dialog, DialogActions, DialogTitle, DialogContent, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "40%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    pic: {
        flexBasis: '9%',
        backgroundImage: `url(${'https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?b=1&k=6&m=871752462&s=612x612&w=0&h=su9GconcV7Pr_uuQm1GDnPEFoqgGz0dliMHMfmJf_ro='})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "50%"
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"

    },
    text: {
        margin: 'auto 0'
    }
}));

const EmployeeAcc = ({ employee }) => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updatedEmployee, setUpdatedEmployee] = useState({})
    const handleCloseDialog = () => {
        setDialogOpen(false);
    }
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const patchUser = async () =>{
        const res = await fetch(`http://localhost:5050/api/employee`,{
            method : "PATCH",
            mode : 'cors',
            headers :new Headers({
                "Authorization": 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({...updatedEmployee, uid : employee._id})
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div>
            <Paper className={classes.paper} variant="outlined">
                <div className={classes.pic}>
                </div>
                <Typography className={classes.text}>
                    {employee.firstName + " " + employee.lastName}
                </Typography>
                <Typography className={classes.text}>
                    {employee.hiring_date}
                </Typography>
                <IconButton onClick={handleOpenDialog}>
                    <EditRoundedIcon />
                </IconButton>
            </Paper>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" width="50%">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    <ProfileForm employee={employee} profile={updatedEmployee} update={setUpdatedEmployee} />
                    <Divider />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={patchUser}>
                        save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default EmployeeAcc
