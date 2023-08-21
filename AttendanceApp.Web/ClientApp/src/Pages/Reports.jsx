import React from 'react';
import { Container, Typography } from '@mui/material';

class Reports extends React.Component {

    render() {
        return (
            <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
                <Typography variant="h2" component="h1">
                    Run a report!
                </Typography>
            </div>
        );
    }
};

export default Reports;