import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';

const SelectTeacher = ({ open, onClose, handleTeacherChange }) => {
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        const getTeachers = async () => {
            const { data } = await axios.get('/api/app/getteachers');
            data.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            setTeachers(data);
        }
        getTeachers();
    }, []);
    const onTeacherChange = (event, newValue) => {
        if (newValue) {
            handleTeacherChange(newValue.id);
        } else {
            handleTeacherChange(0);
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
                options={teachers}
                getOptionLabel={(option) => option.name}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Select Teacher" />}
                onChange={onTeacherChange}
                required
            />
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    );
};

export default SelectTeacher;
