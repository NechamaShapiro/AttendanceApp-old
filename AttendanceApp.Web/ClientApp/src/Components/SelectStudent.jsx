import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';

const SelectStudent = ({ open, onClose, handleStudentChange }) => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const getStudents = async () => {
            const { data } = await axios.get('/api/app/getallstudents'); //check backend to see if connected
            data.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            setStudents(data);
        }
        getStudents();
    }, []);
    const onStudentChange = (event, newValue) => {
        if (newValue) {
            handleStudentChange(newValue.id);
        } else {
            handleStudentChange(0);
        }
    };
    const handleSubmit = () => {
        onClose();
    };

    if (!open) return null;

    return (
        <>
            <br></br>
            <br></br>
            <Autocomplete
                disablePortal
                options={students}
                getOptionLabel={(option) => option.name}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Select Student" />}
                onChange={onStudentChange}
                required
            />
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    );
};

export default SelectStudent;
