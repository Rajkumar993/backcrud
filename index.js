const express=require('express');
const mysql=require('mysql');
const app=express();
const cors=require('cors');
require('dotenv').config()
app.use(express.json());
app.use(cors({
    origin:"https://crudusers123.netlify.app"
}))

const db=mysql.createConnection({
    host:process.env.MYSQL_ADDON_HOST,
    user:process.env.MYSQL_ADDON_USER,
    password:process.env.MYSQL_ADDON_PASSWORD,
    database:process.env.MYSQL_ADDON_DB
})
db.connect((err)=>{
    if(err) console.log(err);
    else console.log("database connected successfully")
})
app.put('/updateuser/:id',(req,res)=>{
    const id=req.params.id;
    const{name,email,company}=req.body.formData;
    const q=`update addUser set name=?,email=?,company=? where id=?`;

    db.query(q,[name,email,company,id],(err,data)=>{
        if(err) res.status(500).json(err);
        res.status(200).json(data)

    })
})
app.delete('/deleteuser/:id',(req,res)=>{
    const id=req.params.id;
    const q=`Delete from addUser where id=?`;
    db.query(q,[id],(err,data)=>{
        if(err) res.status(500).json(err);
        res.status(200).json(data)
    })
})
app.post('/adduser',(req,res)=>{
    const{name,email,company}=req.body.formData;
    const q=`insert into addUser(name,email,company) values(?,?,?)`;
    db.query(q,[name,email,company],(err,data)=>{
        if(err) res.status(500).json(err);

        res.json(data)
    })
})
app.get('/getusers',(req,res)=>{
    const q=`select * from addUser`;
    db.query(q,(err,data)=>{
        if(err) res.status(500).json(err);

        res.json(data)
    })
})
 let PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("app listening at PORT:"+PORT)
})