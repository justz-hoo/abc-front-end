import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import img_url1 from '../../../asset/icon/message1.svg'
import img_url2 from '../../../asset/icon/message2.svg'
import img_url3 from '../../../asset/icon/message3.svg'
import './rightMessage.scss';
import {useEffect, useState} from "react";


const data = [
    {img_src: img_url1, type: "手术", department: "妇产科", time: 1, btnShow: false, isShow: true},
    {img_src: img_url2, type: "设备", department: "眼视光科", time: 1, btnShow: false, isShow: true},
    {img_src: img_url3, type: "设备", department: "整形科", time: 1, btnShow: false, isShow: true}
];


const RightMessage = () => {
    const [msgs, setMsgs] = useState([]);
    useEffect(() =>{
        setMsgs(data);
    }, []);

    const MsgBtn = (props) => {
        if (props.btnShow) {
            return (
                <div style={{width: '100%', display:"flex", justifyContent:"space-between"}}>
                    <Button variant="contained" sx={{width: '48%', bgcolor: '#BFC9ED'}} onClick={() => handleClickYes(props.index)}>返回</Button>
                    <Button variant="contained" sx={{width: '48%', bgcolor: '#F56B3F'}} onClick={() => handleClickNo(props.index)}>接受</Button>
                </div>
            );
        }
    }

    //处理点击接受的按钮
    const handleClickYes = (index) => {
        let tmp_data = [...msgs];
        tmp_data[index].isShow = !tmp_data[index].isShow;
        setMsgs(tmp_data);
    };

    //处理点击拒绝的按钮
    const handleClickNo = (index) => {
        let tmp_data = [...msgs];
        tmp_data[index].isShow = !tmp_data[index].isShow;
        setMsgs(tmp_data);
    };

    //处理双击后显示的按钮
    const handleClick = (index) => {
        let tmp_data = [...msgs];
        tmp_data[index].btnShow = !tmp_data[index].btnShow;
        setMsgs(tmp_data);
    }

    const SingleMsg = (props) => {
        // console.log(props);
        return (
            <ListItem onDoubleClick={() => handleClick(props.index)}>
                <ListItemAvatar>
                    <Avatar src={props.img_src}></Avatar>
                </ListItemAvatar>
                {/*<ListItemText primary={props.type + '科室'} secondary={props.department} />*/}
                <Stack spacing={2} direction='column' width='100%'>
                    <ListItemText>
                        {props.type == '手术' && (
                            <div className='words'>
                                <div className='upper'>
                                    <span className='msg-title'>{props.type + '输入申请'}</span>
                                    <span className='msg-time'>{props.time} Hours Ago</span>
                                </div>
                                <div className='lower'>
                                    <span className='msg-des'>{props.department} </span>
                                    <span className='msg-des' style={{color: 'rgba(0, 0, 0, 0.5)'}}>新增了一条手术数据的申请</span>
                                </div>
                            </div>
                        )}
                        {props.type == '设备' && (
                            <div className='words'>
                                <div className='upper'>
                                    <span className='msg-title'>{props.type + '添加申请'}</span>
                                    <span className='msg-time'>{props.time} Hours Ago</span>
                                </div>
                                <div className='lower'>
                                    <span className='msg-des'>{props.department}</span>
                                    <span className='msg-des' style={{color: 'rgba(0, 0, 0, 0.5)'}}>新增了一条专用设备数据</span>
                                </div>
                            </div>
                        )}
                    </ListItemText>
                    <MsgBtn btnShow={props.btnShow} index={props.index}/>
                    <hr/>
                </Stack>
            </ListItem>
        );
    }

    return (
        <div style={{width:'100%'}}>
            <List sx={{ width: '100%', maxWidth: 360, /*bgcolor: 'background.paper'*/ }}>
                {msgs.map((msg, index) => {
                    if (msg.isShow) {
                        return (
                            <SingleMsg img_src={msg.img_src} type={msg.type} department={msg.department}
                                       time={msg.time} btnShow={msg.btnShow} index={index}/>
                        );
                    }
                })}
            </List>
        </div>
    );
};

export default RightMessage;