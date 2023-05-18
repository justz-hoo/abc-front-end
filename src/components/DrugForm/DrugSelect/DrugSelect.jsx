import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useImperativeHandle} from "react";



const DrugSelect = (props) => {
    const [categories, setCate] = React.useState(props.drugs);
    const childClicked  = (index, e) => {
        let tmp = categories;
        tmp[index].state = e.target.checked;
        setCate((prev) => (tmp));
        // console.log(categories);

        //子组建将categories参数传递给父组件
        props.sendValue(categories);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {categories.map((category, index) => (
                <FormControlLabel
                    index = {index}
                    labelPlacement='start'
                    name={category.name}
                    label={category.name}
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
            {children}
        </div>
    );
};

export default DrugSelect;