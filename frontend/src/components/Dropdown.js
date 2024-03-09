import React from 'react'
import Select from 'react-select'

function Dropdown({question,isMulti,options,onChange}) {
    return (
        <div className="dropdown">
            <label className="signup-info">{question}</label>
            <Select isMulti={isMulti} options={options} onChange={onChange}/>
        </div>
    )
}

export default Dropdown;