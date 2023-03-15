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

router.post("/updateCust", async (req, res) => {
	const {
		id,
		CustomerFirstName,
		CustomerLastName,
		CustomerPhoneNumber,
		WantsNotifications,
		InRewards,
		Address,
	} = req.body;
	const { data, error } = await supabase
		.from("Customer")
		.update({
			CustomerFirstName: CustomerFirstName,
			CustomerLastName: CustomerLastName,
			CustomerPhoneNumber: CustomerPhoneNumber,
			WantsNotifications: WantsNotifications,
			InRewards: InRewards,
			Address: Address,
		})
		.eq("id", id);
	res.send(data);
});

//delete route - Customer
router.delete("/deletecustomer", async (req, res) => {
	id = req.headers.id;
	const { data, error } = await supabase.from("Customer").delete().eq("id", id);
	res.send("ok");
});

router.get("/read", async (req, res) => {
	const {
		id,
		CustomerFirstName,
		CustomerLastName,
		CustomerEmail,
		CustomerPhoneNumber,
	} = req.body;

	const { data, error } = await supabase
		.from("Customer")
		.select(
			id,
			CustomerFirstName,
			CustomerLastName,
			CustomerEmail,
			CustomerPhoneNumber
		);
});

router.get("/displaycustomer", async (req, res) => {
	let { data: Customer, error } = await supabase.from("Customer").select("*");
	res.send(Customer);
});

module.exports = router;
