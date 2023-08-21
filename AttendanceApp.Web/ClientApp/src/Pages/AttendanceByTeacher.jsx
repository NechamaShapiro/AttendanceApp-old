import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    Select,
    MenuItem
} from '@mui/material';
import loading from '../Images/loading.gif';
import EditIcon from '@mui/icons-material/Edit';
const AttendanceByTeacher = ({ teacherId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [teacherName, setTeacherName] = useState('');
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [grade, setGrade] = useState(0);
    const [courseId, setCourseId] = useState(0);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [students, setStudents] = useState([]);

    const [attendanceRecords, setAttendanceRecords] = useState([]);
    // useEffect(() => {
    //     console.log("Teacher id:", teacherId);
    //     console.log("Teacher name:", teacherName);
    //     console.log("Subject:", subject);
    //     console.log("Grade:", setGrade);
    //     console.log("Course id:", courseId);
    //     console.log("Start time:", startTime);
    //     console.log("End time:", endTime);
    // }, [teacherName]);
    useEffect(() => {
        const getCourseInfo = async () => {
            try {
                const { data } = await axios.get(`/api/app/getcourseinfo?teacherId=${teacherId}`);
                console.log("Data:", data);
                if (data && data.teacherName && data.subject && data.grade && data.courseId) {
                    setTeacherName(data.teacherName);
                    setSubject(data.subject);
                    //setClassName(data.className);
                    setGrade(data.grade);
                    setCourseId(data.courseId);

                    const startTimeParts = data.startTime.split(':');
                    const newStartTime = new Date();
                    newStartTime.setHours(parseInt(startTimeParts[0], 10), parseInt(startTimeParts[1], 10), parseInt(startTimeParts[2], 10));
                    setStartTime(newStartTime);

                    const endTimeParts = data.endTime.split(':');
                    const newEndTime = new Date();
                    newEndTime.setHours(parseInt(endTimeParts[0], 10), parseInt(endTimeParts[1], 10), parseInt(endTimeParts[2], 10));
                    setEndTime(newEndTime);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching course info:', error);
            }
        };
        getCourseInfo();
    }, []);
    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await axios.get(`/api/app/getstudentsbycourse?courseId=${courseId}`);
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
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        getStudents();
    }, [courseId]);

    const formatDate = (date) => {
        const options = {
            weekday: 'long', // Display the full weekday name (e.g., "Friday")
            month: 'numeric', // Display the numeric representation of the month (e.g., "8")
            day: 'numeric', // Display the numeric day of the month (e.g., "4")
            year: 'numeric', // Display the full year (e.g., "2023")
        };
        return date.toLocaleString(undefined, options);
    };
    const handleTypeChange = (event, studentId) => {
        // Find if there's an existing record with the specified studentId
        const existingRecordIndex = attendanceRecords.findIndex(record => record.studentId === studentId);

        if (existingRecordIndex !== -1) {
            // If an existing record is found, update its type
            const updatedRecords = [...attendanceRecords];
            updatedRecords[existingRecordIndex] = {
                ...updatedRecords[existingRecordIndex],
                type: event.target.value
            };
            setAttendanceRecords(updatedRecords);
        } else {
            // If no existing record is found, create a new record and add it to the array
            const newRecord = {
                studentId,
                type: event.target.value,
                date,
                startTime: startTime.toISOString().substr(11, 8), //format time for backend
                courseId,
                notes: '',
                status: 'Unexcused'
            };
            setAttendanceRecords(prevRecords => [...prevRecords, newRecord]);
        }
    };

    const getAttendanceType = (studentId) => {
        const record = attendanceRecords.find(record => record.studentId === studentId);
        return record ? record.type : 'Present';
    };
    const handleNotesChange = (event, studentId) => {
        const updatedRecords = attendanceRecords.map(record => {
            if (record.studentId === studentId) {
                return {
                    ...record,
                    notes: event.target.value
                };
            }
            return record;
        });
        setAttendanceRecords(updatedRecords);
    };


    const onSubmitAttendanceClick = async () => {
        try {
            await axios.post('/api/app/enterattendance', attendanceRecords);
            console.log('Attendance records sent successfully');
        } catch (error) {
            console.error('Error sending attendance records:', error);
        }
        //reset all values in state?
    };
    return (
        <div style={{ width: '700px' }}>
            {isLoading ?
                <img src={loading} alt="loading..." />
                :
                <>
                    {courseId === 0 || courseId === undefined ?
                        <p>You don't have any classes now.</p>
                        :
                        <>
                            <Paper style={{ padding: '15px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ textAlign: 'center' }}>Attendance Sheet</h3>
                                    <h5>{teacherName}, {subject}, {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ margin: 0, padding: 0 }}>
                                        <strong>
                                            <p style={{ margin: 0 }}>Date: {formatDate(date)}<Button size='small'><EditIcon fontSize='small' /></Button></p>
                                        </strong>
                                    </div>
                                    <div style={{ margin: 0, padding: 0 }}>
                                        <strong>
                                            <p style={{ margin: 0 }}>Grade: {grade}</p>
                                        </strong>
                                    </div>
                                </div>
                            </Paper>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Student Name</TableCell>
                                            <TableCell>Notes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell>{students.findIndex(s => s.id === student.id) + 1}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={getAttendanceType(student.id)}
                                                        onChange={(event) => handleTypeChange(event, student.id)}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value='Present'>Present</MenuItem>
                                                        <MenuItem value='Late'>Late</MenuItem>
                                                        <MenuItem value='Absent'>Absent</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size='small'
                                                        placeholder='Excuses, comments, etc.'
                                                        onChange={(event) => handleNotesChange(event, student.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                variant='contained'
                                onClick={onSubmitAttendanceClick}
                                component={Link}
                                to='/'
                            >
                                Submit Attendance
                            </Button>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default AttendanceByTeacher;