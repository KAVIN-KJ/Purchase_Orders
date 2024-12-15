import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld'
import Inputs from './Inputs'
import Preview from './Preview'

function App() {
  const [customer,setCustomer] = useState("---");  
  const [entries, setEntries] = useState([])
  const [place,setPlace] = useState("COIMBATORE");
  const[taxes,setTaxes] = useState({CGST:9,SGST:9})
  const [discount, setDiscount] = useState(0);
  const [pf,setPf] = useState(0);
  const [transport,setTransport] = useState("");
  return (
    <>
    <div className='app-container'>
      <Inputs setTransport = {setTransport} setPf = {setPf} setDiscount={setDiscount} setPlace = {setPlace} setTaxes = {setTaxes} setCustomer = {setCustomer}  entries = {entries} setEntries={setEntries} />
      <Preview transport = {transport} pf = {pf} place = {place} discount = {discount} setEntries = {setEntries} taxes = {taxes} customer = {customer} entries = {entries} />
    </div>
    </>
  )
}

export default App
