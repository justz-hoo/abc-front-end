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
    return (
        <div className='staff-input'>
            <div className="name">人员成本</div>
            <SurgeryTime time='术前准备' surgery_type={1} />
            <SurgeryTime time='手术中' surgery_type={2} />
            <SurgeryTime time='术后复苏' surgery_type={3} />
        </div>
    )

}


//
const MaterialInput = () => {

}

// 设备成本
const EquipmentInput = () => {

}

// const
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