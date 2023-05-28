import React, {useEffect, useRef, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@mui/material/Button";
import axios from "axios";
import './nurseInput.scss';
import MaterialForm from "../../../components/materialForm/MaterialForm";
import SurgerySelect from "../../../components/SurgerySelect/SurgerySelect";
import SurgeryTime from "../../../components/SurgeryTime/SurgeryTime";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import SurgeryTimePlus from "../../../components/SurgeryTimePlus/SurgeryTimePlus";

// 人员成本
const StaffInput = (props) => {
    const stuffOptions = [
        {value: '医生', label: '医生'},
        {value: '护士', label: '护士'},
        {value: '护工', label: '护工'},
    ]

    return (
        <div className='input-block'>
            <div className="name">人员成本</div>
            <SurgeryTimePlus time='术前准备'
                             surgery_type={1}
                             filedName={[{name: "人员类别", unit: "Name"}, {name: "工作时长", unit: "Time"}, {name: "人员数量", unit: "number"}]}
                             options = {stuffOptions}
                             cRef={props.refBefore} />
            <SurgeryTimePlus time='手术中'
                             surgery_type={2}
                             filedName={[{name: "人员类别", unit: "Name"}, {name: "手术耗时", unit: "Time"}, {name: "人员数量", unit: "number"}]}
                             options = {stuffOptions}
                             cRef={props.refDuring}/>
            <SurgeryTimePlus time='术后复苏'
                             surgery_type={3}
                             filedName={[{name: "人员类别", unit: "Name"}, {name: "工作时长", unit: "Time"}, {name: "人员数量", unit: "number"}]}
                             options = {stuffOptions}
                             cRef={props.refAfter}/>
        </div>
    )

}


// 设备成本
const EquipmentInput = (props) => {

    const equipmentOptions = [
        {value: '手术床', label: ''},
        {value: '呼吸机', label: ''},
        {value: '心电监护仪', label: ''},
        {value: '输液泵', label: ''},
        {value: '无影灯', label: ''},
        {value: '手术显微镜', label: ''},
        {value: '麻醉机', label: ''},
    ]

    return (
        <div className='input-block'>
            <div className="name">设备成本</div>
            <SurgeryTime time='术前准备'
                         surgery_type={1}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}
                         cRef={props.refBefore} />
            <SurgeryTime time='手术中'
                         surgery_type={2}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}
                         cRef={props.refDuring}/>
            <SurgeryTime time='术后复苏'
                         surgery_type={3}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}
                         cRef={props.refAfter}/>
        </div>
    )

}

// 耗材成本
const MaterialInput = (props) => {

    const materialOptions = [
        {value: '纱布', label: ''},
        {value: '棉球', label: ''},
        {value: '带线针', label: ''},
        {value: '刀片', label: ''},
        {value: '线圈', label: ''},
        {value: '持针器', label: ''},
        {value: '组织钳', label: ''},
        {value: '中弯钳', label: ''},
        {value: '小弯钳', label: ''},
        {value: '布巾钳', label: ''},
        {value: '刀柄', label: ''},
        {value: '剪刀', label: ''},
        {value: '镊子', label: ''},
        {value: '拉钩', label: ''},
        {value: '卵圆钳', label: ''},
        {value: '内镜器械/件', label: ''},
        {value: '无菌手套', label: ''},
        {value: '手术衣', label: ''},
        {value: '口罩', label: ''},
        {value: '帽子', label: ''},
    ]

    return (
        <div className='input-block'>
            <div className="name">耗材成本</div>
            <SurgeryTime time='术前准备'
                         surgery_type={1}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}
                         cRef={props.refBefore} />
            <SurgeryTime time='手术中'
                         surgery_type={2}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}
                         cRef={props.refDuring}/>
            <SurgeryTime time='术后复苏'
                         surgery_type={3}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}
                         cRef={props.refAfter}/>
        </div>
    )
}

const NurseInput = () => {
    const submitInput = (e) => {
        e.preventDefault();
        // 测试用
        console.log('Type', typeRef.current.getType);
        console.log('StuffBefore', stuffBeforeRef.current.getData);
        console.log('StuffDuring', stuffDuringRef.current.getData);
        console.log('StuffAfter', stuffAfterRef.current.getData);
        console.log('EquipmentBefore', equipBeforeRef.current.getData);
        console.log('EquipmentBefore', equipDuringRef.current.getData);
        console.log('EquipmentBefore', equipAfterRef.current.getData);
        console.log('MaterialBefore', materialBeforeRef.current.getData);
        console.log('MaterialBefore', materialBeforeRef.current.getData);
        console.log('MaterialBefore', materialBeforeRef.current.getData);
    }

    const handleSubmit = (e) => {
    }

    const stuffBeforeRef = useRef();
    const stuffDuringRef = useRef();
    const stuffAfterRef = useRef();
    const equipBeforeRef = useRef();
    const equipDuringRef = useRef();
    const equipAfterRef = useRef();
    const materialBeforeRef = useRef();
    const materialDuringRef = useRef();
    const materialAfterRef = useRef();
    const typeRef = useRef();

    return (
        <div className='nurse-input'>
            <div className="container">
                <div className="all-input">
                    <form  className='input-container' onSubmit={(e) => submitInput(e)}>
                        <SurgerySelect cRef={typeRef}/>
                        <div className='input-details'>
                            <div className="upper">
                                <Button variant="contained" sx={{paddingX: 5}}>保存</Button>
                                <Button variant="outlined" sx={{paddingX: 5}} type='submit'>提交</Button>
                                <FileDownloadOutlinedIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                                <MoreVertSharpIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                            </div>

                            <StaffInput refAfter={stuffAfterRef} refBefore={stuffBeforeRef} refDuring={stuffDuringRef}/>
                            <EquipmentInput refAfter={equipAfterRef} refBefore={equipBeforeRef} refDuring={equipDuringRef}/>
                            <MaterialInput refAfter={materialAfterRef} refBefore={materialBeforeRef} refDuring={materialDuringRef}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NurseInput;