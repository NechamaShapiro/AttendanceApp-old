import React, { useState } from 'react';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem 
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';

const EnterStudents = () => {
    const [names, setNames] = useState(['']);
    const [studentGrade, setStudentGrade] = useState('select');
    const handleGradeChange = (event) => {
        setStudentGrade(event.target.value);
    };
    const handleNameChange = (event, index) => {
        const newNames = [...names];
        newNames[index] = event.target.value;
        setNames(newNames);
    };

    const handleAddNameField = () => {
        setNames([...names, '']);
    };

    const handleDeleteNameField = (index) => {
        const newNames = [...names];
        newNames.splice(index, 1);
        setNames(newNames);
    };

    const onAddAllClick = async () => {
        const formData = new URLSearchParams();
        formData.append('grade', studentGrade);
        names.forEach(name => formData.append('names', name));
        await axios.post('/api/app/addstudents', formData);
        setNames(['']);
        setStudentGrade('select');
    };
    return (
        <>
            <h4><u>Enter Students:</u></h4>
            <ol>
                <li>Select a grade to add students to.</li>
                <li>Enter the name of the student [Last, First].</li>
                <li>Click on the <AddIcon color='primary' /> to add multiple students.</li>
                <li>Use the <DeleteOutlinedIcon color='error' /> as needed.</li>
                <li>Click ADD ALL STUDENTS.</li>
            </ol>
            <FormControl>
                <InputLabel>Select Grade</InputLabel>
                <Select
                    value={studentGrade}
                    label="Select Grade"
                    onChange={handleGradeChange}
                    required
                >
                    <MenuItem value="select" disabled>Select Grade</MenuItem>
                    <MenuItem key={9} value={9}>9th Grade</MenuItem>
                    <MenuItem key={10} value={10}>10th Grade</MenuItem>
                    <MenuItem key={11} value={11}>11th Grade</MenuItem>
                    <MenuItem key={12} value={12}>12th Grade</MenuItem>
                </Select>
            </FormControl>
            <br></br><br></br>
            {names.map((name, index) => (
                <div key={index}>
                    <TextField
                        label={`Student ${index + 1}`}
                        value={name}
                        onChange={(event) => handleNameChange(event, index)}
                    />
                    <Button color="error" onClick={() => handleDeleteNameField(index)} style={{ marginTop: '10px' }}>
                        <DeleteOutlinedIcon />
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddNameField}>
                <AddIcon />
            </Button>
            <br></br>
            <Button variant="contained" onClick={onAddAllClick}>
                Add All Students
            </Button>
        </>
    )
}

export default EnterStudents;