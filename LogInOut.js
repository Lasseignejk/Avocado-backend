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

app.post("/signup", async (req, res) => {
	const {
		CustomerEmail,
		Password,
		CustomerFirstName,
		CustomerLastName,
		CustomerPhoneNumber,
		Address,
		RestOwner,
	} = req.body;

	await supabase.auth.signUp({
		email: CustomerEmail,
		password: Password,
	});

	if (RestOwner == "false") {
		let { data, error } = await supabase.from("Customer").insert([
			{
				CustomerFirstName: CustomerFirstName,
				CustomerLastName: CustomerLastName,
				CustomerEmail: CustomerEmail,
				CustomerPhoneNumber: CustomerPhoneNumber,
				Address: Address,
			},
		]);
		console.log(data);
		console.log(error);
	} else {
		let { data, error } = await supabase.from("Owner").insert([
			{
				OwnerFirstName: CustomerFirstName,
				OwnerLastName: CustomerLastName,
				OwnerEmail: CustomerEmail,
				OwnerPhoneNumber: CustomerPhoneNumber,
			},
		]);
		console.log(data);
		console.log(error);
	}
});

app.post("/login", async (req, res) => {
	const { CustomerEmail, Password } = req.body;

	let { data, error } = await supabase.auth.signInWithPassword({
		email: CustomerEmail,
		password: Password,
	});

	console.log(data);
	console.log(error);
});

app.post("/logout", async (req, res) => {
	
	let { error } = await supabase.auth.signOut()
	console.log(error)
	});
