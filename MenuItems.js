// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const { createClient } = require("@supabase/supabase-js");
// const PORT = process.env.PORT || 3060;
// const cloudinary = require("cloudinary");
// const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
// const supabaseKey = process.env.VITE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);