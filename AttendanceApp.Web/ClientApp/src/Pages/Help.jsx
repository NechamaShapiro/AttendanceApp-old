import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

class Help extends React.Component {

    render() {
        return (
            <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
                <Typography variant="h5" component="h3">
                    Having some trouble?
                </Typography>
                <Typography variant="h4" component="h3">
                    We'd love to help!
                </Typography>
                <Typography variant="h6" component="p">
                    Let us know what the problem is and we'll have one of our customer service representatives reach out to you.
                </Typography>
                <form>
                    <TextField label="Name" variant="outlined" />
                    <TextField label="Email" variant="outlined" />
                    <TextField label="Phone Number" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField label="Please describe the problem..." variant="outlined" multiline minRows={3} />
                    <br></br>
                    <br></br>
                    <Button variant="contained">Submit</Button>
                </form>
            </div>
        );
    }
};

export default Help;