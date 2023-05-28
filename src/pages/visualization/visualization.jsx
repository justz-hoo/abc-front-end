import Navbar from "../../components/navbar/Navbar";
import './visualization.scss';
import Button from "@mui/material/Button";
import React, {useEffect, useImperativeHandle, useState} from "react";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { forwardRef  } from 'react';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ExportJsonExcel from "js-export-excel"


// 手术项目成本表
const SurgeryCost = () => {
    const data = [
        {name: "耗材成本", type1: 0, type2: 0, type3: 0, type4: 0},
        {name: "人员成本", type1: 0, type2: 0, type3: 0, type4: 0},
        {name: "术前准备成本", type1: 0, type2: 0, type3: 0, type4: 0},
        {name: "手术间成本", type1: 0, type2: 0, type3: 0, type4: 0},
        {name: "复苏成本", type1: 0, type2: 0, type3: 0, type4: 0},
        {name: "合计手术项目成本", type1: 0, type2: 0, type3: 0, type4: 0},
    ]

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "手术项目成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "demo",  //excel文件中sheet页名称
                sheetFilter: ["name", "type1", "type2", "type3", "type4"],  //excel文件中需显示的列数据
                sheetHeader:["手术项目名称", "百级尘埃手术项目", "一类切口手术项目", "二类切口手术项目", "一类切口手术项目"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>手术项目成本</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)} >下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>手术项目名称</StyledTableCell>
                                <StyledTableCell align="left">百级尘埃手术项目</StyledTableCell>
                                <StyledTableCell align="left">一类切口手术项目</StyledTableCell>
                                <StyledTableCell align="left">二类切口手术项目</StyledTableCell>
                                <StyledTableCell align="left">血管类手术项目</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.type1}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type2}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type3}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type4}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        paddingTop: 10,
        paddingBottom: 10
    },
}));


// 作业中心
const CenterCost = () => {

    const data = [
        {name: "专业仪器折旧", type1: 0, type2: 0, type3: 0, type4: 0, type5: 0, type6: 0, type7: 0, type8: 0},
        {name: "其他成本",  type1: 0, type2: 0, type3: 0, type4: 0, type5: 0, type6: 0, type7: 0, type8: 0},
        {name: "合计作业中心成本",  type1: 0, type2: 0, type3: 0, type4: 0, type5: 0, type6: 0, type7: 0, type8: 0},
    ]

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "作业中心成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "demo",  //excel文件中sheet页名称
                sheetFilter: ["name", "type1", "type2", "type3", "type4", "type5", "type6", "type7", "type8"],  //excel文件中需显示的列数据
                sheetHeader:["#", "管理协调", "闲置中心",	"术前准备", "百级尘埃手术间", "千级尘埃手术间", "万级尘埃手术间", "DSA杂交手术间", "复苏"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>作业中心成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)} >下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>管理协调</StyledTableCell>
                                <StyledTableCell>闲置中心</StyledTableCell>
                                <StyledTableCell>术前准备</StyledTableCell>
                                <StyledTableCell>百级尘埃手术间</StyledTableCell>
                                <StyledTableCell>千级尘埃手术间</StyledTableCell>
                                <StyledTableCell>万级尘埃手术间</StyledTableCell>
                                <StyledTableCell>DSA杂交手术间</StyledTableCell>
                                <StyledTableCell>复苏</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.type1}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type2}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type3}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type4}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type5}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type6}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type7}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type8}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

// 科室成本
const DepartmentCost = () => {

    const data = [
        {name: "科室成本", type1: 0, type2: 0, type3: 0, type4: 0},
    ];

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "科室成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "demo",  //excel文件中sheet页名称
                sheetFilter: ["name", "type1", "type2", "type3", "type4"],  //excel文件中需显示的列数据
                sheetHeader:["科室名称", "百级尘埃手术室", "一类切口手术室", "二类切口手术室", "一类切口手术室"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>科室成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)}>下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>科室名称</StyledTableCell>
                                <StyledTableCell align="left">百级尘埃手术室</StyledTableCell>
                                <StyledTableCell align="left">一类切口手术室</StyledTableCell>
                                <StyledTableCell align="left">二类切口手术室</StyledTableCell>
                                <StyledTableCell align="left">血管类手术室</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.type1}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type2}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type3}</StyledTableCell>
                                    <StyledTableCell align="left">{row.type4}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )

}


const Visualization = () => {
    return (
        <div className='visualization'>
            <div className='container'>
                <SurgeryCost/>
                <CenterCost/>
                <DepartmentCost/>
            </div>
        </div>
    );
};

export default Visualization;