import React, { useState } from 'react';
import { Button } from '@mui/material';
import SelectTeacher from '../Components/SelectTeacher';
import SelectStudent from '../Components/SelectStudent';
import AttendanceByTeacher from './AttendanceByTeacher';
import AttendanceByStudent from './AttendanceByStudent';

const EnterAttendance = () => {
    const [teacherDialogOpen, setTeacherDialogOpen] = useState(false);
    const [teacherId, setTeacherId] = useState(0);
    const [studentDialogOpen, setStudentDialogOpen] = useState(false);
    const [studentId, setStudentId] = useState(0);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleOpenTeacherDialog = () => {
        setTeacherDialogOpen(true);
    };
    const handleTeacherChange = (id) => {
        setTeacherId(id);
    };
    const handleCloseTeacherDialog = () => {
        setTeacherDialogOpen(false);
        if (teacherId !== 0) {
            setSubmitClicked(true);
        }
    };

    const handleOpenStudentDialog = () => {
        setStudentDialogOpen(true);
    };
    const handleStudentChange = (id) => {
        setStudentId(id);
        console.log("student id:", studentId);
    };
    const handleCloseStudentDialog = () => {
        setStudentDialogOpen(false);
        if (studentId !== 0) {
            setSubmitClicked(true);
        }
    };

    return (
        <div>
            {!submitClicked ?
                <>
                    <Button variant='contained' onClick={handleOpenTeacherDialog}>By Teacher</Button>
                    <SelectTeacher
                        open={teacherDialogOpen}
                        onClose={handleCloseTeacherDialog}
                        handleTeacherChange={handleTeacherChange}
                    />
                    <br></br>
                    <br></br>
                    <Button variant='contained' onClick={handleOpenStudentDialog}>By Student</Button>
                    <SelectStudent
                        open={studentDialogOpen}
                        onClose={handleCloseStudentDialog}
                        handleStudentChange={handleStudentChange}
                    />
                </>
                :
                teacherId !== 0 ?
                    <AttendanceByTeacher teacherId={teacherId} />
                    :
                    <AttendanceByStudent studentId={studentId} />

            }
        </div>
    );
};

export default EnterAttendance;
