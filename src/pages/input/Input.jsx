import React, {useEffect, useState} from 'react';
import cookie from "react-cookies";
import DocInput from "./docInput/DocInput";
import NurseInput from "./nurseInput/NurseInput";
import './input.scss';

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

    return (
        <div className='input'>
            <div className="container">
                Welcome to input page
            </div>
        </div>
    );
}

export default Input;