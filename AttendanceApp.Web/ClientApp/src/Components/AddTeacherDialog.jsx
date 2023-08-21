import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

const AddTeacherDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');

    const handleOpenDialog = () => {
        setOpen(true);
    };
    const onDialogTextChange = (event) => {
        setDialogText(event.target.value);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleAddCloseDialog = async () => {
        await axios.post(`/api/app/addteacher?name=${dialogText}`);
        setOpen(false);
        props.onAdd();
    };
    return (
        <>
            <Button variant="text" onClick={handleOpenDialog}>
                Add new Teacher
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                {/* <DialogTitle>Create New Teacher</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Enter new Teacher:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Teacher"
                        fullWidth
                        variant="standard"
                        value={dialogText}
                        onChange={onDialogTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddCloseDialog}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddTeacherDialog;