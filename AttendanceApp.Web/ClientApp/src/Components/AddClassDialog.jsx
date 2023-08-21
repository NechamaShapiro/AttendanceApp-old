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

const AddClassDialog = (props) => {

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
        setDialogText('');
    };
    const handleAddCloseDialog = async () => {
        await axios.post(`/api/app/createclass?className=${dialogText}`);
        setOpen(false);
        setDialogText('');
        props.onAdd();
    };
    return (
        <>
            <Button variant="text" onClick={handleOpenDialog}>
                Add new class
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new class:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Class"
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

export default AddClassDialog;