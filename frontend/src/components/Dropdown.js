import React from 'react'
import Select from 'react-select'

const options = [
    {label: 'test', value: 'test'},
    {label: 'Jonathan', value: 'Johnathan'},
    {label: 'Jack', value: 'Jack'},
    {label: 'Ryan', value: 'Ryan'}
]

function Dropdown(props, isMulti) {
    return (
        <div>
            <p>Question:</p>
            <Select isMulti={isMulti} options={options}/>
            <p></p>
        </div>
    )
}

export default Dropdown;