import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    MenuItem,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Alert,
    Autocomplete,
    TextField,
    Grid
} from '@mui/material';
import loading from '../../Images/loading.gif';
import AddClassDialog from '../../Components/AddClassDialog';

const Classes = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState();
    const [selectedGrade, setSelectedGrade] = useState('0');
    const [checked, setChecked] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getClasses = async () => {
        const { data } = await axios.get('/api/app/getclasses');
        setClasses(data);
    }
    useEffect(() => {

        getClasses();

        const getAllStudents = async () => {
            const { data } = await axios.get('/api/app/getallstudents');
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
        getAllStudents();

        setIsLoading(false);
    }, []);

    const onClassChange = (event, newValue) => {
        setSelectedClass(newValue.id);
        setChecked([]);
        setShowAlert(false);
    };
    useEffect(() => {
        if (selectedClass != undefined) {
            setIsLoading(true);
            const selected = classes.filter(c => c.id == selectedClass);
            const className = selected[0].className;
            console.log("selected class name:", className);
            const delimiter = '-';
            const indexOfDelimiter = className.indexOf(delimiter);
            const grade = indexOfDelimiter !== -1
                ? className.substring(0, indexOfDelimiter)
                : className;
            setSelectedGrade(grade);

            const getStudentsByGrade = async () => {
                try {
                    const { data } = await axios.get(`/api/app/getbygrade?grade=${grade}`)
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
                    setIsLoading(false);
                } catch (error) {
                    // Handle error here if needed
                    console.error(error);
                }
            }
            getStudentsByGrade();
        }
    }, [selectedClass]);

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
    const handleDialogClassAdd = () => {
        getClasses();
    };
    const onAddClick = async () => {
        // if(checked.some(c => c.classId == 0)) {
        //     setOpenWarning(true);
        // }
        const studentIds = checked.map(student => student.id);
        console.log("classId", selectedClass);
        const formData = new URLSearchParams();
        formData.append('classId', selectedClass);
        studentIds.forEach(id => formData.append('studentIds', id));
        await axios.post('/api/app/createclasssplit', formData);
        setShowAlert(true);
        setChecked([]);
        setSelectedClass();
        setSelectedGrade('0');
        setShowAlert(true);
    };

    return (
        <>
            {showAlert ? <Alert severity="success" onClose={() => { setShowAlert(false) }}>Students added successfully!</Alert> : <></>}
            <br></br>
            <h4><u>Enter Class Splits:</u></h4>
            <ol>
                <li>Select a class, or click ADD NEW CLASS to create a new one.</li>
                <li>Select a grade and click GET BY GRADE.</li>
                <li>Check off all students to add to the current class.<br></br>If you select a student that is already in another class, she will be removed from that class and entered into the new class.</li>
                <li>When you are done selecting students, click ADD STUDENTS.</li>
            </ol>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        options={classes}
                        getOptionLabel={(option) => option.className}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} label="Select Class" />}
                        onChange={onClassChange}
                    />
                    <AddClassDialog onAdd={handleDialogClassAdd} />
                </Grid>
                <Grid item xs={4}>
                    {isLoading ?
                        <img src={loading} alt="loading..." />
                        :
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
                            {students.map((student) => {
                                const labelId = `checkbox-list-label-${student}`;

                                return (
                                    <ListItem
                                        key={student.id}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(student)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(student) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                id={labelId}
                                                //primary={student.classId === 0 ? `${student.name}` : `${student.name}, ${student.class.className}`}
                                                primary={student.classId === 0 ? student.name : `${student.name} ${student.class.className}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    }
                </Grid>
                <Grid item xs={2}>
                    <p>{checked.length} selected</p>
                    <Button variant='contained' onClick={onAddClick} disabled={checked.length === 0}>Add Students</Button>
                </Grid>
            </Grid>

        </>
    );
};

export default Classes;