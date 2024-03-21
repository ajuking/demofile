const express=require ('express')
const mysql =require('mysql')
const cors =require('cors')
const bodyParser = require('body-parser')

const app=express()
app.use(cors());
app.use(express.json());

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Arjun"
})

app.post('/signup',(req,res)=>{
    const sql="insert into signin(Name,Email,Pass)values('"+req.body.state.username+"','"+req.body.state.email+"','"+req.body.state.password+"')";
   
   
    con.query(sql,(err,data)=>
    {  
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/delete',(req,res)=>{
    const sql="delete from signin where Email='"+req.body.state.email+"'";
   
   
    con.query(sql,(err,data)=>
    {  
        if(err) return res.json(err);
        return res.json(data);
    })
})



app.get('/display',(req,res)=>{
    const sql="select* from signin"


    con.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})




app.get('/up:Email',(req,res)=>
{
    const Email=req.params.Email;
    console.log(Email)
const sql3="select * from signin where Email='"+Email+"'";

con.query(sql3,(err,data)=>
{  
    if(err) return res.json(err);
    return res.json(data);
    
})
})

app.post('/tabledel/:Email',(req,res)=>
{
    const id=req.params.EMAIL;
    console.log(id);
    const sql1="delete from signin where Email='"+id+"'";
    console.log(sql1)

    con.query(sql1,(err,data)=>
{  
    if(err) return res.json(err);
    return res.json(data);
})
}

)

app.put('/update',(req1,res)=>{
   
    const sql5="update signin set Name='"+req1.body.newvalue.Name+"',Pass='"+req1.body.newvalue.Pass+"' where Email='"+req1.body.newvalue.Email+"'";
    
    console.log(sql5)
 con.query(sql5,(err,data)=>
 {  
     if(err) return res.json(err);
     console.log(data)
     return res.json(data);
 })
 }
 )
 

app.listen(8080,()=>{console.log("working...")})

