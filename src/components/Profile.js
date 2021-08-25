import { Box, Grid, Paper, Typography, makeStyles, Divider, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, IconButton} from '@material-ui/core'
import { Capitalize } from '../lib/mylib';
import { useState, useContext } from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { UserContext } from '../lib/UserContext';
import ProfileForm from './FormExample';
import { useHistory } from 'react-router-dom'
import errorHandler, { formValidator } from '../lib/errorHandler';


const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '50%',
        width: 150,
        height: 150,
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
    const [pass, setPass] = useState({ oldPassword: "", newPassword: "", comfirmNewPassword: "" })
    const classes = useStyles();
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [changePassErr, setChangePassErr] = useState({ msg: "", type: "" })
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState({msg : "", type : ""});



    const handlePwdClose = () => {
        setPasswordDialogOpen(false);
    }
    const handlePwdOpen = () => {
        setPasswordDialogOpen(true);
    }
    const handlePwdChange = async () => {
        const res = await fetch(`http://localhost:5050/api/employee/cp`, {
            method: "PATCH",
            mode: 'cors',
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(pass)
        })
        const data = await res.json()
        if (res.status !== 200)
            setChangePassErr(errorHandler(data.error))
        else
            history.go(0)
    }

    const handleProfileChange = async () => {
        const res = await fetch(`https://astro-rh-back.herokuapp.com/api/employee/me`, {
            method: "PATCH",
            mode: 'cors',
            headers: new Headers({
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ ...updatedEmployee })
        })

        const data = await res.json()
        console.log(data)
        history.go(0)
    }
    
    const passValidator = () => {
        if (pass.oldPassword === "")
            setChangePassErr({ msg: 'this feild is required', type: "oldpass" })
        else if (pass.newPassword === "")
            setChangePassErr({ msg: 'this feild is required', type: "newpass" })
        else if (pass.comfirmNewPassword === "")
            setChangePassErr({msg:"this feild is required" , type:"confnewpass"})
        else if (pass.comfirmNewPassword !== pass.newPassword)
            setChangePassErr({msg:"new password and confirm password should match" , type:"confnewpass"})
        else
            handlePwdChange()
    }
    
    return (
        <Box margin="2% auto" border="1px solid #736b5e" style={{overflow : "hidden"}}
            borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="40%">
            <Box className={classes.box}>
                <Paper variant="outlined" className={classes.paper} style={{backgroundImage: `url(${profile?.profileImg})`}}></Paper>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.typography} variant="h5">
                    {profile ? Capitalize(profile.firstName) + " " + Capitalize(profile.lastName) : ""}
                        <IconButton onClick={() => setDialogOpen(true)}>
                            <EditRoundedIcon />
                        </IconButton>
                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title" width="50%">
                        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                        <DialogContent>
                            <ProfileForm employee={profile} profile={updatedEmployee} update={setUpdatedEmployee} error={error}/>
                            <Divider />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={()=>formValidator(updatedEmployee, handleProfileChange, setError)}>
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
                            <Button variant="outlined" color="primary" onClick={handlePwdOpen}>
                                Change Password
                            </Button>
                            <Dialog open={passwordDialogOpen} onClose={handlePwdClose} aria-labelledby="form-dialog-title" width="50%">
                                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        name="oldPassword"
                                        label="Old Password"
                                        type="password"
                                        required
                                        fullWidth
                                        error={changePassErr.type === "oldpass"}
                                        helperText={changePassErr.type === "oldpass" ? changePassErr.msg : ""}
                                        onChange={(e) => {setPass({ ...pass, oldPassword: e.target.value }) ; setChangePassErr({ msg: "", type: "" })}}
                                    />
                                    <TextField
                                        margin="dense"
                                        type="password"
                                        required
                                        name="newPassword"
                                        label="new Password"
                                        error={changePassErr.type === "newpass"}
                                        helperText={changePassErr.type === "newpass" ? changePassErr.msg : ""}
                                        onChange={(e) => {setPass({ ...pass, newPassword: e.target.value }) ; setChangePassErr({ msg: "", type: "" })}}
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        type="password"
                                        required
                                        name="comfirmNewPassword"
                                        label="comfirm Password"
                                        error={changePassErr.type === "confnewpass"}
                                        helperText={changePassErr.type === "confnewpass" ? changePassErr.msg : ""}
                                        onChange={(e) => {setPass({ ...pass, comfirmNewPassword: e.target.value }) ; setChangePassErr({ msg: "", type: "" })}}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handlePwdClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={passValidator}>
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
