import React from 'react'
import './styles/Inputs.css'
import { useState } from 'react';
const Inputs = (props) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear()
    localStorage.setItem("date", day + " : " + month + " : " + year)
    localStorage.setItem("Purchase-orders", 100);
    const [desc, setDesc] = useState("");
    const [qty, setqty] = useState(0);
    const [uom, setUom] = useState("Nos");
    const [rate, setRate] = useState(0);
    const [cgst, setCgst] = useState(9);
    const [sgst, setSgst] = useState(9);
    const [disc,setDisc] = useState(0);
    const handleSubmit = () => {
        if (desc == null || desc == "") {
            alert("Empty Entry not allowed")
        }
        else {
            const obj = {
                desc: desc,
                qty: qty,
                uom: uom,
                rate: rate,
                net:  (qty * rate) - (qty*rate*disc/100),
                CGST: cgst,
                SGST: sgst,
                disc: disc
            }
            props.setEntries([...props.entries, obj])
            console.log(props.entries)
            localStorage.setItem("entries", JSON.stringify(props.entries))
        }
    }

    return (

        <div className='inputs-container'>
            <h2>Customer Details</h2>
            <div className='customer-container'>
                <div className='customer-name'>
                    <label>Customer Name</label>
                    <textarea onChange={(e) => { props.setCustomer(e.target.value) }} className='customer-name' type='text' placeholder='To' name='customer' />
                </div>
                <div className='customer-name'>
                    <label>Place</label>
                    <textarea onChange={(e) => { props.setPlace(e.target.value) }} className='customer-name' type='text' placeholder='To' name='customer' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label>Purchase Order No : </label>
                    <input onChange={(e) => { localStorage.setItem("Purchase-order", e.target.value) }} type="number" defaultValue={localStorage.getItem("Purchase-order")} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label onChange={(e) => { localStorage.setItem("date", e.target.value) }}>Date :</label>
                    <input type="text" defaultValue={day + " : " + month + " : " + year} onChange={(e) => { localStorage.setItem("date", e.target.value) }} />
                </div>
                <div className='entry'>
                    <label>Net Discount %</label>
                    <input defaultValue={0} onChange={(e) => { props.setDiscount(e.target.value) }} type='number' placeholder='Net Discount' />
                </div>
                <div className='entry'>
                    <label>Packing and Forwarding</label>
                    <input defaultValue={0} onChange={(e) => { props.setPf(e.target.value) }} type='number' placeholder='Packing & Forwarding' />
                </div>
                <div className='entry'>
                    <label>Transport</label>
                    <input onChange={(e) => { props.setTransport(e.target.value) }} type='text' placeholder='Transport' />
                </div>
            </div>
            <div className='entry-container'>
                <div className='entry'>
                    <label>Item Description</label>
                    <input onChange={(e) => { setDesc(e.target.value) }} type='text' placeholder='Description' />
                </div>
                <div className='entry'>
                    <label>Quantity</label>
                    <input onChange={(e) => { setqty(e.target.value) }} type='number' placeholder='Quantity' />
                </div>
                <div className='entry'>
                    <label>Unit of Measurement</label>
                    <input defaultValue={"Nos"} onChange={(e) => { setUom(e.target.value) }} type='text' placeholder='UOM' />
                </div>
                <div className='entry'>
                    <label>Rate</label>
                    <input onChange={(e) => { setRate(e.target.value) }} type='number' placeholder='Rate' />
                </div>
                <div className='entry'>
                    <label>CGST</label>
                    <input defaultValue={9} onChange={(e) => { props.setTaxes((prevTaxes) => ({ ...prevTaxes, CGST: e.target.value })) }} type='number' placeholder='CGST' />
                </div>
                <div className='entry'>
                    <label>SGST</label>
                    <input defaultValue={9} onChange={(e) => { props.setTaxes((prevTaxes) => ({ ...prevTaxes, SGST: e.target.value })) }} type='number' placeholder='SGST' />
                </div>
                <div className="entry">
                <label>Discount</label>
                <input onChange={(e) => { setDisc(e.target.value) }} type='number' placeholder='Discount' />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Inputs
