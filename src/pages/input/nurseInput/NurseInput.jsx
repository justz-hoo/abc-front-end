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


const NurseInput = () => {

    //TODO:修改
    const [hygienicMaterials, setMaterial] = useState([]);
    const loadData = async () => {
        await axios.get('http://qytzsb2023.frp.freefrps.com/jeecg-boot/noChargeForSanitaryMaterials/list').then((res) => {
            // console.log(res.data.result.records);
            setMaterial(res.data.result.records);
        })
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteDrug = async (id) => {
        await axios.delete(`http://qytzsb2023.frp.freefrps.com/jeecg-boot/noChargeForSanitaryMaterials/delete?id=${id}`);
        //重新获取一次列表并刷新
        loadData();
    }

    return (
        <div className='nurse-input'>
            <div className="container"  style={{display:"flex", flexDirection:"column", gap:30}}>
                <div className='drug-table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">不收费卫生材料名称</TableCell>
                                    <TableCell align="left">不收费卫生材料库存（使用量 ？）</TableCell>
                                    <TableCell align='left'>删除</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hygienicMaterials.map((record, index) => (
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
                <MaterialForm reloadDrugs={loadData}/>
            </div>
        </div>
    );
}

export default NurseInput;