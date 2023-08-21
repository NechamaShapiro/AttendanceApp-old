import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Autocomplete,
    Alert,
    Grid
} from '@mui/material';
import AddClassDialog from './AddClassDialog';
import AddTeacherDialog from './AddTeacherDialog';

const CreateCourse = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(0);
    const [subject, setSubject] = useState('');

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
    useEffect(() => {
        getTeachers();
    }, []);

    const onClassChange = (event, newValue) => {
        if (newValue) {
            props.handleClassChange(newValue.id);
        } else {
            props.handleClassChange(0);
        }
    };
    const onTeacherChange = (event, newValue) => {
        if (newValue) {
            setSelectedTeacherId(newValue.id);
        } else {
            setSelectedTeacherId('select');
        }
    };
    const onSubjectChange = (event) => {
        setSubject(event.target.value);
    }
    const onGradeChange = (event) => {
        props.handleGradeChange(event.target.value);
        console.log("grade:", props.grade);
    };
    const handleDialogClassAdd = () => {
        props.handleDialogClassAdd();
    };
    const handleDialogTeacherAdd = () => {
        getTeachers();
    };
    const onCreateClick = async () => {
        try {
            const response = await axios.post(`/api/app/createcourse?subject=${subject}&grade=${props.grade}&classId=${props.classId}&teacherId=${selectedTeacherId}`);
            props.handleCreate(response.data);
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors that occurred during the POST request.
        }
        setSubject('');
        setSelectedTeacherId('select');
    };
    return (
        <>
            {/* <h6><u>Directions:</u></h6>
            <ol>
                <li>Enter the course subject.</li>
                <li>Choose the grade, and if relevant, class.</li>
                <li>Enter the teacher. If the teacher is not in the system, click 'Add new teacher' to add.</li>
                <li>Click CREATE COURSE.</li>
                <li>To add sessions for the course, click ADD SESSIONS.</li>
            </ol> */}
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField id="course-text" label="Enter Course Subject" variant="standard" onChange={onSubjectChange} required />
                </Grid>
                <Grid item xs={2}>
                    <FormControl>
                        <InputLabel>Select Grade</InputLabel>
                        <Select
                            value={props.grade}
                            label="Select Grade"
                            onChange={onGradeChange}
                            required
                        >
                            <MenuItem value={0} disabled>Select Grade</MenuItem>
                            <MenuItem key={9} value={9}>9th Grade</MenuItem>
                            <MenuItem key={10} value={10}>10th Grade</MenuItem>
                            <MenuItem key={11} value={11}>11th Grade</MenuItem>
                            <MenuItem key={12} value={12}>12th Grade</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        options={props.classes}
                        getOptionLabel={(option) => option.className}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} label="Select Class" />}
                        onChange={onClassChange}
                    />
                    <AddClassDialog onAdd={handleDialogClassAdd} />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        options={teachers}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Select Teacher" />}
                        onChange={onTeacherChange}
                        required
                    />
                    <AddTeacherDialog onAdd={handleDialogTeacherAdd} />
                </Grid>
                <Grid item xs={2}>
                    <div style={{ padding: '10px' }}>
                        <Button variant='contained' onClick={onCreateClick}>Create Course</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateCourse;