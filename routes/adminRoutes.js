const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
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

router.post("/updateAdmin", async (req, res) => {
	const { OwnerFirstName, OwnerLastName, OwnerPhoneNumber, id } = req.body;

	const { data, error } = await supabase
		.from("Owner")
		.update({
			OwnerFirstName: OwnerFirstName,
			OwnerLastName: OwnerLastName,
			OwnerPhoneNumber: OwnerPhoneNumber,
		})
		.eq("id", id);
	res.send(data);
});

// delete admin
router.delete("/deleteadmin", async (req, res) => {
	restid = req.headers.restid;
	const { data, error } = await supabase
		.from("MenuItems")
		.delete()
		.eq("RestId", restid);

	const { data: restData, error: restError } = await supabase
		.from("Restaurant")
		.delete()
		.eq("id", restid);
});

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
