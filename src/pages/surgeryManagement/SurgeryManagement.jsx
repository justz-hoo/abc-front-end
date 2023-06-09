import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination";


const SurgeryManagement = () => {

    // 控制翻页选择
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log('newPage', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [surgeryData, setSurgeryData] = useState([]);
    const getData = async () => {
        await axios.get('http://localhost:4000/getallsurgeries').then((res) => {
            console.log((res.data));
            setSurgeryData(res.data);
        })
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className='visualization'>
            <div className='container'>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>手术编号</TableCell>
                                <TableCell align="left">手术日期</TableCell>
                                <TableCell align="left">手术类型</TableCell>
                                <TableCell align="left">是否录入完毕</TableCell>
                                <TableCell align="left">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {surgeryData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((surgery, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell align="left">{surgery.surgeryId}</TableCell>
                                        <TableCell>{surgery.surgeryDate}</TableCell>
                                        <TableCell>{surgery.type}</TableCell>
                                        <TableCell>{surgery.drugUsage.length !== 0 ? '录入完毕': '未录入完毕'}</TableCell>
                                        <TableCell><Button>删除</Button></TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                        <caption>
                        </caption>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={surgeryData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};

export default SurgeryManagement;