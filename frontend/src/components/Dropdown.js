import React from 'react'
import Select from 'react-select'

function Dropdown({question,isMulti,options,onChange}) {
    return (
        <div className="dropdown">
            <h3 className="dropdownQuestion">{question}</h3>
            <Select isMulti={isMulti} options={options} onChange={onChange}/>
        </div>
    )
}

export default Dropdown;