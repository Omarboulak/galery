import React from "react";
import { useState } from "react";

function Select({ setOrder }) {

    return (
        <select
            onChange={e => setOrder(e.target.value)}
        >
            <option value="">Ordenar por</option>
            <option value="height">height</option>
            <option value="width">width</option>
            <option value="likes">likes</option>
            <option value="date">date</option>
        </select>
    )
}

export default Select;