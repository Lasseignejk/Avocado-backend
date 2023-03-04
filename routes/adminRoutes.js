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

router.get("/managerestaurants", async (req, res) => {
	const { data, error } = await supabase
		.from("Restaurant")
		.select()
		.eq("OwnerId", 1);

	if (error) {
		res.send(error);
	}
	if (data) {
		console.log(data);
		res.send(data);
	}
});

router.post("/update", async (req, res) => {
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

router.post("/read", async (req, res) => {
	const { id, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber } =
		req.body;

	const { data, error } = await supabase
		.from("Owner")
		.select(id, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber);
});

//delete route - Owner
router.post("/delete", async (req, res) => {
	const { id, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber } =
		req.body;

	const { data, error } = await supabase
		.from("Customer")
		.delete({
			id: id,
			OwnerFirstName: OwnerFirstName,
			OwnerLastName: OwnerLastName,
			OwnerEmail: OwnerEmail,
			OwnerPhoneNumber: OwnerPhoneNumber,
		})
		.eq(OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhoneNumber);
});

router.get("/displayowner", async (req, res) => {
	let { data: Owner, error } = await supabase.from("Owner").select("*");
	console.log(Owner);
	console.log(error);
	res.send(Owner);
});

module.exports = router;
