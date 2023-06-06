import React, {useEffect, useImperativeHandle, useState} from "react";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { forwardRef  } from 'react';
import Paper from '@mui/material/Paper';


const SurgeryTimePlus = (props) => {
    useImperativeHandle(props.cRef,() => {
        return {
            // setData,
            getData: data  //暴露给父组件的接口
        }
    })

    const [data, setData] = useState(null);
    const [options, setOption] = useState(null);
    useEffect(() => {
        setData([
            {stype: '护士', duration: 100, num: 2},
        ]);

        setOption(props.options);
    }, []);



    const handleAdd = (e) => {
        const newData = {stype: '护士', duration: 100, num: 6};
        setData((prev) => [
            ...prev,
            newData
        ])
    };

    const handleDel = (e, index) => {
        setData((prev) => {
            const newData = [];
            for (let i = 0; i < prev.length; i++) {
                if (i === index) continue;
                newData.push(prev[i]);
            }
            return newData;
        });
    };

    const handleChange = (e, index) => {
        setData((prev) => {
            const newData = [];
            const tmp = prev[index];
            tmp.stype = e.target.value.toString();
            for (let i = 0; i < prev.length; i++) {
                if (index === i) {
                    newData.push(tmp);
                    continue;
                }
                newData.push(prev[i]);
            }
            return newData;
        });
    }

    const handleChangeNum = (e, index) => {
        // console.log(e.target.value);
        setData((prev) => {
            const newData = [];
            const tmp = prev[index];
            tmp[e.target.name] = Number(e.target.value);
            for (let i = 0; i < prev.length; i++) {
                if (index === i) {
                    newData.push(tmp);
                    continue;
                }
                newData.push(prev[i]);
            }
            return newData;
        });
    }

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#CBDCF7',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#CBDCF7',

        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
                borderColor: '#CBDCF7',
            },
            '&:hover fieldset': {
                borderColor: '#2684FF',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2684FF',
                borderWidth: 1.5,
            },
        },
    });

    const CssInput = styled(InputBase)({
        '& label.Mui-focused': {
            backgroundColor: '#CBDCF7',
        },
        '& .MuiInputBase-input': {
            borderColor: '#CBDCF7',
            padding: '8.5px 20px 8.5px 12px',
            border: '1px solid #CBDCF7',
            borderRadius: 6,
            '&:hover': {
                borderColor: '#2684FF'
            },
            '&:focused': {
                borderColor: '#2684FF'
            },
        },
    })

    return (
        <div className='surgery-block'>
            <div style={{fontStyle: 16, fontWeight: 600}}>{props.time}</div>
            <TableContainer component={Paper} style={{padding: 5}}>
                <Table  size="small" aria-label="a dense table" style={{border: "none",}}>
                    <TableHead style={{border:"none"}}>
                        <TableRow>
                            <TableCell style={{borderBottom: 0}} align="left">{props.filedName[0].name}</TableCell>
                            <TableCell style={{borderBottom: 0}} align="left">{props.filedName[1].name}</TableCell>
                            <TableCell style={{borderBottom: 0}} align="left">{props.filedName[2].name}</TableCell>
                            <TableCell style={{borderBottom: 0}} align='left'>编辑</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{border:"none"}}>
                        {data && data.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" style={{borderBottom: 0}} key={index}>
                                    <div className="drug-options">
                                        <FormControl sx={{minWidth: 120 }} style={{width: 190, backgroundColor: '#F7FAFF', borderColor: '#2684FF'}} size="small">
                                            <InputLabel id="demo-select-small-label">{props.filedName[0].unit}</InputLabel>
                                            <Select
                                                required
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label={props.filedName[0].unit}
                                                value={record.stype}
                                                input={<CssInput/>}
                                                onChange={(e) => handleChange(e, index)}
                                            >
                                                {options.map((option, index) =>
                                                    <MenuItem value={option.value}>{option.value}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </TableCell>
                                <TableCell style={{borderBottom: 0}}>
                                    <CssTextField
                                        required
                                        label={props.filedName[1].unit}
                                        name="duration"
                                        id="custom-css-outlined-input"
                                        size={"small"}
                                        value={record.duration}
                                        type="number"
                                        onChange={(e) => handleChangeNum(e, index)}
                                        style={{width: 190, backgroundColor: '#F7FAFF'}}
                                    />
                                </TableCell>
                                <TableCell style={{borderBottom: 0}}>
                                    <CssTextField
                                        required
                                        label={props.filedName[2].unit}
                                        name="num"
                                        id="custom-css-outlined-input"
                                        size={"small"}
                                        type="number"
                                        value={record.num}
                                        onChange={(e) => handleChangeNum(e, index)}
                                        style={{width: 190, backgroundColor: '#F7FAFF'}}
                                    />
                                </TableCell>
                                {index === data.length - 1 ? (
                                    <TableCell align='left' style={{borderBottom: 0}}>
                                        {data.length > 1 && (
                                            <Button
                                                variant="outlined"
                                                style={{marginRight: 20}}
                                                onClick={(e) => handleDel(e, index)}>Del</Button>
                                        )}
                                        {data.length === 1 ? (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    style={{marginRight: 20}}
                                                    onClick={(e) => handleAdd(e)}>Add</Button>
                                                <Button
                                                    style={{marginRight: 20}}
                                                    disabled
                                                ></Button>
                                            </>
                                        ):(
                                            <Button
                                                variant="outlined"
                                                style={{marginRight: 20}}
                                                onClick={(e) => handleAdd(e)}>Add</Button>
                                        )}
                                    </TableCell>
                                ): (
                                    <TableCell align='left' style={{borderBottom: 0}}>
                                        <Button
                                            variant="outlined"
                                            style={{marginRight: 20}}
                                            onClick={(e) => handleDel(e, index)}>Del</Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default forwardRef(SurgeryTimePlus);