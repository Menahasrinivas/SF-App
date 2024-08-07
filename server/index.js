const express =require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());

const port = 8000;

app.use(
              cors({
              origin: "http://localhost:5173",
              methods: ["GET", "POST", "PATCH", "DELETE"],
              })
);

app.get("/users", (req, res) => {
              return res.json(users);
});
//Delete User Detail
app.delete("/users/:id", (req, res) => {
let id = Number(req.params.id);
let filteredUsers=users.filter((user)=>user.id !==id);
fs.writeFile("./sample.json",JSON.stringify
              (filteredUsers), (err, data) => {
                            return res.json(filteredUsers);
              });


});

//Add New User

app.post("/user/:id",(req,res) => {
              let{name,age,city } = req.body;
              if(!name || !age || !city){
                            res.status(400).send({ message: "All Fields Required"});
              }
              let id = Date.now();
              users.push({ id, name, age, city });

              fs.writeFile("./sample.json",JSON.stringify
                            (filteredUsers), (err, data) => {
 return res.json({"message": "User Details Added Successfully" });

});
});

// Update User

app.patch("/user/:id",(req,res) => {
              let id = Number(req.params.id);
              let{ name, age, city } = req.body;
              if(!name || !age || !city){
                            res.status(400).send({ message: "All Fields Required"});
              }
              let index=users.findIndex((user)=> user.id == id);
              users.splice(index, 1, {...req.body});
              
              fs.writeFile("./sample.json",JSON.stringify
                            (users), (err, data) => {
 return res.json({"message": "User Details Updated Successfully" });

});
});

app.listen(port, (err) => {
console.log(`App is running in port ${port}`); 

});