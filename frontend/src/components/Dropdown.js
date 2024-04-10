import React from 'react'
import Select from 'react-select'

function Dropdown({question,isMulti,options,onChange, value}) {
    return (
        <div className="dropdown">
            <label className="signup-info">{question}</label>
            <Select isMulti={isMulti} value={value} options={options} onChange={onChange}/>
        </div>
    )
}

export default Dropdown;