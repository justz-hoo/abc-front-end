import React, {useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import axios from "axios";
import './materialmanage.scss';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        paddingTop: 10,
        paddingBottom: 10
    },
}));

const StyledTableCellTop = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        paddingTop: 10,
        fontWeight: 700,
        color: '#fff',
        paddingBottom: 10
    },
}));

const Drugs = () => {

    const [drugData, setDrugData] = useState([]);

    // 控制翻页选择
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // console.log('newPage', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDrugData = async () => {
        await axios.get('http://localhost:4000/getalldrugs').then((res) => {
            setDrugData(res.data);
        });
    }

    useEffect(() => {
        getDrugData();
    }, []);


    // 控制当前选择的药品
    const [curDrug, setCurDrug] = useState('');
    const [curUnitPrice, setCurUnit] = useState(0);

    const showInput = (e, name) => {
        setCurDrug(name);
        setOpen(true);
    }

    // 获取该药品的单价
    const handleChange = (e) => {
        setCurUnit(Number(e.target.value));
    }

    //更新
    const submitInput = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/updateDrugUnit', {name: curDrug, unitprice: curUnitPrice})
            .then((res) => {
                getDrugData();
            });
        handleClose();
    }

    //更新对话框
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='material-block'>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    麻醉材料更新
                </DialogTitle>
                <form onSubmit={(e) => submitInput(e)}>
                    <DialogContent style={{padding: 20}}>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <TextField
                                disabled
                                label="麻醉材料名称"
                                id="outlined-size-small"
                                defaultValue={curDrug}
                                size="small"
                            />
                            <TextField
                                label="麻醉材料单价"
                                id="outlined-size-small"
                                type="number"
                                size="small"
                                name="name"
                                required
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>确认更新</Button>
                        <Button  onClick={() => {handleClose()}} autoFocus>
                            取消更新
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <span className='result-name'>麻醉材料</span>
            <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                            <StyledTableCellTop>#</StyledTableCellTop>
                            <StyledTableCellTop>麻醉材料名称</StyledTableCellTop>
                            <StyledTableCellTop align="left">麻醉材料单价</StyledTableCellTop>
                            <StyledTableCellTop align="left">操作</StyledTableCellTop>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drugData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((drug, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {page * rowsPerPage + index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>{drug.name}</StyledTableCell>
                                    <StyledTableCell>{drug.unitprice}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button  variant="outlined"
                                                 onClick={(e) => showInput(e, drug.name)}>更新单价</Button>
                                    </StyledTableCell>
                                </TableRow>

                            ))}
                    </TableBody>
                    <caption>
                        麻醉材料管理
                    </caption>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 8, 16]}
                component="div"
                count={drugData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

const Materials = () => {
    const [materialData, setMaterialData] = useState([]);
    // 控制翻页选择
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log('newPage', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getMaterialData = async () => {
        await axios.get('http://localhost:4000/getallmaterials').then((res) => {
            console.log(res.data);
            setMaterialData(res.data);
        });
    }
    useEffect(() => {
        getMaterialData();
    }, [])


    // 控制当前选择的药品
    const [curDrug, setCurDrug] = useState('');
    const [curUnitPrice, setCurUnit] = useState(0);

    const showInput = (e, name) => {
        setCurDrug(name);
        setOpen(true);
    }

    // 获取该药品的单价
    const handleChange = (e) => {
        setCurUnit(Number(e.target.value));
    }

    //更新
    const submitInput = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/updateMaterialUnit', {name: curDrug, unitprice: curUnitPrice})
            .then((res) => {
                getMaterialData();
            });
        handleClose();
    }

    //更新对话框
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className='material-block'>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    麻醉材料更新
                </DialogTitle>
                <form onSubmit={(e) => submitInput(e)}>
                    <DialogContent style={{padding: 20}}>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <TextField
                                disabled
                                label="不收费卫生材料名称"
                                id="outlined-size-small"
                                defaultValue={curDrug}
                                size="small"
                            />
                            <TextField
                                label="不收费卫生材料单价"
                                id="outlined-size-small"
                                type="number"
                                size="small"
                                name="name"
                                required
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>确认更新</Button>
                        <Button  onClick={() => {handleClose()}} autoFocus>
                            取消更新
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


            <span className='result-name'>不收费卫生材料</span>
            <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                            <StyledTableCellTop>#</StyledTableCellTop>
                            <StyledTableCellTop>不收费卫生材料名称</StyledTableCellTop>
                            <StyledTableCellTop align="left">不收费卫生材料单价</StyledTableCellTop>
                            <StyledTableCellTop align="left">操作</StyledTableCellTop>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materialData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((material, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {page * rowsPerPage + index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>{material.name}</StyledTableCell>
                                    <StyledTableCell>{material.unitprice}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button  variant="outlined"
                                                 onClick={(e) => showInput(e, material.name)}>更新单价</Button>
                                    </StyledTableCell>
                                </TableRow>

                            ))}
                    </TableBody>
                    <caption>
                        麻醉材料管理
                    </caption>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 8, 16]}
                component="div"
                count={materialData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
const MaterialManage = () => {
    return (
        <div className='manage-material'>
            <div className="container">
                <Drugs/>
                <Materials/>
            </div>
        </div>
    );
};

export default MaterialManage;