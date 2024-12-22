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

// GET ALL POSTS
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
app.get("/posts/:id", async (req, res) => {
    try {
        client.query("SELECT * FROM posts WHERE id = $1", [req.params.id], (err, result) => {
            if (!err) {
                console.log(result.rows);
                res.json(result.rows[0]); // Send the first row as JSON response
            } else {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// UPDATE A POST
app.put("/posts/:id", async (req, res) => {
    const { description, title, tags } = req.body;

    try {
        client.query("UPDATE posts SET title = $1, text = $2, tags = $3 WHERE id = $4 RETURNING *", [title, description, tags, req.params.id], (err, result) => {
            if (!err) {
                console.log(result.rows);
                res.json(result.rows[0]);
            } else {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        });
    } catch (err) {
        console.log(err) 
    }
})
// DELETE A POST

app.listen(port, ()=> {
    console.log(`server has started on port ${port}`)
})