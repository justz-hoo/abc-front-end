import './docInput.scss';
import Button from '@mui/material/Button';
import axios from "axios";
import React, {useEffect, useState} from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useRef } from 'react';
import SurgeryTime from "../../../components/SurgeryTime/SurgeryTime";
import SurgerySelect from "../../../components/SurgerySelect/SurgerySelect";

const DrugInput = () => {
    const submitInput = (e) => {
        e.preventDefault();
        // console.log('Before', dataBeforeRef.current.getData);
        // console.log('During', dataDuringRef.current.getData);
        // console.log('After', dataAfterRef.current.getData);
        // console.log('Type', typeRef.current.getType);
    }

    const [dataBefore, setBefore] = useState(null);
    const [dataDuring, setDuring] = useState(null);
    const [dataAfter, setAfter] = useState(null);
    const [type, setType] = useState(null);

    const dataBeforeRef = useRef();
    const dataDuringRef = useRef();
    const dataAfterRef = useRef();
    const typeRef = useRef();
    const handleSubmit = (e) => {
        // 测试用
        // console.log(dataRef.current);
    }

    return (
        <div className="drug-input">
            <SurgerySelect cRef={typeRef}/>
            <form className="input-container" onSubmit={(e) => submitInput(e)}>
                <div className="drug-upper">
                    <Button variant="contained" sx={{paddingX: 5}}>保存</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleSubmit(e)} type='submit'>提交</Button>
                    <FileDownloadOutlinedIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                    <MoreVertSharpIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                </div>
                <div className="drug-lower">
                    <div className="name">耗材成本</div>
                    <SurgeryTime time='术前准备' surgery_type={1} filedName={[{type: "人员", unit: "Name"}, {type: "工作时长", unit: "Time"}]} cRef={dataBeforeRef}/>
                    <SurgeryTime time='手术中' surgery_type={2} cRef={dataDuringRef}/>
                    <SurgeryTime time='术后复苏' surgery_type={3} cRef={dataAfterRef}/>
                </div>
            </form>
        </div>
    );
}


const DocInput = () => {
    return (
        <div className='doc-input'>
            <div className='container' >
                <DrugInput/>
            </div>
        </div>
    )
}

export default DocInput;