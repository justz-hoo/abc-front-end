import React, {useRef, useState} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DrugSelect from "./DrugSelect/DrugSelect";
import InputAdornment from '@mui/material/InputAdornment';
import {createContext} from "react";
import axios from "axios";

const drugSelections = [
    {name: '丙泊酚', state: false},
    {name: '罗库酰胺', state: false},
    {name: '芬太尼', state: false},
    {name: '七氟醚', state: false},
    {name: '氧气', state: false},
    {name: '硫酸镁', state: false}
];

const DrugForm = () => {
    const [categories, setCate] = useState(drugSelections);
    const [drugs, setDrugs] = useState([]);

    //获得子组建的category参数
    function getValue(data) {
        setCate(data);

        // 更新父组件的drugs数据，用于渲染，并设置药品数量为0
        let drugs = [];
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].state === true) {
                let tmp = categories[i];
                tmp["num"] = 0;
                drugs.push(tmp);
            }
        }
        setDrugs(drugs);
    }

    const postSingleDrug = async (drugData) => {
        await axios.post('http://qytzsb2023.frp.freefrps.com/jeecg-boot/anestheticMaterial/add', drugData);
    };


    //TODO：验证数据类型
    const addDrugs = async (e) => {
        e.preventDefault();
        console.log(drugs);
        for (let i = 0; i < drugs.length; i++) {
            let obj = {name: drugs[i].name, inventory: drugs[i].num};
            console.log(obj);
            await postSingleDrug(obj);
        }

        //重新获取界面列表
        window.location.reload();
    }

    const inputDrugNum = (e) => {
        let num = e.target.value;
        let name = e.target.name;
        for (let i = 0; i < drugs.length; i++) {
            if (drugs[i].name === name) {
                let newDrug = drugs[i];
                newDrug.num = parseInt(num);
                setDrugs((prev) => {
                    prev[i] = newDrug;
                    return [...prev];
                });
                break;
            }
        }
    }


    return (
        <div>
            <div className='add-drugs'>
                {/*sendValue给父组件传递参数*/}
                <DrugSelect drugs={drugSelections} sendValue={getValue.bind(this)}/>
                <form onSubmit={(e) => {addDrugs(e)}}>
                    {drugs !== [] && drugs.map((drug, index) => {
                        return(
                            <div className='single-drug'>
                                <span>{drug.name}</span>
                                <TextField
                                    name={drug.name}
                                    onChange={(e) => {inputDrugNum(e)}}
                                    label="数量"
                                    size='small'
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" >ml</InputAdornment>,
                                    }}
                                />
                            </div>
                        )
                    })}
                    <Button type='submit' variant="outlined">提交</Button>
                </form>
            </div>
        </div>
    );
};

export default DrugForm;