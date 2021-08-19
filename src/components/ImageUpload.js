import { useState } from 'react';
import { Box, makeStyles, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '5px 10px 5px 10px',
        width : 150,
        height : 150
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '50%',
        width: 150,
        height: 150,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        cursor: "pointer",
        display: "block",
    },
    over: {
        backgroundColor: "rgba(0,0,0,.3)",
        width: "inherit",
        height: "inherit",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: '50%',
        padding: 0,
        margin: 0,
        position: 'relative',
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "white"
    }
}));

const ImageUpload = ({ updateImage, profile, employee }) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(employee?.profileImg);
    const [file, setFile] = useState()
    const classes = useStyles()

    const saveImage = async (file) => {

        const formData = new FormData();
        formData.append('file', file)
        formData.append("api_key", "959682135812466" )
        formData.append("upload_preset", "cbjd4cib" )

    
        const res = await fetch('https://api.cloudinary.com/v1_1/dbdut3yjg/image/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 200) {
            setImage(data.secure_url)
            updateImage({ ...profile, profileImg: data.secure_url })
        }else{
            console.log(data.error.message)
        }
    }
    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper} style={{ backgroundImage: `url(${image})` }} onClick={() => setOpen(true)}>
                <Box className={classes.over}>
                    <Typography>upload new image</Typography>
                </Box>
            </Paper>
            <Dialog open={open} aria-labelledby="form-dialog-title" width="50%">
                <DialogTitle id="form-dialog-title">Change Image</DialogTitle>
                <DialogContent>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/png, image/jpeg"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => { saveImage(file) ;setOpen(false) }}>
                        confirm change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ImageUpload
