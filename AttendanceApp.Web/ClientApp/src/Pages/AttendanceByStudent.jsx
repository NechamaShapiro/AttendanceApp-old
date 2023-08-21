import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Button,
    Paper,
    TextField,
    FormControlLabel,
    Switch,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';

const AttendanceByStudent = ({ studentId }) => {
    const [studentName, setStudentName] = useState('');
    const [studentsCourses, setStudentsCourses] = useState([]);
    const [selected, setSelected] = useState([]);
    const [type, setType] = useState('');
    const [status, setStatus] = useState('Unexcused');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const types = [
        'Late',
        'Absent',
        'Cut'
    ];
    const reasons = [
        'Sick',
        'Not Feeling Well',
        'Appointment',
        'Personal Day',
        'Family Simcha',
        'Extra Curricular'
    ];
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const getStudentById = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/app/getstudentbyid?studentId=${studentId}`);
                setStudentName(data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getStudentById();

        const getTodaysCourses = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/app/getcoursesforstudent?studentId=${studentId}`);
                const formattedCourses = data.map(course => {
                    const startTimeParts = course.startTime.split(':');
                    const newStartTime = new Date();
                    newStartTime.setHours(
                        parseInt(startTimeParts[0], 10),
                        parseInt(startTimeParts[1], 10),
                        parseInt(startTimeParts[2], 10)
                    );
                    course.startTime = newStartTime;

                    const endTimeParts = course.endTime.split(':');
                    const newEndTime = new Date();
                    newEndTime.setHours(
                        parseInt(endTimeParts[0], 10),
                        parseInt(endTimeParts[1], 10),
                        parseInt(endTimeParts[2], 10)
                    );
                    course.endTime = newEndTime;

                    return course;
                });

                formattedCourses.sort((a, b) => a.startTime - b.startTime);

                setStudentsCourses(formattedCourses);
            } catch (error) {
                console.log(error);
            }
        }
        getTodaysCourses();
    }, []);
    useEffect(() => {
        console.log("Students courses:", studentsCourses);
    }, [studentsCourses]);
    const handleTypeChange = (event, type) => {
        setType(type);
    };
    const handleStatusChange = () => {
        if (status === 'Excused') {
            setStatus('Unexcused');
        } else if (status === 'Unexcused') {
            setStatus('Excused');
        }
    };
    const handleReasonChange = (event, reason) => {
        setReason(reason);
    };
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(studentsCourses.map(course => ({ courseId: course.courseId, startTime: course.startTime })));
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, courseId, startTime) => {
        event.stopPropagation(); // Prevent row click from triggering checkbox change
        const newSelected = selected.some(item => item.courseId === courseId && item.startTime === startTime)
            ? selected.filter(item => item.courseId !== courseId || item.startTime !== startTime)
            : [...selected, { courseId, startTime }];

        setSelected(newSelected);
    };
    const isSelected = (courseId, startTime) =>
        selected.some(item => item.courseId === courseId && item.startTime === startTime);

    const onSubmitAttendanceClick = async () => {
        const attendanceRecords = selected.map(item => ({
            studentId,
            courseId: item.courseId,
            date: new Date(),
            startTime: item.startTime.toISOString().substr(11, 8), //format time for backend,
            type,
            status,
            reason,
            notes
        }));
        try {
            await axios.post('/api/app/enterattendance', attendanceRecords);
            console.log('Attendance records sent successfully');
            setSelected([]);
            setType('');
            setStatus('Unexcused');
            setReason('');
            setNotes('');
            setOpenDialog(true);
        } catch (error) {
            console.error('Error sending attendance records:', error);
        }
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            {studentsCourses.length === 0 ?
                <p>No courses came up.</p>
                :
                <>
                    {openDialog ?
                        <>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {`Attendance records for ${studentName}  were added successfully!`}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Enter more records?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button component={Link} to='/' variant='outlined' color='secondary'>No, I'm done.</Button>
                                    <Button component={Link} to='/attendance/entry' onClick={handleCloseDialog} variant='contained' color='secondary'>
                                        Yes, enter more records.
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                        :
                        <></>
                    }
                    <h1>{studentName}</h1>
                    <div style={{ display: 'flex' }}>
                        <Autocomplete
                            disablePortal
                            options={types}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Select Type" />}
                            onChange={handleTypeChange}
                            required
                            size='small'
                            style={{ margin: '10px' }}
                        />
                        <FormControlLabel
                            control={<Switch checked={status === 'Excused'} onChange={handleStatusChange} />}
                            label={status === 'Excused' ? 'Excused' : 'Unexcused'}
                            style={{ margin: '10px' }}
                        />

                        <Autocomplete
                            disablePortal
                            options={reasons}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Select Reason" />}
                            onChange={handleReasonChange}
                            size='small'
                            style={{ margin: '10px' }}
                        />
                        <TextField
                            size='small'
                            placeholder='Notes'
                            onChange={handleNotesChange}
                            style={{ margin: '10px' }}
                        />
                    </div>
                    <br></br>
                    <TableContainer style={{ width: '600px' }} component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < studentsCourses.length}
                                            checked={selected.length === studentsCourses.length}
                                            onChange={handleSelectAllClick}
                                            inputProps={{
                                                'aria-label': 'select all courses',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell><strong>Subject</strong></TableCell>
                                    <TableCell><strong>Teacher</strong></TableCell>
                                    <TableCell><strong>Start Time</strong></TableCell>
                                    <TableCell><strong>End Time</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentsCourses.map((course) => {
                                    const isItemSelected = isSelected(course.courseId, course.startTime);
                                    const labelId = `enhanced-table-checkbox-${course.subject}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, course.courseId, course.startTime)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={course.courseId}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {course.subject}
                                            </TableCell>
                                            <TableCell>{course.teacherName}</TableCell>
                                            <TableCell>{course.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                            <TableCell>{course.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <Button variant='contained' onClick={onSubmitAttendanceClick}>Submit</Button>
                </>
            }
        </>
    );
}

export default AttendanceByStudent;
