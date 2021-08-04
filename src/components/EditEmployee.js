import { useState } from 'react';
import { Box, Grid, Dialog, DialogActions, DialogTitle, DialogContent, TextField,makeStyles , Button } from '@material-ui/core'
import EmployeeAcc from './EmployeeAcc';


const employeeList = [
    {
        firstName: "medamin",
        lastName: "el mokni",
        email: "example@gmail.com",
        phone_primary: "52045911",
        phone_secondary: "73303405",
        adress: '',
        hiring_date: "2001-12-14",
        id : 1,
    },
    {
        firstName: "med",
        lastName: "ALi",
        email: "example@gmail.com",
        phone_primary: "52045911",
        phone_secondary: "73303405",
        adress: '',
        hiring_date: "2011-01-15",
        id : 2,
    },
    {
        firstName: "wajih",
        lastName: "el abed",
        email: "example@gmail.com",
        phone_primary: "52045911",
        phone_secondary: "73303405",
        adress: '',
        hiring_date: "2012-04-06",
        id : 3,
    },
    {
        firstName: "ahmed",
        lastName: "khorda",
        email: "example@gmail.com",
        phone_primary: "52045911",
        phone_secondary: "73303405",
        adress: '',
        hiring_date: "2015-01-15",
        id : 4,
}];

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

const updateAttribute = (att, e) => {
    switch (e.target.name) {
        case "firstName":
            att.firstName = e.target.value;
            break;
        case "lastName":
            att.lastName = e.target.value;
            break;
        case "email":
            att.email = e.target.value;
            break;
        case "phone_primary":
            att.phone_primary = e.target.value;
            break;
        case "phone_secondary":
            att.phone_secondary = e.target.value;
            break;
        case "adress":
            att.adress = e.target.value;
            break;
        case "hiring_date":
            att.hiring_date = e.target.value;
            break;
        default:
            break;
    }

}

const EditEmployee = () => {
    const [employees, setEmployees] = useState(employeeList);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone_primary: "",
        phone_secondary: "",
        adress: '',
        hiring_date: ""
    });

   /* const fetchEmployees = async (token) => {

    }*/

    const UpdateEmployees = (e, index) => {
        let newData = [...employees];
        updateAttribute(newData[index], e);
        setEmployees(newData);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
    }
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handleAddEmployee = () => {
        setEmployees([...employees, newEmployee]);
        handleCloseDialog();
    }

    const classes = useStyles();
    return (
        <Box margin="5% auto" className={classes.root}>
            <Grid container direction="column" spacing={3}>
                {
                    employees.map((employee, index) => (
                        <Grid item xs margin="auto" key={index}>
                            <EmployeeAcc id={employee.id} firstName={employee.firstName} lastName={employee.lastName} email={employee.email} phone_primary={employee.phone_primary} phone_secondary={employee.phone_secondary} adress={employee.adress} hiring_date={employee.hiring_date} index={index} update={UpdateEmployees}/>
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
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, firstName : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="lastName"
                                label="LastName"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, lastName : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, email : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="phone_primary"
                                label="Primary Phone Number"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, phone_primary : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="phone_secondary"
                                label="Secondary Phone Number"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, phone_secondary : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="adress"
                                label="adress"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, adress : e.target.value})}}
                            />
                            <TextField
                                margin="dense"
                                name="hiring_date"
                                label="Date Hired"
                                fullWidth
                                onChange={(e) => {setNewEmployee({...newEmployee, hiring_date : e.target.value})}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleAddEmployee}>
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
