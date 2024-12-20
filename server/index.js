const express = require('express');
const app = express();
let port = 5000;
const cors = require("cors");
const pool = require("./db")

app.use(cors())
app.use(express.json())

//ROUTES//

// CREATE A POST

app.post("/posts", async(req,res) => {
    try {
        
        const {descripton} = req.body;
        const newPost = await pool.query("INSERT INTO langusers (description) VALUES($1)", [descripton]);
        

        res.json(newPost);
    } 

    catch (err) {
        console.log(err.message);
        
    }
})

// GET A POST

// UPDATE A POST

// DELETE A POST

app.listen(port, ()=> {
    console.log(`server has started on port ${port}`)
})