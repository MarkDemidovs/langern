const express = require('express');
const app = express();
let port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const client = require('./db'); // Import the client from db.js

//ROUTES//

// CREATE A POST
app.post("/posts", async (req, res) => {
    const { description, title, tags } = req.body;

    try {
        const tagsArray = Array.isArray(tags) ? tags : [];

        const query = `INSERT INTO posts (title, text, tags) VALUES ($1, $2, $3) RETURNING *`;
        const values = [title, description, tagsArray];

        client.query(query, values, (err, result) => {
            if (!err) {
                console.log(result.rows);
                console.log(`The following description has been inserted: ${description}`);
                res.json(result.rows[0]);
            } else {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

app.get("/posts", async(req,res) => {
    try {
        client.query("Select * from public.posts",(err, res)=>{
            if(!err) {
                console.log(res.rows);

                return res.rows;
            }
            else {
                console.log(err.message)
            }
            client.end;
        })
        
    } catch (err) {
        console.log(err);
        
    }
})
// GET A POST

// UPDATE A POST

// DELETE A POST

app.listen(port, ()=> {
    console.log(`server has started on port ${port}`)
})