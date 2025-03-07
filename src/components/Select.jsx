import React from "react";

function Select({ setOrder }) {
    const options = [
        {value: '', label: 'Ordenar mayor que...'},
        {value: 'width', label: 'Width'},
        {value: 'height', label: 'Height'},
        {value: 'likes', label: 'Likes'},
        {value: 'date', label: 'Date'}]

    return (
        <div className="select_container">
            <select onChange={e => setOrder(e.target.value)}>
                {options.map(option => {
                    return <option value={option.value}>{option.label}</option>
                })
                }
            </select>
        </div>
    )
}

export default Select;