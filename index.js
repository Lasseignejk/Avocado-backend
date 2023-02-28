const express = require('express');
const cors = require('cors');
const products = require('./products');
import { createClient } from "@supabase/supabase-js";
const PORT = process.env.PORT || 3060;
const cloudinary = require('cloudinary')
const supabaseUrl = 'https://dwjnomervswgqasgexck.supabase.co'
const supabaseKey = import.meta.env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
 let { data, error } = await supabase.auth.signUp({
  email: req.body.email,
  password: req.body.password,
})



console.log(error)
    if(data){
      res.send(data)
      return
    } else {
      res.send("Error signing up")
    }
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const {user, error} = await supabase.auth.signInWithPassword({ 
      email: req.body.email,
      password: req.body.password,  
     })
    console.log(error)
    
    if(user.data){
      res.render("pages/signedin")
      return
    }}
   catch (error) {

      res.status(400).send(error)

  }})

app.listen(PORT, console.log(`Server started on port ${PORT}`));