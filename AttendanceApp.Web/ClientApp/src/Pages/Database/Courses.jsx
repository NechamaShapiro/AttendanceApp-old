import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Button
} from '@mui/material';
import AddSession from '../../Components/AddSession';
import EnrollStudents from '../../Components/EnrollStudents';
import CreateCourse from '../../Components/CreateCourse';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const [classes, setClasses] = useState([]);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Courses = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [classes, setClasses] = useState([]);
  const [newCourseId, setNewCourseId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [grade, setGrade] = useState(0);
  const getClasses = async () => {
    const { data } = await axios.get('/api/app/getclasses');
    setClasses(data);
  }
  useEffect(() => {
    getClasses();
  }, []);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleClassChange = (id) => {
    setClassId(id);
  };
  const handleGradeChange = (num) => {
    setGrade(num);
  };
  const handleDialogClassAdd = () => {
    getClasses();
  };
  const handleCreate = (courseId) => {
    setNewCourseId(courseId);
    setActiveTab(1);
  };
  const handleCreateNewClick = () => {
    setNewCourseId(0);
    setClassId(0);
    setGrade(0)
    setActiveTab(0);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
        <Tabs value={activeTab} onChange={handleChange} sx={{ flexGrow: 1 }}>
          <Tab label="Create Course" {...a11yProps(0)} disabled={newCourseId !== 0} />
          <Tab label="Add Sessions" {...a11yProps(1)} disabled={newCourseId === 0} />
          <Tab label="Enroll Students" {...a11yProps(2)} disabled={newCourseId === 0} />
        </Tabs>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <CreateCourse
          classes={classes}
          handleCreate={handleCreate}
          handleDialogClassAdd={handleDialogClassAdd}
          classId={classId}
          handleClassChange={handleClassChange}
          grade={grade}
          handleGradeChange={handleGradeChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        {newCourseId !== 0 ?
          <AddSession newCourseId={newCourseId} />
          :
          <Typography style={{ color: '#FF0000' }}>No course created.</Typography>
        }
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={2}>
        {newCourseId !== 0 ?
          <EnrollStudents classes={classes} newCourseId={newCourseId} classId={classId} grade={grade} handleCreateNewClick={handleCreateNewClick} />
          :
          <Typography style={{ color: '#FF0000' }}>No course created.</Typography>
        }
      </CustomTabPanel>
    </Box>
  );
}

export default Courses;
