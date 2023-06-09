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
import axios from "axios";


// 月度手术项目成本表
const SurgeryRoomCost = () => {
    const [data, setData] = useState([]);

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "月度手术项目成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "月度手术项目",  //excel文件中sheet页名称
                sheetFilter: [
                    "_id",
                    "sumMaterial",
                    "centerCost",
                    "sumCost",
                    "num",
                    "avgCost"
                ],  //excel文件中需显示的列数据
                sheetHeader:[
                    "手术项目名称",
                    "耗材成本",
                    "手术间成本",
                    "合计手术项目成本",
                    "手术台数",
                    "手术项目平均成本"
                ]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    const getAllData = async (e) => {
        await axios.get('http://localhost:4000/getSurgeryRoomCost').then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    }

    useEffect(() => {
        axios.get('http://localhost:4000/getSurgeryRoomCost').then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    },[]);

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>月度手术项目成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}} onClick={(e) => {getAllData(e)}}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)} >下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>手术项目名称</StyledTableCell>
                                <StyledTableCell align="left">耗材成本</StyledTableCell>
                                <StyledTableCell align="left">手术间成本</StyledTableCell>
                                <StyledTableCell align="left">合计手术项目成本</StyledTableCell>
                                <StyledTableCell align="left">手术台数</StyledTableCell>
                                <StyledTableCell align="left">手术项目平均成本</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row._id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.sumMaterial.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.centerCost.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.sumCost.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.num}</StyledTableCell>
                                    <StyledTableCell align="left">{row.avgCost.toFixed(2)}</StyledTableCell>
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
    const [data, setData] = useState([
        {
            "name": "专业仪器折旧",
            "manage": 0,
            "unused": 0,
            "hundred": 4055.714285714286,
            "thousand": 15874.809523809525,
            "million": 1891.7142857142858,
            "dsa": 4442.761904761905
        }
    ]);
    useEffect(() => {
        axios.get('http://localhost:4000/getCenterCost').then((res) => {
            setData(res.data);
        })
    }, []);

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "作业中心成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "作业中心成本",  //excel文件中sheet页名称
                sheetFilter: [
                    "name",
                    "manage",
                    "unused",
                    "hundred",
                    "thousand",
                    "million",
                    "dsa"
                ],  //excel文件中需显示的列数据
                sheetHeader:["作业中心名称", "管理协调", "闲置中心", "百级尘埃手术间", "千级尘埃手术间", "万级尘埃手术间", "DSA杂交手术间"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    const getAllData = async (e) => {
        await axios.get('http://localhost:4000/getCenterCost', (res) => {
            setData(res.data);
        })
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>作业中心成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}} onClick={(e) => {getAllData(e)}}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)} >下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>作业中心名称</StyledTableCell>
                                <StyledTableCell>管理协调</StyledTableCell>
                                <StyledTableCell>闲置中心</StyledTableCell>
                                <StyledTableCell>百级尘埃手术间</StyledTableCell>
                                <StyledTableCell>千级尘埃手术间</StyledTableCell>
                                <StyledTableCell>万级尘埃手术间</StyledTableCell>
                                <StyledTableCell>DSA杂交手术间</StyledTableCell>
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
                                    <StyledTableCell align="left">{row.manage.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.unused.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.hundred.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.thousand.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.million.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.dsa.toFixed(2)}</StyledTableCell>
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

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "科室成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "科室成本",  //excel文件中sheet页名称
                sheetFilter: ["name", "cost0", "cost1", "cost2", "cost3"],  //excel文件中需显示的列数据
                sheetHeader:["科室名称", "百级尘埃手术室", "一类切口手术室", "二类切口手术室", "血管类手术室"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    const [data, setData] = useState([
        {name: "科室成本", cost0: 0, cost1: 0, cost2: 0, cost3: 0},
    ]);

    useEffect(() => {
        axios.get('http://localhost:4000/getDepartment').then((res) =>{
            setData(res.data);
        });
    }, [])

    const getAllData = async (e) => {
        await axios.get('http://localhost:4000/getDepartment').then((res) =>{
            setData(res.data);
        });
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>科室成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}} onClick={(e) => getAllData(e)}>预览</Button>
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
                                    <StyledTableCell align="left">{row.cost0.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.cost1.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.cost2.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.cost3.toFixed(2)}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )

}

const SurgeryCost = () => {

    useEffect(() => {
        getAllData();
    }, [])

    const [data, setData] = useState([]);
    const getAllData = async (e) => {
        await axios.get('http://localhost:4000/getSurgeryCost').then((res) => {
            const tmp_data = res.data;
            for (let i = 0; i < tmp_data.length; i++) {
                tmp_data[i].sumMaterial = tmp_data[i].drugCost + tmp_data[i].materialCost;
            }
            setData(tmp_data);
        })
    }

    const handleExport = (e) => {
        let option = {};  //option代表的就是excel文件
        option.fileName = "单台手术项目成本表";  //excel文件名称
        option.datas = [
            {
                sheetData: data,  //excel文件中的数据源
                sheetName: "单台手术项目成本",  //excel文件中sheet页名称
                sheetFilter: [
                                "surgeryId",
                                "surgeryDate",
                                "type",
                                "otherCost",
                                "stuffCost",
                                "equipmentCost",
                                "sumMaterial"
                ],  //excel文件中需显示的列数据
                sheetHeader:["手术项目编号", "手术项目类别", "手术日期", "人员", "设备", "耗材", "其他"]  //excel文件中每列的表头名称
            }
        ]
        let toExcel = new ExportJsonExcel(option);  //生成excel文件
        toExcel.saveExcel();  //下载excel文件
    }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>单台手术项目成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}} onClick={(e) => getAllData(e)}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} onClick={(e) => handleExport(e)}>下载</Button>
                </div>
            </div>
            <div className="result-lower">
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCell>手术项目编号</StyledTableCell>
                                <StyledTableCell align="left">手术项目类别</StyledTableCell>
                                <StyledTableCell align="left">手术日期</StyledTableCell>
                                <StyledTableCell align="left">人员</StyledTableCell>
                                <StyledTableCell align="left">设备</StyledTableCell>
                                <StyledTableCell align="left">耗材</StyledTableCell>
                                <StyledTableCell align="left">其他</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.surgeryId}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.type}</StyledTableCell>
                                    <StyledTableCell align="left">{row.surgeryDate}</StyledTableCell>
                                    <StyledTableCell align="left">{row.stuffCost.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.equipmentCost.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.sumMaterial.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="left">{row.otherCost.toFixed(2)}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}


const Visualization = () => {
    return (
        <div className='visualization'>
            <div className='container'>
                <SurgeryRoomCost/>
                <CenterCost/>
                <DepartmentCost/>
                <SurgeryCost/>
            </div>
        </div>
    );
};

export default Visualization;