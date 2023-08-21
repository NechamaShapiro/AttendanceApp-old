import React from 'react';
import { Container, Typography } from '@mui/material';

class Administrator extends React.Component {

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
                <div className="text-center">
                    <Typography variant="h2" component="h1">
                        Welcome to the Attendance App
                    </Typography>
                    <Typography variant="h4" component="p">
                        Use the links to navigate.
                    </Typography>
                </div>
            </div>
        );
    }
};

export default Administrator;