import { Box, Grid, Paper, Typography, makeStyles, Divider, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, IconButton } from '@material-ui/core'
import { Capitalize } from '../lib/mylib';
import { useState, useContext } from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { UserContext } from '../lib/UserContext';
import ProfileForm from './FormExample';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '50%',
        width: 100,
        height: 100,
        backgroundImage: `url(${'https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?b=1&k=6&m=871752462&s=612x612&w=0&h=su9GconcV7Pr_uuQm1GDnPEFoqgGz0dliMHMfmJf_ro='})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    box: {
        margin: "auto",
        padding: '5%',
    },
    typography: {
        textAlign: "center",
    }
}));

const Profile = () => {
    const history = useHistory()
    const { profile } = useContext(UserContext)
    const [updatedEmployee, setUpdatedEmployee] = useState({})
    const [pass, setPass] = useState({})
    const classes = useStyles();
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);


    const handlePwdClose = () => {
        setPasswordDialogOpen(false);
    }
    const handlePwdOpen = () => {
        setPasswordDialogOpen(true);
    }
    const handlePwdChange = async () => {
        const res = await fetch(`http://localhost:5050/api/employee/cp`,{
            method : "PATCH",
            mode : 'cors',
            headers :new Headers({
                "Authorization": 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify(pass)
        })
        const data = await res.status
        if(data !== 200)
            console.log(data)
        else
            history.go(0)
    }
    const handleProfileChange = async () => {
        const res = await fetch(`http://localhost:5050/api/employee/me`,{
            method : "PATCH",
            mode : 'cors',
            headers :new Headers({
                "Authorization": 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({...updatedEmployee})
        })
       
        const data = await res.json()
        console.log(data)
        history.go(0)
    }
    return (
        <Box margin="2% auto" boxShadow=" 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="40%">
            <Box className={classes.box}>
                <Paper className={classes.paper}></Paper>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.typography} variant="h5">
                    {profile ? Capitalize(profile.firstName) + " " + Capitalize(profile.lastName) : ""}
                    { profile ? (profile.role !== "admin" ? 
                    <IconButton onClick={() => setDialogOpen(true)}>
                        <EditRoundedIcon />
                    </IconButton> : <></> ) : <></>}
                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title" width="50%">
                        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                        <DialogContent>
                            <ProfileForm employee={profile} profile={updatedEmployee} update={setUpdatedEmployee} />
                            <Divider />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleProfileChange}>
                                save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Typography>
            </Box>
            <Divider variant="middle" width="80%" />
            <Box className={classes.box}>
                <Grid container direction='row' display="flex" justifyContent='space-between' spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.typography}>
                            {profile ? profile.email : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.typography}>
                            {profile ? profile.hiring_date : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.typography}>
                            <Button onClick={handlePwdOpen}>
                                Change Password
                            </Button>
                            <Dialog open={passwordDialogOpen} onClose={handlePwdClose} aria-labelledby="form-dialog-title" width="50%">
                                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        name="oldPassword"
                                        label="Old Password"
                                        fullWidth
                                        onChange={(e) => setPass({...pass, oldPassword : e.target.value})}
                                    />
                                    <TextField
                                        margin="dense"
                                        name="newPassword"
                                        label="new Password"
                                        onChange={(e) => setPass({...pass, newPassword : e.target.value})}
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        name="comfirmNewPassword"
                                        label="comfirm Password"
                                        onChange={(e) => setPass({...pass, comfirmNewPassword : e.target.value})}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handlePwdClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={handlePwdChange}>
                                        confirm change
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Profile
