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

app.post("/update", async (req, res) => {
	const { OwnerEmail, OwnerFirstName, OwnerLastName, OwnerPhoneNumber } =
		req.body;

	const { data, error } = await supabase
		.from("Owner")
		.update({
			OwnerFirstName: OwnerFirstName,
			OwnerLastName: OwnerLastName,
			OwnerEmail: OwnerEmail,
			OwnerPhoneNumber: OwnerPhoneNumber,
		})
		.eq(OwnerEmail, OwnerFirstName, OwnerLastName, OwnerPhoneNumber);
});

app.post("/read", async (req, res) => {
	const { id, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber } =
		req.body;

	const { data, error } = await supabase
		.from("Owner")
		.select(id, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber);
});