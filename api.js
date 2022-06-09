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
    querry = "SELECT * FROM users";
    db_con.query(querry, (req, result)=>{
        res.status(200).json({
            "data": result
        })
    })
})
router.post('/post', (req, res)=>{
    querry = `INSERT INTO users (name) VALUES ("${req.body.name}")`
    db_con.query(querry, (req, result)=>{
        res.status(200).json({
            "message": "Inserted!"
        })
    })
})
router.get('/get/:id', (req, res)=>{
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
})
router.put('/update/:id', (req, res)=>{
    querry = `UPDATE users SET name="${req.body.name}" WHERE id=${req.params.id}`
    db_con.query(querry, (req, result)=>{
        res.status(200).json({
            "message": "Updated!"
        })
    })
})
router.delete('/delete/:id', (req, res)=>{
    querry = `DELETE FROM users WHERE id = ${req.params.id}`
    db_con.query(querry, (req, result)=>{
        res.status(200).json({
            "message": "Deleted!"
        })
    })
})

module.exports = router;