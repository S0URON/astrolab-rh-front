import { useState } from 'react';
import ProfileForm from './FormExample';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Paper, Typography, makeStyles, Divider, Button, Avatar,Dialog, DialogActions, DialogTitle, DialogContent, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { formValidator } from '../lib/errorHandler';

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
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"

    },
    text: {
        margin: 'auto 0'
    },
    small : {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }
}));

const EmployeeAcc = ({ employee }) => {
    const history = useHistory()
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updatedEmployee, setUpdatedEmployee] = useState({})
    const [error, setError] = useState({msg : "", type : ""});
    const handleCloseDialog = () => {
        setDialogOpen(false);
    }
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }

    const patchUser = async () =>{
        const res = await fetch(`https://astro-rh-back.herokuapp.com/api/employee`,{
            method : "PATCH",
            mode : 'cors',
            headers :new Headers({
                "Authorization": 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({...updatedEmployee, uid : employee._id})
        })
        // eslint-disable-next-line
        const data = await res.json()
        history.go(0)
    }
    return (
        <div>
            <Paper className={classes.paper} variant="outlined">
                <Avatar alt="placeholder" src={employee?.profileImg}   className={classes.small}/>
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
                <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
                <DialogContent>
                    <ProfileForm employee={employee} profile={updatedEmployee} update={setUpdatedEmployee} error={error}/>
                    <Divider />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={()=> formValidator(updatedEmployee, patchUser, setError)}>
                        save
                    </Button>
                </DialogActions>
            </Dialog>
        </div > 
    )
}

export default EmployeeAcc
