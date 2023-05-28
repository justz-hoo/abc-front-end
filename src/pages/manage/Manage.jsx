import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import './manage.scss';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {useEffect, useState} from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import data from "bootstrap/js/src/dom/data";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';


function createData(pid, name, create_time, type, department, tel) {
    return {
        pid,
        name,
        create_time,
        type,
        department,
        tel,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const headCells = [
    {
        id: 'pid',
        numeric: false,
        disablePadding: false,
        label: '账号',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: '姓名',
    },
    {
        id: 'create_time',
        numeric: false,
        disablePadding: false,
        label: '创建时间',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: '人员类别',
    },
    {
        id: 'department',
        numeric: false,
        disablePadding: false,
        label: '所属科室',
    },
    {
        id: 'tel',
        numeric: false,
        disablePadding: false,
        label: '联系方式',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    const handleDel = (e) => {
        props.setData((prev) => {
            console.log('dddddddddddddel')
            const newData = [];
            for (let i = 0; i < props.data.length; i ++) {
                let ifDel = false;
                for (let j = 0; j < props.selected.length; j ++) {
                    if (props.selected[j] === props.data[i].pid) {
                        ifDel = true;
                        break;
                    }
                }
                if (!ifDel) {
                    newData.push(props.data[i]);
                }
            }
            return newData;
        });
    }



    //对话框
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const agreeReload = () => {
        // window.location.reload();
        handleClose();
    }
    const disAgreeReload = () => {
        handleClose();
    }

    const handleChange = () => {

    }
    const handleAdd = () => {
        setOpen(true);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
            style={{backgroundColor: "#829EFD", borderTopLeftRadius: 6, borderTopRightRadius: 6, color: '#fff'}}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                  人员信息管理
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton style={{color: "#fff"}}>
                        <DeleteIcon onClick={(e) => handleDel(e)} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton style={{color: "#fff"}}>
                        <PersonAddIcon onClick={(e) => handleAdd(e)}/>
                    </IconButton>
                </Tooltip>
            )}


            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        人员管理
                    </DialogTitle>
                    <DialogContent style={{padding: 20}}>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <TextField
                                label="账号"
                                id="outlined-size-small"
                                defaultValue="#P-01989"
                                size="small"
                                name="account"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                label="姓名"
                                id="outlined-size-small"
                                defaultValue="贵宾"
                                size="small"
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                label="人员类别"
                                id="outlined-size-small"
                                defaultValue="护士"
                                size="small"
                                name="type"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                label="所属科室"
                                id="outlined-size-small"
                                defaultValue="麻醉科"
                                size="small"
                                name="department"
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                label="联系方式"
                                id="outlined-size-small"
                                defaultValue="Puppy123"
                                size="small"
                                onChange={(e) => handleChange(e)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={agreeReload}>添加用户</Button>
                        <Button onClick={disAgreeReload} autoFocus>
                            取消添加
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Toolbar>
    );
}
// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };


const ManageTable = () => {

    const [rows, setRows] = useState([
        createData('#P-00012', '南瓜','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00016', '小南瓜','26/02/2021 12:42 AM', '医生', '呼吸科', '520521520'),
        createData('#P-00015', '小猪','23/02/2020, 12:42 AM', '医生', '麻醉科', '520520521'),
        createData('#P-00013', '小狗','24/02/2020, 12:42 AM', '医生', '呼吸科', '521521521'),
        createData('#P-00017', '老咪','26/02/2020, 12:42 AM', '医生', '麻醉科', '521520521'),
        createData('#P-00018', '五花肉','24/02/2020, 12:42 AM', '医生', '笑话科', '521521520'),
        createData('#P-00011', '老咪胖橘','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00026', '小猪','24/02/2021, 12:42 AM', '医生', '呼吸科', '520520520'),
        createData('#P-00051', '老咪缅因','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00021', '小狗比格','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00022', '小狗金毛','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00034', '老沈','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        createData('#P-00019', '小马','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
    ]);
    useEffect(() => {
        setRows([
            createData('#P-00012', '南瓜','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00016', '小南瓜','26/02/2021 12:42 AM', '医生', '呼吸科', '520521520'),
            createData('#P-00015', '小猪','23/02/2020, 12:42 AM', '医生', '麻醉科', '520520521'),
            createData('#P-00013', '小狗','24/02/2020, 12:42 AM', '医生', '呼吸科', '521521521'),
            createData('#P-00017', '老咪','26/02/2020, 12:42 AM', '医生', '麻醉科', '521520521'),
            createData('#P-00018', '五花肉','24/02/2020, 12:42 AM', '医生', '笑话科', '521521520'),
            createData('#P-00011', '老咪胖橘','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00026', '小猪','24/02/2021, 12:42 AM', '医生', '呼吸科', '520520520'),
            createData('#P-00051', '老咪缅因','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00021', '小狗比格','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00022', '小狗金毛','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00034', '老沈','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
            createData('#P-00019', '小马','26/02/2020, 12:42 AM', '医生', '麻醉科', '520520520'),
        ])
    }, [])

    useEffect(() => {
        console.log(rows);
    }, [rows])

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        console.log(selected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} data={rows} setData={setRows} selected={selected}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.pid);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.pid)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.pid}
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.create_time}</TableCell>
                                        <TableCell align="left">{row.type}</TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                        <TableCell align="left">{row.tel}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );

}


const Manage = () => {
    return (
        <div className='manage'>
            <div className="container">
                <ManageTable/>
            </div>
        </div>
    );
};

export default Manage;