import { Box, Grid, Paper, Typography, makeStyles, Divider, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { Capitalize } from '../lib/mylib';
import { useState , useContext} from 'react';
import { UserContext } from '../lib/UserContext'


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
        padding: '5%'
    },
    typography: {
        textAlign: "center",
    }
}));

const Profile = () => {
    const {profile} = useContext(UserContext)

    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handlePwdChange = () => {
        handleCloseDialog();
    }
    return (
        <Box margin="2% auto" boxShadow=" 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="40%">
            <Box className={classes.box}>
                <Paper className={classes.paper}></Paper>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.typography} variant="h5">
                    {profile ? Capitalize(profile.firstName) + " " + Capitalize(profile.lastName) : ""}
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
                            <Button onClick={handleOpenDialog}>
                                Change Password
                            </Button>
                            <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" width="50%">
                                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        name="oldPassword"
                                        label="Old Password"
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        name="newPassword"
                                        label="new Password"
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        name="comfirmNewPassword"
                                        label="comfirm Password"
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="primary">
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
