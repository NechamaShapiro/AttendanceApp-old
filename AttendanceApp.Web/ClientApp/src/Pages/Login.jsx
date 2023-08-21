import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    <>
        {/* const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }; */}
    </>
    return (
        <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
            <form>
                <Typography variant="h4" component="h1">
                    Log in to your account:
                </Typography>
                <br></br>
                <TextField label="Username" variant="outlined" />
                <>
                    {/* <InputLabel htmlFor="standard-adornment-password">
                            Enter your Password
                        </InputLabel>
                        <Input
                            type={values.showPassword ? "text" : "password"}
                            onChange={handlePasswordChange("password")}
                            value={values.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> */}
                </>
                <br></br><br></br>
                <TextField label="Password" variant="outlined" type='password' />
                <br></br><br></br>
                <Button variant="contained">Login</Button>
            </form>
        </div>
    );
};

export default Login;