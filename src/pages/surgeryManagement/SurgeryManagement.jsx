import React, {createRef, useEffect, useState} from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination";
import {styled} from "@mui/material/styles";
import './surgeryMangement.scss';

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

    const handleDel = async (e, surgeryId) => {
        console.log('surgeryId', surgeryId)
        await axios(
            {
                url: 'http://localhost:4000/deleteSurgeryById',
                method: 'delete',
                data: {
                    id: surgeryId
                }
            }
        )
        getData();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='surgeryManagement'>
            <div className='container'>
                <TableContainer style={{backgroundColor: "#fff", borderRadius:10}} component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "#829EFD", color: "#fff"}}>
                                <StyledTableCellTop>#</StyledTableCellTop>
                                <StyledTableCellTop>手术编号</StyledTableCellTop>
                                <StyledTableCellTop align="left">手术日期</StyledTableCellTop>
                                <StyledTableCellTop align="left">手术类型</StyledTableCellTop>
                                <StyledTableCellTop align="left">是否录入完毕</StyledTableCellTop>
                                <StyledTableCellTop align="left">操作</StyledTableCellTop>
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
                                        <StyledTableCell component="th" scope="row">
                                            {page * rowsPerPage + index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{surgery.surgeryId}</StyledTableCell>
                                        <StyledTableCell>{surgery.surgeryDate}</StyledTableCell>
                                        <StyledTableCell>{surgery.type}</StyledTableCell>
                                        <StyledTableCell>{surgery.drugUsage.length !== 0 ? '录入完毕': '未录入完毕'}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button  variant="outlined"
                                                     onClick={(e) => handleDel(e, surgery.surgeryId)}>删除</Button>
                                        </StyledTableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                        <caption>
                            手术管理
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