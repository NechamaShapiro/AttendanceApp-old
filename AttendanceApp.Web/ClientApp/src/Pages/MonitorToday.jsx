import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MonitorPeriod from '../Components/MonitorPeriod';

function createData(teacher) {
    return {
        teacher,
        period: [
            {
                teacher: 'Mrs. Weinberger',
                subject: 'Chumash',
                tookAttendance: 'no',
            },
            {
                teacher: 'Rabbi Arieh',
                subject: 'Halacha',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Stein',
                subject: 'Machshava',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Gornish',
                subject: 'Tzohar',
                tookAttendance: 'no',
            },
            {
                teacher: 'Rabbi Kramer',
                subject: 'Halacha',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Epstein',
                subject: 'Tehillim',
                tookAttendance: 'no',
            },
            {
                teacher: 'Mrs. Puretz',
                subject: 'Tefila',
                tookAttendance: 'no',
            },
            {
                teacher: 'Mrs. Polakoff',
                subject: 'Navi',
                tookAttendance: 'no',
            },
            {
                teacher: 'Mrs. Rosen',
                subject: 'Yirmiyahu',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Sprung',
                subject: 'Yehadus',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Spetner',
                subject: 'Navi',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Rapps',
                subject: 'Chumash',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Brick',
                subject: 'Megila',
                tookAttendance: 'yes',
            },
            {
                teacher: 'Mrs. Weingot',
                subject: 'Inyanei Diyoma',
                tookAttendance: 'yes',
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ fontSize: 20 }}>
                    <Typography variant="h6" component="p">
                        {row.teacher}
                    </Typography>
                </TableCell>
                {/* WORK ON CHECKBOX THAT INDICATES IF THAT PERIOD HAS 100% OF TEACHERS TAKING ATTENDANCE */}
                <TableCell>
                    <Checkbox label="100%" disabled />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <MonitorPeriod />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        period: PropTypes.arrayOf(
            PropTypes.shape({
                tookAttendance: PropTypes.string.isRequired,
                subject: PropTypes.string.isRequired,
                teacher: PropTypes.string.isRequired,
            }),
        ).isRequired,
        teacher: PropTypes.string.isRequired,
    }).isRequired,
};

const rows = [
    createData('1st period'),
    createData('2nd period'),
    createData('3rd period'),
    createData('4th period'),
    createData('5th period'),
    createData('6th period'),
    createData('7th period'),
    createData('8th period'),
    createData('9th period'),
    createData('10th period'),
];

export default function CollapsibleTable() {
    return (
        <TableContainer>
            <Table aria-label="collapsible table" style={{ width: 1000 }} align="center">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <Typography variant="h4" component="h1">
                                Today, 6/22
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.teacher} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}