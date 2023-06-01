import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {forwardRef, useImperativeHandle} from "react";

const SurgerySelect = (props) => {
    useImperativeHandle(props.cRef, () => {
        return {
            getType: selectedOption
        }
    })

    const options = [
        { value: '1', label: '一类切口手术' },
        { value: '2', label: '二类切口手术' },
        { value: '3', label: '血管类手术' },
        { value: '4', label: '百级尘埃手术' }
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className='select'>
            <div className="surgery-options">
                <Select
                    className="react-select-container"
                    defaultValue={selectedOption}
                    onChange={(e) => setSelectedOption(e)}
                    options={options}
                    classNamePrefix='surgery-select'
                />
            </div>
        </div>
    );
}
export default forwardRef(SurgerySelect);