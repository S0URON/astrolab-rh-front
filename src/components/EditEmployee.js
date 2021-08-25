import { useState, useEffect } from 'react';
import { Box, Grid, Dialog, DialogActions, DialogTitle, DialogContent, CircularProgress, TextField, makeStyles, Button } from '@material-ui/core'
import EmployeeAcc from './EmployeeAcc';
import { formValidator } from '../lib/errorHandler';
import { useHistory } from 'react-router-dom';

const dummy = [
    {
        firstName: "aazdaz",
        lastName: "zdadad",
        email: "dadada",
        phone_primary: "adadaz",
        phone_secondary: "dazdada",
        adress: 'adada',
        hiring_date: "azdazdazd",
        _id: 0,
    },
];

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
        flexBasis: '7%',
        backgroundImage: `url(${'https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?b=1&k=6&m=871752462&s=612x612&w=0&h=su9GconcV7Pr_uuQm1GDnPEFoqgGz0dliMHMfmJf_ro='})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "50%"
    }
}));

const EditEmployee = () => {
    const history = useHistory()
    const [dialogOpen, setDialogOpen] = useState(false);
    const [employees, setEmployees] = useState(dummy);
    const [error, setError] = useState({ msg: '', type: '' })
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone_primary: "",
        phone_secondary: "",
        adress: '',
        hiring_date: "",
        password: ""
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getEmployees = async () => {
            const employeeList = await fetchEmployees(localStorage.getItem("token"));
            setEmployees(employeeList)
        }
        getEmployees();
        

    }, [])
    const fetchEmployees = async (token) => {
        setLoading(true)
        const res = await fetch("https://astro-rh-back.herokuapp.com/api/employee", {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                "Authorization": 'Bearer ' + token,
            }),
        })
        const data = await res.json()
        setLoading(false)
        return data
    }

    const addEmployee = async () => {
        const res = await fetch("https://astro-rh-back.herokuapp.com/api/addemployee", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
        const data = await res.json()
        setEmployees([...employees, newEmployee]);
        console.log(data)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handleAddEmployee = () => {
        addEmployee();
        handleCloseDialog();
        history.go(0)
    }

    const classes = useStyles();
    return (
        <Box margin="5% auto" className={classes.root}>
            <Grid container direction="column" spacing={3}>
                {
                    loading ?
                        <CircularProgress />
                    : employees.map((employee, index) => (
                        <Grid item xs margin="auto" key={employee._id}>
                            <EmployeeAcc employee={employee} />
                        </Grid>
                    ))
                }
                <Grid item xs={12}>
                    <Button onClick={handleOpenDialog}>
                        add employee
                    </Button>
                    <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" width="50%">
                        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="firstName"
                                label="FirstName"
                                error={error.type === "firstName"}
                                helperText={error.type === "firstName" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, firstName: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="lastName"
                                label="LastName"
                                error={error.type === "lastName"}
                                helperText={error.type === "lastName" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, lastName: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email Address"
                                type="email"
                                error={error.type === "email"}
                                helperText={error.type === "email" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, email: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="phone_primary"
                                label="Primary Phone Number"
                                type="number"
                                error={error.type === "phone_primary"}
                                helperText={error.type === "phone_primary" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, phone_primary: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="phone_secondary"
                                label="Secondary Phone Number"
                                type="number"
                                error={error.type === "phone_secondary"}
                                helperText={error.type === "phone_secondary" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, phone_secondary: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="adress"
                                label="adress"
                                error={error.type === "adress"}
                                helperText={error.type === "adress" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, adress: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                type="date"
                                id="hiring_date"
                                label="hiring_date"
                                error={error.type === "date"}
                                helperText={error.type === "date" ? error.msg : ""}
                                onChange={(e) => { setNewEmployee({ ...newEmployee, hiring_date: e.target.value }) }}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                type="date"
                                id="hiring_date"
                                label="leaving_date"
                                error={error.type === "leaving_date"}
                                helperText={error.type === "leaving_date" ? error.msg : ""}
                                onChange={(e) => { setNewEmployee({ ...newEmployee, leaving_date: e.target.value }) }}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                type="date"
                                id="hiring_date"
                                label="birthdate"
                                error={error.type === "birthdate"}
                                helperText={error.type === "birthdate" ? error.msg : ""}
                                onChange={(e) => { setNewEmployee({ ...newEmployee, birthdate: e.target.value }) }}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="post"
                                error={error.type === "post"}
                                helperText={error.type === "post" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, post: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                label="CIN"
                                type="number"
                                error={error.type === "cin"}
                                helperText={error.type === "cin" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, cin: e.target.value }) }}
                            />
                            <TextField
                                margin="dense"
                                name="password"
                                label="password"
                                type="password"
                                error={error.type === "password"}
                                helperText={error.type === "password" ? error.msg : ""}
                                fullWidth
                                onChange={(e) => { setNewEmployee({ ...newEmployee, password: e.target.value }) }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => formValidator(newEmployee, handleAddEmployee, setError)}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditEmployee
