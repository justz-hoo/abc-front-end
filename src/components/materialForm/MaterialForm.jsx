import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import DrugSelect from "../DrugForm/DrugSelect/DrugSelect";
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
import MaterialSelect from "./materialSelect/MaterialSelect";



const MaterialForm = props => {
    const materialSelections = [
        {name: '纱布', state: false, specification: '个'},
        {name: '纱垫', state: false, specification: '个'},
        {name: '纱条', state: false, specification: '个'},
        {name: '棉球', state: false, specification: '个'},
        {name: '棉棒', state: false, specification: '个'},
        {name: '棉片', state: false, specification: '个'},
        {name: '缝针', state: false, specification: '个'},
        {name: '带线针', state: false, specification: '个'},
        {name: '刀片', state: false, specification: '个'},
        {name: '线圈', state: false, specification: '个'},
        {name: '注射器（副）', state: false, specification: '副'},
        {name: '电刀头', state: false, specification: '个'},
        {name: '持针器', state: false, specification: '个'},
        {name: '组织钳', state: false, specification: '个'},
        {name: '中直钳', state: false, specification: '个'},
        {name: '中弯钳', state: false, specification: '个'},
        {name: '密脱氏钳', state: false, specification: '个'},
        {name: '小弯钳', state: false, specification: '个'},
        {name: '蚊氏钳', state: false, specification: '个'},
        {name: '布巾钳', state: false, specification: '个'},
        {name: '吸引器头', state: false, specification: '个'},
        {name: '刀柄', state: false, specification: '个'},
        {name: '剪刀', state: false, specification: '个'},
        {name: '镊子', state: false, specification: '个'},
        {name: '拉钩', state: false, specification: '个'},
        {name: '压肠板', state: false, specification: '个'},
        {name: '卵圆钳', state: false, specification: '个'},
        {name: '产钳', state: false, specification: '个'},
        {name: '阑尾钳', state: false, specification: '个'},
        {name: '肛门镜', state: false, specification: '个'},
        {name: '肛痿探针', state: false, specification: '个'},
        {name: '刮宫包/件', state: false, specification: '件'},
        {name: '内镜器械/件', state: false, specification: '件'},
        {name: '专科类器械/件', state: false, specification: '件'},
        {name: '胆加包器械/件', state: false, specification: '件'},
        {name: '脾加包器械/件', state: false, specification: '件'},
        {name: '胸加包器械/件', state: false, specification: '件'},
        {name: '骨加包器械/件', state: false, specification: '件'},
        {name: '颈腰椎器械/件', state: false, specification: '件'},
        {name: '腹撑螺丝', state: false, specification: '个'},
        {name: '胃钳螺丝', state: false, specification: '个'},
        {name: '肠钳/副', state: false, specification: '个'},
        {name: '大弯血管钳', state: false, specification: '个'},
        {name: '荷包钳', state: false, specification: '个'},
        {name: '无菌手套', state: false, specification: '个'},
        {name: '手术衣', state: false, specification: '个'},
        {name: '口罩', state: false, specification: '个'},
        {name: '帽子', state: false, specification: '个'},
        {name: '鞋套', state: false, specification: '个'},
    ];

    const [categories, setCate] = useState(materialSelections);
    const [materials, setMaterial] = useState([]);
    // 调用子组建中的setCate方法更新参数
    const selectRef = createRef();

    //获得子组建的category参数
    function getValue(data) {
        setCate(data); // 更新父组件的drugs数据，用于渲染，并设置药品数量为0

        // TODO: useState异步更新，category有可能无法拿到指定参数，所以使用了useEffect的方法
        let materials = [];
        console.log('categories', categories);
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].state === true) {
                let tmp = categories[i];
                tmp["num"] = 0;
                materials.push(tmp);
            }
        }
        setMaterial(materials);
        console.log('materials', materials);
    }

    const postSingleDrug = async (drugData) => {
        await axios.post('http://qytzsb2023.frp.freefrps.com/jeecg-boot/noChargeForSanitaryMaterials/add', drugData);
    };


    //TODO：验证数据类型
    const addDrugs = async (e) => {
        e.preventDefault();
        console.log(materials);
        for (let i = 0; i < materials.length; i++) {
            let obj = {name: materials[i].name, inventory: materials[i].num, specification: materials[i].specification};
            console.log(obj);
            await postSingleDrug(obj);
        }

        //重新获取界面列表
        setMaterial([]);
        props.reloadDrugs();
        // 调用子组建的方法清空选择框
        selectRef.current.updateCate(materialSelections);
        setCate(materialSelections);
    };


    // useState异步函数的原因，及时更新categories的值
    useEffect(() => {
        console.log(categories);
    }, [categories])

    const inputDrugNum = (e) => {
        let num = e.target.value;
        let name = e.target.name;
        for (let i = 0; i < materials.length; i++) {
            if (materials[i].name === name) {
                let newMaterial = materials[i];
                newMaterial.num = parseInt(num);
                setMaterial((prev) => {
                    prev[i] = newMaterial;
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
                <MaterialSelect drugs={materialSelections} sendValue={getValue.bind(this)} onRef={selectRef}/>
                <form onSubmit={(e) => {addDrugs(e)}}>
                    {materials && materials.map((material, index) => {
                        return(
                            <div className='single-drug'>
                                <span>{material.name}</span>
                                <TextField
                                    name={material.name}
                                    onChange={(e) => {inputDrugNum(e)}}
                                    label="数量"
                                    size='small'
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" >{material.specification}</InputAdornment>,
                                    }}
                                />
                            </div>
                        )
                    })}
                    {materials && materials.length > 0 && <Button type='submit' variant="outlined">提交</Button>}
                </form>
            </div>
        </div>
    );
};

export default MaterialForm;