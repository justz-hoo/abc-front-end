import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useEffect, useImperativeHandle, useState} from "react";
import Button from "@mui/material/Button";
import * as React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


const DrugSelect = (props) => {
    const [categories, setCate] = useState(props.drugs);
    const childClicked  = (index, e) => {
        let tmp = categories;
        tmp[index].state = !tmp[index].state;
        setCate((prev) => (tmp));
        // console.log(categories);

        setTimeout(() => {
            //子组建将categories参数传递给父组件
            props.sendValue(categories);
            console.log(categories);
        }, 100);
    };

    useImperativeHandle(props.onRef, () => {
        //将子组建中的setCate方法暴露给父组建
        return {
            updateCate: (val) => {
                setCate(val); //将子组建中的categories全部清零
            }
        }
    })


    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexFlow: 'row wrap'}}>
            {categories.map((category, index) => (
                <FormControlLabel
                    index = {index}
                    labelPlacement='start'
                    name={category.name}
                    label={category.name}
                    checked={category.state}
                    control={<Checkbox
                        onChange={(e) => childClicked(index, e)}
                        size='small'
                        sx={{ml:0}}
                    />}
                />
            ))}
        </Box>
    );

    return (
        <div className='drug-select'>
            {/*{children}*/}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">不收费材料名称</TableCell>
                            <TableCell align="left">单位</TableCell>
                            <TableCell align="left">选择</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .map((category, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{category.name}</TableCell>
                                    <TableCell align="left">{category.specification}</TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            index = {index}
                                            labelPlacement='start'
                                            name={category.name}
                                            checked={category.state}
                                            control={<Checkbox
                                                onChange={(e) => childClicked(index, e)}
                                                size='small'
                                                sx={{ml:-3, height:'15px'}}
                                            />}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DrugSelect;