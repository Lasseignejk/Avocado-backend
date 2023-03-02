const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const cloudinary = require("cloudinary");
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey = process.env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// MIDDLEWARE
router.use(cors());
router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
router.use(bodyParser.json());

router.post("/login", async (req, res) => {
	const { CustomerEmail, Password } = req.body;

	let { data, error } = await supabase.auth.signInWithPassword({
		email: CustomerEmail,
		password: Password,
	});

	console.log(data);
	console.log(error);
});

router.post("/logout", async (req, res) => {
	let { error } = await supabase.auth.signOut();
	console.log(error);
});

router.post("/signup", async (req, res) => {
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

module.exports = router;
