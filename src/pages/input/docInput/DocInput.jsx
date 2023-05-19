import './docInput.scss';
import Button from '@mui/material/Button';
import axios from "axios";
import React, {useEffect, useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@mui/material/TextField";
import { makeStyles } from '@material-ui/core/styles';
import DrugForm from "../../../components/DrugForm/DrugForm";



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const DocInput = () => {
    const classes = useStyles();

    //TODO:修改
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [anesthesia, setAnesthesia] = useState([]);
    const loadData = async () => {
        await axios.get('http://qytzsb2023.frp.freefrps.com/jeecg-boot/anestheticMaterial/list').then((res) => {
            // console.log(res.data.result.records);
            setAnesthesia(res.data.result.records);
        })
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteDrug = async (id) => {
        await axios.delete(`http://qytzsb2023.frp.freefrps.com/jeecg-boot/anestheticMaterial/delete/?id=${id}`);
        //重新获取一次列表并刷新
        loadData();
    }

    return (
        <div className='doc-input'>
            <div className='container'>
                <div className='drug-table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">药品名称</TableCell>
                                    <TableCell align="left">药品库存 ？（药品使用量 ？）</TableCell>
                                    <TableCell align='left'>删除</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {anesthesia.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">{record.name}</TableCell>
                                        <TableCell align="left">{record.inventory}</TableCell>
                                        <TableCell align='left'>

                                            {/*// TODO:这里用link来做新建一个页面覆盖上去*/}
                                            <Button onClick={() => deleteDrug(record.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <DrugForm reloadDrugs={loadData}/>
            </div>
        </div>
    )
}

export default DocInput;