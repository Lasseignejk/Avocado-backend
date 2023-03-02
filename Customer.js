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
	const {
		CustomerEmail,
		CustomerFirstName,
		CustomerLastName,
		CustomerPhoneNumber,
	} = req.body;

	const { data, error } = await supabase
		.from("Customer")
		.update({
			id: CustomerFirstName,
			CustomerLastName: CustomerLastName,
			CustomerEmail: CustomerEmail,
			CustomerPhoneNumber: CustomerPhoneNumber,
		})
		.eq(
			CustomerFirstName,
			CustomerLastName,
			CustomerEmail,
			CustomerPhoneNumber
		);
});

//delete route - Customer
app.post("/deletecust", async (req, res) => {
	const {
		id,
		CustomerFirstName,
		CustomerLastName,
		CustomerEmail,
		CustomerPhoneNumber,
	} = req.body;

	const { data, error } = await supabase
		.from("Customer")
		.delete({
			id: id,
			CustomerFirstName: CustomerFirstName,
			CustomerLastName: CustomerLastName,
			CustomerEmail: CustomerEmail,
			CustomerPhoneNumber: CustomerPhoneNumber,
		})
		.eq(
			id,
			CustomerFirstName,
			CustomerLastName,
			CustomerEmail,
			CustomerPhoneNumber
		);
});

app.get("/readcust", async (req, res) => {
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