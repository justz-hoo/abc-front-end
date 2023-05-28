import React, {useEffect, useState} from "react";
import './home.scss';
import Rightbar from "../../components/rightbar/Rightbar";
import Image6Url from '../../asset/pics/pic6.svg';
import Image7Url from '../../asset/pics/pic7.svg';
import Image8Url from '../../asset/pics/pic8.svg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <div className="upper-home">
                    <div className="pic6">
                        <img src={Image6Url} alt=""/>
                    </div>
                    <div className="pic7">
                        <img src={Image7Url} alt=""/>
                    </div>
                </div>
                <div className="lower-home">
                </div>
            </div>
            <Rightbar/>
        </div>
    )
}

export default Home;