import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton,
    Tooltip
} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HomeIcon from '@mui/icons-material/Home';
import GradingIcon from '@mui/icons-material/Grading';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const Layout = (props) => {
    const [openDatabaseCollapse, setOpenDatabaseCollapse] = useState(false);
    const [openAttendanceCollapse, setOpenAttendanceCollapse] = useState(false);

    const handleOpenDatabaseCollapse = () => {
        setOpenDatabaseCollapse(!openDatabaseCollapse);
    };
    const handleOpenAttendanceCollapse = () => {
        setOpenAttendanceCollapse(!openAttendanceCollapse);
    };
    return (
        <div>
            <header>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" noWrap component="div">
                                    Attendance App
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip>
                                    <IconButton sx={{ p: 0 }}>
                                        <PersonIcon></PersonIcon>
                                        <Typography>Current User</Typography>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                <ListItem key="Home" disablePadding>
                                    <ListItemButton component={Link} to='/'>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem key="Database Setup" disablePadding>
                                    <ListItemButton onClick={handleOpenDatabaseCollapse}>
                                        <ListItemIcon>
                                            {openDatabaseCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary="Database Setup" />
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={openDatabaseCollapse} timeout="auto" unmountOnExit>
                                    <ListItem key="Enter Students" disablePadding>
                                        <ListItemButton component={Link} to='/database/enter-students'>
                                            <ListItemText inset primary="Enter Students" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Enter Class Splits" disablePadding>
                                        <ListItemButton component={Link} to='/database/classes'>
                                            <ListItemText inset primary="Enter Class Splits" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Create Courses" disablePadding>
                                        <ListItemButton component={Link} to='/database/courses'>
                                            <ListItemText inset primary="Create Courses" />
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>

                                <ListItem key="Attendance" disablePadding>
                                    <ListItemButton onClick={handleOpenAttendanceCollapse}>
                                        <ListItemIcon>
                                            {openAttendanceCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary="Attendance" />
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={openAttendanceCollapse} timeout="auto" unmountOnExit>
                                    <ListItem key="Entry" disablePadding>
                                        <ListItemButton component={Link} to='/attendance/entry'>
                                            <ListItemText inset primary="Entry" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Monitoring" disablePadding>
                                        <ListItemButton component={Link} to='/attendance/monitoring'>
                                            <ListItemText inset primary="Monitoring" />
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>
                                <ListItem key="Compliance" disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <GradingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Compliance" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key="Reports" disablePadding>
                                    <ListItemButton component={Link} to='/reports'>
                                        <ListItemIcon>
                                            <SummarizeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Reports" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem key="Help" disablePadding>
                                    <ListItemButton component={Link} to='/help'>
                                        <ListItemIcon>
                                            <HelpIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Help" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        {props.children}
                    </Box>
                </Box>
            </header>
        </div>
    )
}

export default Layout;