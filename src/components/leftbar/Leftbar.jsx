import './leftbar.scss';
import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link, Route} from "react-router-dom";
import Visualization from "../../pages/visualization/visualization";
import AccountingImageUrl from '../../asset/icon/accounting-icon.svg';
import cookie from 'react-cookies'
import {useEffect, useState} from "react";
import Login from "../../pages/login/Login";



export const UserBox = (props) =>  {
    // console.log(props.src);
    // console.log(props.username);
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: '100%',
            gap: 16
        }}>
            <img style={{
                width: 56,
                height: 56,
                objectFit: "cover",
                borderRadius: 12,
            }} src={props.src}/>
            <span style={
                {fontSize: 20,
                fontWeight: 700}
            }>{props.username}</span>
            <KeyboardArrowDownIcon/>
        </div>
    );
}

const Leftbar = () => {
    const [curUsr, setCurUsr] = useState(null);
    const getUsr = () => {
        return cookie.load('userinfo');
    }
    const deleteUsr = () => {
        cookie.remove('userinfo');
    }

    useEffect(() => {
        // 当前用户存在
        if (getUsr()) {
            setCurUsr(getUsr());
            console.log('login yes');
        }
        else console.log('login no');
    }, []);

    const logout = (e) => {
        deleteUsr();  // 删除cookie中的数据
        setCurUsr((prev) => null); //更新curUsr
    }

    return (
        <div className="leftbar">
            <div className="container">
                <div className="upper">
                    <div className="user">
                        {curUsr && curUsr.identity === '2' && <UserBox username={curUsr.username} src={curUsr.src}/>}
                    </div>
                    <div className="menu">
                        {curUsr && curUsr.identity === '2' ?
                            <Link to='/input' style={{ textDecoration:'none'}}>
                                <div className='operation'>
                                    <span>输入本次手术数据</span>
                                </div>
                            </Link> :
                            <div className='operation'>
                                <span>无权限输入手术数据</span>
                            </div>
                        }
                        <Link to='/' style={{ textDecoration:'none'}}>
                            <div className='item'>
                                <GridViewIcon fontSize='small'/>
                                <span>主页</span>
                            </div>
                        </Link>

                        <div className='item'>
                            <PersonOutlineIcon fontSize='small'/>
                            <span>成本分析</span>
                        </div>
                        <div className='item'>
                            <ChatBubbleOutlineIcon fontSize='small'/>
                            <span>审批</span>
                        </div>
                        <Link to='/visualization' style={{ textDecoration:'none'}}>
                            <div className='item'>
                                <SettingsOutlinedIcon fontSize='small'/>
                                <span>数据展示</span>
                            </div>
                        </Link>
                        {curUsr ?
                            <div className='item' onClick={(e) => logout(e)}>
                                <LogoutOutlinedIcon fontSize='small'/>
                                <span>登出/切换</span>
                            </div>:
                            <Link to='/login' style={{textDecoration:"none"}}>
                                <div className='item'>
                                    <LogoutOutlinedIcon fontSize='small'/>
                                    <span>登陆</span>
                                </div>
                            </Link>
                        }
                        <hr />
                    </div>
                </div>

                <div className='lower'>
                    <img className='accounting-icon'
                        src={AccountingImageUrl}></img>
                    <div className='accounting-words'>
                        <span className='accounting-des'>导入本月<br/>财务相关数据</span>
                        {curUsr && curUsr.identity === '1' ?
                            <Link to='/input' style={{ textDecoration:'none'}}>
                                <div className='accounting-btn'>
                                    <span>导入数据</span>
                                </div>
                            </Link> :
                            <div className='accounting-btn'>
                                <span>无权限导入</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leftbar;