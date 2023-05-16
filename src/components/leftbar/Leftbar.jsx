import './leftbar.scss';
import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom";
import Visualization from "../../pages/visualization/visualization";
import AccountingImageUrl from '../../asset/icon/accounting-icon.svg';


const UserBox = () =>  {
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
            }} src={userList[2].src}/>
            <span style={
                {fontSize: 20,
                fontWeight: 700}
            }>{userList[0].label}</span>
            <KeyboardArrowDownIcon/>
        </div>
    );
}

const userList = [
    { label: "Doc Pumpkin", type: "1", src:""},
    { label: "NursePiggy", type: "2", src: ""},
    { label: "财务Puppy", type: "3", src: "https://images.pexels.com/photos/11843572/pexels-photo-11843572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
];


const curUsr = '3';

const Leftbar = () => {
    return (
        <div className="leftbar">
            <div className="container">
                <div className="upper">
                    <div className="user">
                        <UserBox/>
                    </div>
                    <div className="menu">
                        {curUsr == '1' ?
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
                        <Link to='/Visualization' style={{ textDecoration:'none'}}>
                            <div className='item'>
                                <SettingsOutlinedIcon fontSize='small'/>
                                <span>数据展示</span>
                            </div>
                        </Link>
                        <div className='item'>
                            <LogoutOutlinedIcon fontSize='small'/>
                            <span>登出/切换</span>
                        </div>
                        <hr />
                    </div>
                </div>

                <div className='lower'>
                    <img className='accounting-icon'
                        src={AccountingImageUrl}></img>
                    <div className='accounting-words'>
                        <span className='accounting-des'>导入本月<br/>财务相关数据</span>
                        {curUsr=="3" ?
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