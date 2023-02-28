const express = require("express");
const cors = require("cors");
const products = require("./products");
import { createClient } from "@supabase/supabase-js";
const PORT = process.env.PORT || 3060;
const cloudinary = require("cloudinary");
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey = import.meta.env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  let { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
