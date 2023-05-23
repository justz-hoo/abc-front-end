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
import Select from 'react-select';
import download_url from '../../../asset/icon/download.svg'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { alpha, styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const drugSelections = [
    {name: '丙泊酚', state: false},
    {name: '罗库酰胺', state: false},
    {name: '芬太尼', state: false},
    {name: '七氟醚', state: false},
    {name: '氧气', state: false},
    {name: '硫酸镁', state: false}
];


const SurgerySelect = () => {
    const options = [
        { value: '1', label: '一类切口手术' },
        { value: '2', label: '二类切口手术' },
        { value: '3', label: '血管类手术项目' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className='select'>
            <div className="surgery-options">
                <Select
                    className="react-select-container"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    classNamePrefix='surgery-select'
                />
            </div>
        </div>
    );
}

const SurgeryTime = (props) => {
    const [data, setData] = useState(null);
    const [options, setOption] = useState(null);
    useEffect(() => {
        setData([
            {name: '1', volume: 0},
            {name: '2', volume: 0},
            {name: '3', volume: 0},
        ]);

        setOption([
            {value: '丙泊酚', label: '丙泊酚'},
            {value: '罗库酰胺', label: '罗库酰胺'},
            {value: '芬太尼', label: '芬太尼'},
            {value: '七氟醚', label: '七氟醚'},
            {value: '氧气', label: '氧气'},
            {value: '硫酸镁', label: '硫酸镁'}
        ]);
    }, []);



    const handleAdd = (e) => {
        const newData = {name: '', volume: 0};
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


        // 更新option
        setOption((prev) => {
            if (data[index].name === '')
                return prev;
            else
                return [
                    ...prev,
                    {value: data[index].name, label: data[index].name}
                ]
        });
    };


    const handleChange = (e, index) => {
        setData((prev) => {
            const newData = [];
            const tmp = prev[index];
            tmp.name = e.value;
            for (let i = 0; i < prev.length; i++) {
                if (index === i) {
                    newData.push(tmp);
                    continue;
                }
                newData.push(prev[i]);
            }
            return newData;
        });

        // 更新Option
        setOption((prev) => {
            // console.log(e.value);
            const newOptions = [];
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].value === e.value) continue;
                newOptions.push(prev[i]);
            }
            console.log(newOptions);
            return newOptions;
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
                borderColor: '#B2BAC2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2684FF',
                borderWidth: 1.5
            },
        },
    });

    const options2 = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    const [value, setValue] = useState(null);

    return (
        <div className='surgery-block'>
            <div>{props.time}</div>
            <TableContainer>
                <Table  size="small" aria-label="a dense table" style={{border: "none"}}>
                    <TableHead style={{border:"none"}}>
                        <TableRow>
                            <TableCell align="left">材料名称</TableCell>
                            <TableCell align="left">使用数量</TableCell>
                            <TableCell align='left'>编辑</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{border:"none"}}>
                        {data && data.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" style={{borderBottom: 0}} key={index}>
                                    <div className="drug-options">
                                        <Select
                                            className="react-select-container"
                                            classNamePrefix="drug-select"
                                            onChange={(e) => {
                                                handleChange(e, index);
                                            }}
                                            options={options}
                                            defaultValue={{value: '', label: ''}}
                                        >
                                        </Select>
                                    </div>
                                </TableCell>
                                <TableCell style={{borderBottom: 0}}>
                                    <CssTextField
                                        required
                                        label="amount"
                                        id="custom-css-outlined-input"
                                        size={"small"}
                                        style={{width: 300, backgroundColor: '#F7FAFF'}}
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
                                        {data.length < 6 && (
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
}


const DrugInput = () => {
    const submitInput = (e) => {

    }


    return (
        <div className="drug-input">
                <form  className="input-container" onSubmit={(e) => submitInput(e)}>
                    <div className="drug-upper">
                        <Button variant="contained" sx={{paddingX: 5}}>保存</Button>
                        <Button variant="outlined" sx={{paddingX: 5}}>提交</Button>
                        <FileDownloadOutlinedIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                        <MoreVertSharpIcon onClick={() => {}} fontSize={"medium"} color={"disabled"} sx={{cursor:"pointer"}}/>
                    </div>
                    <div className="drug-lower">
                        <div className="name">耗材成本</div>
                        <SurgeryTime time='术前准备' surgery_type={1}/>
                        <SurgeryTime time='手术中' surgery_type={2}/>
                        <SurgeryTime time='术后复苏' surgery_type={3}/>
                    </div>
                </form>
        </div>
    );
}


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
                <SurgerySelect/>
                <DrugInput/>
            </div>
        </div>
    )
}

export default DocInput;