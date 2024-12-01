const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()


const PORT = 5001;


app.get('/',(req,res)=>{
    res.send('Server is running good !');
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
})