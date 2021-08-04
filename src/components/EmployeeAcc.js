import {Capitalize} from '../lib/mylib'
import ProfileForm from './FormExample';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {Box,Typography, makeStyles, Accordion, AccordionSummary, AccordionActions, AccordionDetails, Divider, Button } from '@material-ui/core'

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

const EmployeeAcc = ({firstName, lastName, email, phone_primary, phone_secondary, adress,id, hiring_date,index, update}) => {
    const classes = useStyles();
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<EditRoundedIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >   <div className={classes.pic}>

                </div>
                <Box p={2}>
                </Box>
                <div className={classes.column}>
                    <Typography className={classes.heading}>{Capitalize(firstName) + " " + Capitalize(lastName)}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.heading}>{hiring_date}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <ProfileForm firstName={firstName} lastName={lastName} email={email} id={id} phone_primary={phone_primary} phone_secondary={phone_secondary} adress={adress} hiring_date={hiring_date} index={index} update={update} />
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                    Save
                </Button>
            </AccordionActions>
        </Accordion>
    )
}

export default EmployeeAcc
