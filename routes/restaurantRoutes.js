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

// get restaurants by id of admin
router.get("/getrestaurants", async (req, res) => {
	userid = req.headers.userid;
	// console.log(req.get(userId));
	const { data, error } = await supabase
		.from("Restaurant")
		.select()
		.eq("OwnerId", userid);

	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
	}
});

// get a restaurant by restaurant id
router.get("/getonerestaurant", async (req, res) => {
	restid = req.headers.restid;
	const { data, error } = await supabase
		.from("Restaurant")
		.select()
		.eq("id", restid);

	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
	}
});

// get menuitems by restaurant id

router.get("/getmenu", async (req, res) => {
	restid = req.headers.restid;
	const { data, error } = await supabase
		.from("MenuItems")
		.select()
		.eq("RestId", restid);

	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
		console.log(data);
	}
});

// add restaurant
router.post("/addrest", async (req, res) => {
	const {
		RestName,
		RestLocation,
		RestPhoneNumber,
		RestHours,
		RestLogo,
		OwnerId,
	} = req.body;
	let { data, error } = await supabase.from("Restaurant").insert([
		{
			RestName: RestName,
			RestLocation: RestLocation,
			RestPhoneNumber: RestPhoneNumber,
			RestHours: RestHours,
			RestLogo: RestLogo,
			OwnerId: OwnerId,
		},
	]);
	res.send(data);
});

// get all restaurants
router.get("/displayrest", async (req, res) => {
	let { data: Restaurant, error } = await supabase
		.from("Restaurant")
		.select("*");
	console.log(Restaurant);
	console.log(error);
	res.send(Restaurant);
});

module.exports = router;
