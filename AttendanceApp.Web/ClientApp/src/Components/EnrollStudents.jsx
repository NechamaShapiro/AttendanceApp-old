import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Checkbox,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import loading from '../Images/loading.gif';

const EnrollStudents = (props) => {
    const [students, setStudents] = useState([]);
    const [checked, setChecked] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allSelected, setAllSelected] = useState(false);
    const [adding, setAdding] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const getByGrade = async (grade) => {
            const { data } = await axios.get(`/api/app/getbygrade?grade=${grade}`);
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
        }
        const getByClass = async () => {
            const { data } = await axios.get(`/api/app/getbyclass?classId=${props.classId}`);
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
        }
        if (props.classId !== 0) {
            getByClass();
        }
        else {
            getByGrade(props.grade);
        }
        setIsLoading(false);
    }, []);
    const handleToggle = (student) => () => {
        const currentIndex = checked.indexOf(student);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(student);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const onSelectAllClick = () => {
        const newChecked = [...students];
        setChecked(newChecked);
        setAllSelected(!allSelected);
    }
    const onDeselectAllClick = () => {
        setChecked([]);
        setAllSelected(!allSelected);
    }
    const onAddClick = async () => {
        setAdding(true);
        const studentIds = checked.map(student => student.id);
        const formData = new URLSearchParams();
        formData.append('courseId', props.newCourseId);
        studentIds.forEach(id => formData.append('studentIds', id));
        await axios.post('/api/app/addtocourse', formData);
        setChecked([]);
        setAllSelected(false);
        setOpenDialog(true);
        setAdding(false);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        props.handleCreateNewClick();
    };

    return (
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
                            {"Students added successfully!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Create new course?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button component={Link} to='/' variant='outlined' color='secondary'>No, I'm done.</Button>
                            <Button onClick={handleCloseDialog} variant='contained' color='secondary'>
                                Yes, create another course.
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
                :
                <></>
            }
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    {allSelected ? (
                        <Button variant='contained' color='secondary' size='small' onClick={onDeselectAllClick} disabled={isLoading}>Deselect all</Button>
                    ) : (
                        <Button variant='contained' color='secondary' size='small' onClick={onSelectAllClick} disabled={isLoading}>Select all</Button>
                    )}
                    <p>{checked.length} selected</p>
                </Grid>
                <Grid item xs={4}>
                    {isLoading ?
                        <img src={loading} alt="loading..." />
                        :
                        <>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
                                {students.map((student) => {
                                    const labelId = `checkbox-list-label-${student}`;
                                    return (
                                        <ListItem key={student.id} disablePadding>
                                            <ListItemButton role={undefined} onClick={handleToggle(student)} dense>
                                                <ListItemIcon>
                                                    <Checkbox edge="start" checked={checked.indexOf(student) !== -1} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={student.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </>
                    }
                </Grid>
                <Grid item xs={2}>
                    {adding ?
                        <Button variant='contained' disabled>Adding...</Button>
                        :
                        <Button variant='contained' onClick={onAddClick} disabled={checked.length === 0}>Add Students</Button>
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default EnrollStudents;