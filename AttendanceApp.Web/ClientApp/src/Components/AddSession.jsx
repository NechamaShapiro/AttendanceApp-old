import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';

const AddSession = (props) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlot, setTimeSlot] = useState([
        dayjs().set('hour', 0).set('minute', 0).set('second', 0),
        dayjs().set('hour', 0).set('minute', 0).set('second', 0),
    ]);
    const [addedSessions, setAddedSessions] = useState([]);

    const handleDayChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedDays(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleTimeSlotChange = (newTimeSlot) => {
        setTimeSlot(newTimeSlot);
    };
    const formatTime = (time) => {
        const timeArray = time.split(':');
        const hours = parseInt(timeArray[0]);
        const minutes = parseInt(timeArray[1]);
        // Create a Date object with the current date and the retrieved time
        const dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);

        // Format the time in 12-hour clock format
        return dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    }
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
    ];
    const onAddClick = async () => {
        const startTime = timeSlot[0].format('HH:mm:ss');
        const endTime = timeSlot[1].format('HH:mm:ss');
        const updatedSessions = [];
        let idCounter = addedSessions.length;
        selectedDays.forEach((day) => {
            const newSession = {
                id: idCounter++,
                dayOfWeek: day,
                startTime: startTime,
                endTime: endTime
            };
            updatedSessions.push(newSession);
        });
        setAddedSessions([...addedSessions, ...updatedSessions]);
        await axios.post(`/api/app/addsession?courseId=${props.newCourseId}`, updatedSessions);
        setSelectedDays([]);
        setTimeSlot([
            dayjs().set('hour', 0).set('minute', 0).set('second', 0),
            dayjs().set('hour', 0).set('minute', 0).set('second', 0),
        ]);
        updatedSessions.length = 0;
    };

    return (
        <>
            {props.newCourseId === undefined ? (
                <p>
                    Create course to add sessions
                </p>

            ) : (
                <>
                    {addedSessions.length === 0 ? (
                        <p>No sessions added yet.</p>
                    ) : (
                        addedSessions.map((s) => (
                            <p key={s.id}>
                                {s.dayOfWeek}, {formatTime(s.startTime)}-{formatTime(s.endTime)}
                            </p>
                        ))
                    )}
                    <FormControl sx={{ m: 1, width: 300 }} style={{ margin: '0px 10px' }}>
                        <InputLabel id="demo-multiple-checkbox-label">Day of Week</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedDays}
                            onChange={handleDayChange}
                            input={<OutlinedInput label="Day of Week" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                    <Checkbox checked={selectedDays.indexOf(day) > -1} />
                                    <ListItemText primary={day} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl style={{ margin: '0px 10px' }}>
                        <MultiInputTimeRangeField
                            slotProps={{
                                textField: ({ position }) => ({
                                    label: position === 'start' ? 'From' : 'To',
                                }),
                            }}
                            value={timeSlot}
                            onChange={handleTimeSlotChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={onAddClick}
                        >Add</Button>
                    </FormControl>
                </>
            )}
        </>

    )
}

export default AddSession;