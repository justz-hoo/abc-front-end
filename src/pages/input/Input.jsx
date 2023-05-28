import React, {useEffect, useState} from 'react';
import cookie from "react-cookies";
import DocInput from "./docInput/DocInput";
import NurseInput from "./nurseInput/NurseInput";
import './input.scss';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Input() {
    const [curUsr, setCurUsr] = useState(null);

    const getUsr = () => {
        return cookie.load('userinfo');
    }

    useEffect(() => {
        // 当前用户存在
        if (getUsr()) {
            setCurUsr(getUsr());
            console.log('login yes');
        }
        else console.log('login no');
    }, [])

    const gotoNurse = () => {
        window.location.href='/input/nurse';
    }

    const gotoDoctor = () => {
        window.location.href='/input/doctor';
    }
    const [open, setOpen] = React.useState(true);

    return (
        <div className='input'>
            <div className="container">
                <Dialog
                    keepMounted
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        医护输入
                    </DialogTitle>
                    <DialogContent style={{padding: 20}}>
                        <DialogContentText id="alert-dialog-description">
                            您有输入权限，请选择身份
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={gotoNurse}>我是医生</Button>
                        <Button onClick={gotoDoctor}>
                            我是护士
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Input;