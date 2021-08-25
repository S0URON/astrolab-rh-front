import { Dialog, Snackbar, DialogActions, Box, DialogContent, DialogTitle, Button, CircularProgress, Typography } from '@material-ui/core';
import { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';



const Uploadfile = ({ update, profile, employee }) => {
    const [files, setFiles] = useState({ contract: "", cin: "" })
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState({ status: false, msg: "" })

    const upload = async () => {
        setLoading(true)
        let notEmpty = true;
        for (let file of Object.entries(files)) {
            const key = file[0]
            const value = file[1]
            if (value) {
                notEmpty = true
                const url = await saveFile(value)
                if (url) {
                    switch (key) {
                        case "contract":
                            update({ ...profile, contract: url.secure_url })
                            break;
                        case "cin":
                            update({ ...profile, cinImg: url.secure_url })
                            break;
                        default:
                            break;
                    }
                } else
                    setErr({ status: true, msg: `error uploading ${key}` })
            } else
                notEmpty = false
        };
        if (!notEmpty) {
            setErr({ status: true, msg: `nothing to upload` })
            setLoading(false)
        }

        setOpen(false)
        if (!loading)
            setSnackbar(true)
    }

    const saveFile = async (file) => {


        const sig = await fetch('https://astro-rh-back.herokuapp.com/api/signCloudniary')
        const sigData = await sig.json()

        const formData = new FormData();
        formData.append('file', file)
        formData.append("api_key", sigData.apikey)
        formData.append("signature", sigData.signature);
        formData.append("upload_preset", "ml_default")
        formData.append("timestamp", sigData.timestamp)
        formData.append("format", "jpeg")
        formData.append("eager", 'c_pad,h_300,w_400|c_crop,h_200,w_260')
        formData.append("folder", "signed_uploads")


        const res = await fetch('https://api.cloudinary.com/v1_1/dbdut3yjg/image/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 200) {
            setLoading(false)
            return data
        } else {
            console.log(data.error.message)
            setLoading(false)
            return null
        }
    }
    return (
        <div style={{margin : '0px 0px 5px 50px'}}>
            <Button variant="outlined" onClick={() => setOpen(true)}>upload files</Button>
            <Dialog open={open} aria-labelledby="form-dialog-title" width="50%">
                <DialogTitle id="form-dialog-title">upload files</DialogTitle>
                <DialogContent>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        <Typography>upload contract:</Typography>
                        <input style={{ margin: "5px" }} type="file" onChange={(e) => setFiles({ ...files, contract: e.target.files[0] })} accept="application/pdf" />
                        <Typography>upload cin image:</Typography>
                        <input style={{ margin: "5px" }} type="file" onChange={(e) => setFiles({ ...files, cin: e.target.files[0] })} />
                    </Box>
                    <Box display={loading ? "flex" : "none"} margin="10px auto">
                        <Typography variant="h5" style={{ margin : '5px' }}>uploading </Typography>
                        <CircularProgress />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => { upload(); }}>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar} autoHideDuration={2000} onClose={() => setSnackbar(false)}>
                <MuiAlert severity={err.status ? 'error' : 'success'}>
                    {err.status ? err.msg : "successfully uploaded files"}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default Uploadfile
