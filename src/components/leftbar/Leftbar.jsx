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
import * as XLSX from 'xlsx';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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


    //对话框
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const agreeReload = () => {
        window.location.reload();
    }
    const disAgreeReload = () => {
        handleClose();
    }


    // 控制当前用户
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

    // 反应是否上传成功
    const [uploadSuccess, setSuccess] = useState(false);

    const handleUpload = (e) => {
        let myFile = file//获取第一个文件
        let reader = new FileReader()
        reader.readAsBinaryString(myFile)//读取这个文件
        reader.onload = function (event) {
            try {
                let result = event.target.result
                let xlsxdata = XLSX.read(result, { type: 'binary' })//读取xlsx
                console.log(xlsxdata)
                for (let n in xlsxdata.Sheets) {//这里是多张表格 所以写一个循环
                    let col = XLSX.utils.sheet_to_json(xlsxdata.Sheets[n], { header: 1, defval: '', blankrows: true })//解析为数组
                    console.log(col)
                }
                //TODO: 用于向后端发送数据
                setSuccess(true);
                setOpen(true); // 上传成功，打开对话框

            } catch (err) {
                console.log('read excel file error');
                setFileName('');
                alert('文件读取失败');
            }
        }
    }

    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const handleFileSelect = (e) => {
        // console.log(e.target.files[0]);
        // setFileName()
        setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
    }


    // 获取当前页面,实现导航栏高亮跟随
    const [curIndex, setIndex] = useState(0);
    useEffect(() => {
        setIndex(getCurrentPage());
    }, [curIndex])
    const urlArr = ['/', '/manage', '/analysis', '/result'];
    const getCurrentPage = () => {
        const currentPage = window.location.pathname;
        // console.log(currentPage);
        for (let i = 0; i < urlArr.length; i++) {
            if (currentPage === urlArr[i]) {
                return i + 1;
            }
        }
        return 0;
    }

    const setCurrentIndex = (e) => {
        let clickedIndex = e.currentTarget.getAttribute('index');
        console.log('clickedIndex==========',clickedIndex);
        setIndex(clickedIndex);
    }

    return (
        <div className="leftbar">
            <div className="container">
                <div className="upper">
                    <div className="user">
                        {curUsr && <UserBox username={curUsr.username} src={curUsr.src}/>}
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
                        <Link to='/' style={{ textDecoration:'none'}} index={1} onClick={(e) => setCurrentIndex(e)}>
                            <div className={curIndex === 1 ? 'item-activate' : 'item'}>
                                <GridViewIcon fontSize='small'/>
                                <span>主页</span>
                            </div>
                        </Link>

                        <Link to='/manage' style={{ textDecoration:'none'}} index={2} onClick={(e) => setCurrentIndex(e)}>
                            <div className={curIndex === 2 ? 'item-activate' : 'item'}>
                                <ManageAccountsIcon fontSize='small'/>
                                <span>人员管理</span>
                            </div>
                        </Link>

                        <Link to='/analysis' style={{ textDecoration:"none" }} index={3} onClick={(e) => setCurrentIndex(e)}>
                            <div className={curIndex === 3 ? 'item-activate' : 'item'}>
                                <PersonOutlineIcon fontSize='small'/>
                                <span>成本分析</span>
                            </div>
                        </Link>
                        <div className='item'>
                            <ChatBubbleOutlineIcon fontSize='small'/>
                            <span>审批</span>
                        </div>
                        <Link to='/result' style={{ textDecoration:'none'}} index={4} onClick={(e) => setCurrentIndex(e)}>
                            <div className={curIndex === 4 ? 'item-activate' : 'item'}>
                                <SettingsOutlinedIcon fontSize='small'/>
                                <span>结果展示</span>
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


                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"上传成功"}
                        </DialogTitle>
                        <DialogContent>
                            {curUsr &&
                                <DialogContentText id="alert-dialog-description">
                                    恭喜{curUsr.username}，你已经成功上传文件“{fileName}“，是否重新上传)
                                </DialogContentText>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={agreeReload}>是</Button>
                            <Button onClick={disAgreeReload} autoFocus>
                                否
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>



                <div className='lower'>
                    <img className='accounting-icon'
                        src={AccountingImageUrl}></img>
                    <div className='accounting-words'>
                        <span className='accounting-des'>导入本月<br/>财务相关数据</span>
                        {!uploadSuccess && <span>{fileName}</span>}
                        {curUsr && curUsr.identity === '1' ?
                            <div className="accounting-select-file">
                                {/*<span> 上传文件 </span>*/}
                                {/*<input*/}
                                {/*    id='file'*/}
                                {/*    type='file'*/}
                                {/*    accept='.xls, .xlsx'*/}
                                {/*/>*/}
                                <input id="fileInput" type="file" name="file" accept=".xls, .xlsx" onChange={(e) => handleFileSelect(e)}/>
                                {fileName === '' && !uploadSuccess ? <label htmlFor="fileInput" className="file-btn">选择上传文件</label> :
                                 <span onClick={(e) => handleUpload(e)}>确认上传</span>
                                }
                            </div>
                            :
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