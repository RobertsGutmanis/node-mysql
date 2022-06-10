const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const router = express.Router()
require('dotenv').config();
app.use(cors());
app.use(express.json())

const db_con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

router.get('/get', (req, res)=>{
    try{
        querry = "SELECT * FROM users";
        db_con.query(querry, (req, result)=>{
            res.status(200).json({
                "data": result
            })
        })
    }catch(err){
        console.log(err);
    }
})
router.post('/post', (req, res)=>{
    try{
        querry = `INSERT INTO users (name) VALUES ("${req.body.name}")`
        db_con.query(querry, (req, result)=>{
            res.status(200).json({
                "message": "Inserted!"
            })
        })
    }catch(err){
        console.log(err);
    }
})
router.get('/get/:id', (req, res)=>{
    try{
        querry = `SELECT * FROM users WHERE id = ${req.params.id}`;
        db_con.query(querry, (req, result)=>{
            if(result==""){
                res.status(404).json({
                    "message": "Not found!"
                })
            }else{
                res.status(200).json({
                    "message": result
                })
            }
        })
    }catch(err){
        console.log(err)
    }
})
router.put('/update/:id', (req, res)=>{
    try{
        querry = `UPDATE users SET name="${req.body.name}" WHERE id=${req.params.id}`
        db_con.query(querry, (req, result)=>{
            res.status(200).json({
                "message": "Updated!"
            })
        })
    }catch(err){
        console.log(err)
    }
})
router.delete('/delete/:id', (req, res)=>{
    try{
        querry = `DELETE FROM users WHERE id = ${req.params.id}`
        db_con.query(querry, (req, result)=>{
            res.status(200).json({
                "message": "Deleted!"
            })
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = router;