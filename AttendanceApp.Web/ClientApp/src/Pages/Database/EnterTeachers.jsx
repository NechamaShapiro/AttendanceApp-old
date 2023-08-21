//NEVER USED, CAN BE DELETED
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EnterTeachers = () => {
    const [teacherName, setTeacherName] = useState('');
    const onTextChange = (event) => {
        setTeacherName(event.target.value);
    }
    const onAddClick = async () => {
        await axios.post(`/api/app/addteacher?name=${teacherName}`);
    };
    return (
        <>
            <h6><u>Directions:</u></h6>
            <ol>
                <li>Enter the name of the teacher.</li>
                <li>Click ADD TEACHER.</li>
            </ol>
            <TextField id="standard-basic" label="Enter Teacher Name" variant="standard" onChange={onTextChange} />
            <br></br><br></br>
            <Button variant='contained' onClick={onAddClick}>Add Teacher</Button>
            {console.log("Teacher name:", teacherName)}
        </>
    )
}

export default EnterTeachers;