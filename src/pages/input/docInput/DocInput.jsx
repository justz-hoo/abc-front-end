import './docInput.scss';
import Button from '@mui/material/Button';
import axios from "axios";
import React, {useEffect, useState} from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useRef } from 'react';
import SurgeryTime from "../../../components/SurgeryTime/SurgeryTime";
import SurgerySelect from "../../../components/SurgerySelect/SurgerySelect";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DrugInput = () => {

    const [sId, setSurgeryId] = useState(20230601);
    useEffect(() => {
        setSurgeryId('');
    }, []);

    const handleChangeId = (e) => {
        setSurgeryId(e.target.value);
    }

    const submitInput = async (e) => {
        e.preventDefault();
        // console.log('Before', dataBeforeRef.current.getData);
        // console.log('During', dataDuringRef.current.getData);
        // console.log('After', dataAfterRef.current.getData);
        // console.log('Type', typeRef.current.getType);

        const drugUsage = dataDuringRef.current.getData;
        const surgeryId = sId;

        try {
            const res = await axios.post('http://localhost:4000/updatesurgery',
                {drugUsage, surgeryId});
            alert(res.data);
            // console.log(res.data);
        } catch (e) {
            alert('update failed');
        }

    }

    const dataBeforeRef = useRef();
    const dataDuringRef = useRef();
    const dataAfterRef = useRef();
    const typeRef = useRef();
    const handleSubmit = (e) => {
        // 测试用
        // console.log(dataRef.current);
    }

    const drugOptions = [
        {value: '丙泊酚', label: '丙泊酚'},
        {value: '罗库酰胺', label: '罗库酰胺'},
        {value: '芬太尼', label: '芬太尼'},
        {value: '七氟醚', label: '七氟醚'},
        {value: '氧气', label: '氧气'},
        {value: '硫酸镁', label: '硫酸镁'}
    ];

    return (
        <div className="drug-input">
            {/*<SurgerySelect cRef={typeRef}/>*/}
            <form className="input-container" onSubmit={(e) => submitInput(e)}>
                <div className="surgeryid">
                    <TextField
                        required
                        name="surgeryId"
                        label="手术编号"
                        value={sId}
                        onChange={(e) => handleChangeId(e)}
                        style={{width: 200, backgroundColor: '#fff', border: "none"}}/>
                </div>
                <div className="drug-upper">
                    <Button variant="contained" sx={{paddingX: 5}}>保存</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} type='submit'>提交</Button>
                    <FileDownloadOutlinedIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                    <MoreVertSharpIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                </div>
                <div className="drug-lower">
                    <div className="name">耗材成本</div>
                    {/*<SurgeryTime time='术前准备'*/}
                    {/*             surgery_type={1}*/}
                    {/*             filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}*/}
                    {/*             options = {drugOptions}*/}
                    {/*             cRef={dataBeforeRef}/>*/}
                    <SurgeryTime time=''
                                 surgery_type={3}
                                 filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                                 options = {drugOptions}
                                 cRef={dataDuringRef}/>
                    {/*<SurgeryTime time='术后复苏'*/}
                    {/*             surgery_type={3}*/}
                    {/*             filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}*/}
                    {/*             options = {drugOptions}*/}
                    {/*             cRef={dataAfterRef}/>*/}
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