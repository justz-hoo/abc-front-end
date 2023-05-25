import React, {useEffect, useState} from 'react';
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


// 人员成本
const StaffInput = () => {
    const stuffOptions = [
        {value: '医生', label: '医生'},
        {value: '护士', label: '护士'},
        {value: '护工', label: '护工'},
    ]

    return (
        <div className='staff-input'>
            <div className="name">人员成本</div>
            <SurgeryTime time='术前准备'
                         surgery_type={1}
                         filedName={[{name: "人员", unit: "Name"}, {name: "工作时长", unit: "Time"}]}
                         options = {stuffOptions}
                         /*cRef={dataBeforeRef}*/ />
            <SurgeryTime time='手术中'
                         surgery_type={2}
                         filedName={[{name: "人员", unit: "Name"}, {name: "工作时长", unit: "amount"}]}
                         options = {stuffOptions}/>
            <SurgeryTime time='术后复苏'
                         surgery_type={3}
                         filedName={[{name: "人员", unit: "Name"}, {name: "工作时长", unit: "amount"}]}
                         options = {stuffOptions}/>
        </div>
    )

}


// 设备成本
const EquipmentInput = () => {

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
        <div className='staff-input'>
            <div className="name">设备成本</div>
            <SurgeryTime time='术前准备'
                         surgery_type={1}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}
                /*cRef={dataBeforeRef}*/ />
            <SurgeryTime time='手术中'
                         surgery_type={2}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}/>
            <SurgeryTime time='术后复苏'
                         surgery_type={3}
                         filedName={[{name: "设备名称", unit: "Name"}, {name: "使用时间", unit: "Time"}]}
                         options = {equipmentOptions}/>
        </div>
    )

}

//
const MaterialInput = () => {
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
        <div className='staff-input'>
            <div className="name">耗材成本</div>
            <SurgeryTime time='术前准备'
                         surgery_type={1}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}
                /*cRef={dataBeforeRef}*/ />
            <SurgeryTime time='手术中'
                         surgery_type={2}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}/>
            <SurgeryTime time='术后复苏'
                         surgery_type={3}
                         filedName={[{name: "材料名称", unit: "Name"}, {name: "使用数量", unit: "amount"}]}
                         options = {materialOptions}/>
        </div>
    )
}

const NurseInput = () => {

    return (
        <div className='nurse-input'>
            <div className="container">
                <div className="all-input">
                    <SurgerySelect/>
                    <StaffInput/>
                    <EquipmentInput/>
                    <MaterialInput/>
                </div>
            </div>
        </div>
    );
}

export default NurseInput;