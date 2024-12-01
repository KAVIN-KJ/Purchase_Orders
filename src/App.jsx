import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld'
import Inputs from './Inputs'
import Preview from './Preview'

function App() {
  const [customer,setCustomer] = useState("");  
  const [entries, setEntries] = useState([])
  const[taxes,setTaxes] = useState({CGST:9,SGST:9})
  return (
    <>
      <Inputs setTaxes = {setTaxes} setCustomer = {setCustomer}  entries = {entries} setEntries={setEntries} />
      <h1>Preview</h1>
      <Preview setEntries = {setEntries} taxes = {taxes} customer = {customer} entries = {entries} />
    </>
  )
}

export default App
