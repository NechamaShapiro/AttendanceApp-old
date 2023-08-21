import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

class MonitorPeriod extends React.Component {

    render() {
        return (
            <Table size="small" aria-label="period" style={{ width: 750 }} align="center">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><strong>Teacher</strong></TableCell>
                        <TableCell align="center"><strong>Subject</strong></TableCell>
                        <TableCell align="center"><strong>Took Attendance?</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Weinberger
                        </TableCell>
                        <TableCell align="center">Chumash</TableCell>
                        <TableCell align="center">{false ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Rabbi Arieh
                        </TableCell>
                        <TableCell align="center">Halacha</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Stein
                        </TableCell>
                        <TableCell align="center">Machshava</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Gornish
                        </TableCell>
                        <TableCell align="center">Tzohar</TableCell>
                        <TableCell align="center">{false ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Rabbi Kramer
                        </TableCell>
                        <TableCell align="center">Halacha</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Epstein
                        </TableCell>
                        <TableCell align="center">Tehillim</TableCell>
                        <TableCell align="center">{false ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Puretz
                        </TableCell>
                        <TableCell align="center">Tefila</TableCell>
                        <TableCell align="center">{false ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Polakoff
                        </TableCell>
                        <TableCell align="center">Navi</TableCell>
                        <TableCell align="center">{false ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Rosen
                        </TableCell>
                        <TableCell align="center">Yirmiyahu</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Sprung
                        </TableCell>
                        <TableCell align="center">Yehadus</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Spetner
                        </TableCell>
                        <TableCell align="center">Navi</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Rapps
                        </TableCell>
                        <TableCell align="center">Chumash</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Brick
                        </TableCell>
                        <TableCell align="center">Megila</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            Mrs. Weingot
                        </TableCell>
                        <TableCell align="center">Inyanei Diyoma</TableCell>
                        <TableCell align="center">{true ? <CheckIcon color="success" /> : <ClearIcon color="error" />}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
};

export default MonitorPeriod;