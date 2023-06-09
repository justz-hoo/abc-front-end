import React, {useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import axios from "axios";
import './initialization.scss';
import {Button} from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        paddingTop: 10,
        paddingBottom: 10
    },
}));

const StuffSheet = () => {
    const [stuffData, setStuffData] = useState([]);
    const getStuffData = async () => {
        await axios.get('http://localhost:4000/getallstuffsalarires').then((res) => {
            setStuffData(res.data);
        })
    };
    useEffect(() => {
        getStuffData();
    },[])
    return (
        <div className="sheet-block">
            <span className='result-name'>人员工时表</span>
            <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                            <StyledTableCell>人员职位</StyledTableCell>
                            <StyledTableCell align="left">人数</StyledTableCell>
                            <StyledTableCell align="left">工作天数</StyledTableCell>
                            <StyledTableCell align="left">每天工作时间/分钟</StyledTableCell>
                            <StyledTableCell align="left">理论工时</StyledTableCell>
                            <StyledTableCell align="left">有效理论工时</StyledTableCell>
                            <StyledTableCell align="left">当月总人员薪酬</StyledTableCell>
                            <StyledTableCell align="left">人员成本动因率</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stuffData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.num}</StyledTableCell>
                                <StyledTableCell align="left">{row.workday}</StyledTableCell>
                                <StyledTableCell align="left">{row.worktimeperday}</StyledTableCell>
                                <StyledTableCell align="left">{row.theorytime}</StyledTableCell>
                                <StyledTableCell align="left">{row.validtime}</StyledTableCell>
                                <StyledTableCell align="left">{row.sumsalary}</StyledTableCell>
                                <StyledTableCell align="left">{row.costPerMin}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const OtherSheet = () => {
    const [otherData, setOtherData] = useState([]);
    const getOtherData = async () => {
        await axios.get('http://localhost:4000/getallothers').then((res) => {
            setOtherData(res.data);
        })
    };

    useEffect(() => {
        getOtherData();
    }, [])

    return (
        <div className="sheet-block">
            <span className='result-name'>月度财务报表</span>
            <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                            <StyledTableCell>其他费用名称</StyledTableCell>
                            <StyledTableCell align="left">管理成本</StyledTableCell>
                            <StyledTableCell align="left">闲置成本</StyledTableCell>
                            <StyledTableCell align="left">合计</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {otherData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.managecost}</StyledTableCell>
                                <StyledTableCell align="left">{row.unusedcost}</StyledTableCell>
                                <StyledTableCell align="left">{row.managecost + row.unusedcost}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


const EquipSheet = () => {
    const [equipData, setEquipData] = useState([]);

    const getEquipData = async () => {
        await axios.get('http://localhost:4000/getallequipments').then((res) => {
            setEquipData(res.data);
        })
    };
    useEffect(() => {
        getEquipData();
    }, [])

    return (
        <div className="sheet-block">
            <span className='result-name'>专业仪器表</span>
            <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">设备名称</StyledTableCell>
                            <StyledTableCell align="left">本月折旧额</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                <StyledTableCell align="left">{row.cost}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const Initialization = () => {

    const [open, setOpen] = React.useState(false);
    const handleInitialization = (e) => {
        setOpen(true);
    }

    // 系统初始化
    const confirmInitialization = (e) => {
        setOpen(false);
        axios.post('http://localhost:4000/initializesys').then((res) => {
            console.log(res.data);
        })
        window.location.href = '/initialization';
    }

    const cancelInitialization = (e) => {
        setOpen(false);
    }

    return (
        <div className='initialization'>
            <div className="container">
                <Dialog
                    keepMounted
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        系统初始化
                    </DialogTitle>
                    <DialogContent style={{padding: 20}}>
                        <DialogContentText id="alert-dialog-description">
                            是否初始化系统 ？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmInitialization}>确认初始化系统</Button>
                        <Button onClick={cancelInitialization}>
                            取消初始化系统
                        </Button>
                    </DialogActions>
                </Dialog>

                <StuffSheet/>
                <OtherSheet/>
                <EquipSheet/>
                <div className="initial-btn" >
                    <Button variant="contained"
                            style={{backgroundColor: '#1976D2', color: "#fff",
                                paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20}}
                            onClick={(e) => handleInitialization(e)}>初始化系统</Button>
                </div>
            </div>
        </div>
    );
};

export default Initialization;