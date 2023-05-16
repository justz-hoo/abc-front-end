import {Link, useNavigate} from "react-router-dom";
import './navbar.scss';
import {useState} from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const CustomizedInputBase = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius:5, height: 50}}
        >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="Search"
            />
        </Paper>
    );
}
const Navbar = () => {

    return (
        <div className="navbar">
            <div className='container-nav'>
                <div className="left">
                    <CustomizedInputBase/>
                </div>
                <div className="right">
                    <NotificationsNoneIcon/>
                </div>
            </div>

        </div>
    );
}

export default Navbar;