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
    const [data, setData] = useState([
        {
            "_id": "一类切口手术",
            "num": 5,
            "stuffCost": 17521.527129370264,
            "materialCost": 13413,
            "drugCost": 56304,
            "otherCost": 273490.8496732026,
            "equipmentCost": 19043.166666666668
        },
        {
            "_id": "二类切口手术",
            "num": 1,
            "stuffCost": 1556.178026766262,
            "materialCost": 120,
            "drugCost": 1384,
            "otherCost": 56584.313725490196,
            "equipmentCost": 2187.5
        },
        {
            "_id": "血管类手术",
            "num": 2,
            "stuffCost": 3112.356053532524,
            "materialCost": 1500,
            "drugCost": 10258,
            "otherCost": 113168.62745098039,
            "equipmentCost": 5034.333333333333
        }
    ]);

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
                <span className='result-name'>月度手术项目成本</span>
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
                                <StyledTableCell align="left">人员成本</StyledTableCell>
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
                                    <StyledTableCell align="left">{row.materialCost + row.drugCost}</StyledTableCell>
                                    <StyledTableCell align="left">{row.stuffCost}</StyledTableCell>
                                    <StyledTableCell align="left">{}</StyledTableCell>
                                    <StyledTableCell align="left">{}</StyledTableCell>
                                    <StyledTableCell align="left">{row.num}</StyledTableCell>
                                    <StyledTableCell align="left">{}</StyledTableCell>
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
                sheetName: "demo",  //excel文件中sheet页名称
                sheetFilter: ["name", "type1", "type2", "type3", "type4", "type5", "type6", "type7", "type8"],  //excel文件中需显示的列数据
                sheetHeader:["#", "管理协调", "闲置中心",	"术前准备", "百级尘埃手术间", "千级尘埃手术间", "万级尘埃手术间", "DSA杂交手术间", "复苏"]  //excel文件中每列的表头名称
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
                                <StyledTableCell>#</StyledTableCell>
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
                                    <StyledTableCell align="left">{row.manage}</StyledTableCell>
                                    <StyledTableCell align="left">{row.unused}</StyledTableCell>
                                    <StyledTableCell align="left">{row.hundred}</StyledTableCell>
                                    <StyledTableCell align="left">{row.thousand}</StyledTableCell>
                                    <StyledTableCell align="left">{row.million}</StyledTableCell>
                                    <StyledTableCell align="left">{row.dsa}</StyledTableCell>
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

const SurgeryCost = () => {

    // const data = [
    //     {name: "科室成本", type1: 0, type2: 0, type3: 0, type4: 0},
    // ];

    useEffect(() => {
        axios.get('http://localhost:4000/getSurgeryCost').then((res) => {
            setData(res.data);
        })
    }, [])

    const [data, setData] = useState([
        {
            "_id": "647b2cf7cdfcc542549c113b",
            "surgeryId": "202306012",
            "surgeryDate": "2023-6-3",
            "type": "一类切口手术",
            "__v": 0,
            "materialCost": 15,
            "stuffCostBefore": 51.87260089220874,
            "stuffCostAfter": 155.6178026766262,
            "stuffCostDuring": 8018.726008922087,
            "otherCost": 26406.013071895424,
            "stuffCost": 8226.216412490921,
            "drugCost": 7684,
            "equipmentCost": 8556.5
        },
        {
            "_id": "647b2d31cdfcc542549c116e",
            "surgeryId": "202306013",
            "surgeryDate": "2023-6-3",
            "type": "一类切口手术",
            "__v": 0,
            "stuffCostAfter": 518.7260089220873,
            "stuffCostDuring": 4056.178026766262,
            "stuffCostBefore": 51.87260089220874,
            "materialCost": 160,
            "otherCost": 77331.89542483659,
            "stuffCost": 4626.776636580558,
            "drugCost": 12100,
            "equipmentCost": 6445.5
        }
    ]);
    const getAllData = async (e) => {
        await axios.get('http://localhost:4000/getSurgeryCost').then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    }

    // const handleExport = (e) => {
    //     let option = {};  //option代表的就是excel文件
    //     option.fileName = "科室成本表";  //excel文件名称
    //     option.datas = [
    //         {
    //             sheetData: data,  //excel文件中的数据源
    //             sheetName: "demo",  //excel文件中sheet页名称
    //             sheetFilter: ["name", "type1", "type2", "type3", "type4"],  //excel文件中需显示的列数据
    //             sheetHeader:["科室名称", "百级尘埃手术室", "一类切口手术室", "二类切口手术室", "一类切口手术室"]  //excel文件中每列的表头名称
    //         }
    //     ]
    //     let toExcel = new ExportJsonExcel(option);  //生成excel文件
    //     toExcel.saveExcel();  //下载excel文件
    // }

    return (
        <div className='result-block'>
            <div className="result-upper">
                <span className='result-name'>单台手术项目成本表</span>
                <div className='result-btn'>
                    <Button variant="contained" sx={{paddingX: 5}} onClick={(e) => getAllData(e)}>预览</Button>
                    <Button variant="outlined" sx={{paddingX: 5}} >下载</Button>
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
                                    <StyledTableCell align="left">{row.stuffCost}</StyledTableCell>
                                    <StyledTableCell align="left">{row.equipmentCost}</StyledTableCell>
                                    <StyledTableCell align="left">{row.materialCost + row.drugCost}</StyledTableCell>
                                    <StyledTableCell align="left">{row.otherCost}</StyledTableCell>
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
                {/*<DepartmentCost/>*/}
                <SurgeryCost/>
            </div>
        </div>
    );
};

export default Visualization;