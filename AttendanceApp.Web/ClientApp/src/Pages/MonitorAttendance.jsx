import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MonitorAttendance = () => {
    const [chosenDate, setChosenDate] = useState('');
    function handleChange1(e, date) {
        setChosenDate(date.value);
        //setChosenDate(moment(date).format('DD-MM-YYYY'));
        console.log(e, date);
        console.log(chosenDate);
    }
    return (
        <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
            <Typography variant="h2" component="h1">
                Monitoring attendance page
            </Typography>
            <br></br>
            <Button component={Link} to="/attendance/monitoring/current-period" variant="contained" color="secondary">
                Current Period
            </Button>
            <br></br>
            <br></br>
            <Button component={Link} to="/attendance/monitoring/monitor-day" variant="contained" color="secondary">
                Today
            </Button>
            <br></br>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onChange={handleChange1.bind(this)}
                    //formatDate={(date) => moment(date).format('DD-MM-YYYY')}
                    label="Choose date" />
            </LocalizationProvider>
            <br></br>
            <Button variant="contained">Continue</Button>
        </div>
    );
};

export default MonitorAttendance;