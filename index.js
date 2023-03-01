const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const PORT = process.env.PORT || 3060;
const cloudinary = require("cloudinary");
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.co";
const supabaseKey = process.env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();
app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
//signup route
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
//rest information route
app.post("/addrest", async (req, res) => {
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
	console.log(data);
	console.log(error);
});
//update routes - Owner
app.post("/updateO", async (req, res) => {
	const {
		CustomerEmail,
		CustomerFirstName,
		CustomerLastName,
		CustomerPhoneNumber,
	} = req.body;
	const { data, error } = await supabase
		.from("Owner")
		.update({
			id: CustomerFirstName,
			OwnerLastName: CustomerLastName,
			OwnerEmail: CustomerEmail,
			OwnerPhoneNumber: CustomerPhoneNumber,
		})
		.eq(
			id,
			CustomerFirstName,
			OwnerLastName,
			CustomerLastName,
			OwnerEmail,
			CustomerEmail,
			OwnerPhoneNumber,
			CustomerPhoneNumber
		);
});
//update routes - Customer
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
			CustomerFirstName: CustomerFirstName,
			CustomerLastName: CustomerLastName,
			CustomerEmail: CustomerEmail,
			CustomerPhoneNumber: CustomerPhoneNumber,
		})
		.eq([
			(CustomerFirstName, CustomerFirstName),
			(CustomerLastName, CustomerLastName),
			(CustomerEmail, CustomerEmail),
			(CustomerPhoneNumber, CustomerPhoneNumber),
		]);
});
app.post("/addtomenu", async (req, res) => {
	const {
		ItemName,
		ItemPrice,
		RestPhoneNumber,
		ItemDescription,
		ItemImg,
		ItemBreakfast,
		ItemLunch,
		ItemDinner,
		ItemType,
		ItemAvailable,
		ItemIsPopular,
		ItemCookTime,
	} = req.body;
	let { data, error } = await supabase.from("MenuItems").insert([
		{
			ItemName: ItemName,
			ItemPrice: ItemPrice,
			RestPhoneNumber: RestPhoneNumber,
			ItemDescription: ItemDescription,
			ItemImg: ItemImg,
			ItemBreakfast: ItemBreakfast,
			ItemLunch: ItemLunch,
			ItemDinner: ItemDinner,
			ItemType: ItemType,
			ItemAvailable: ItemAvailable,
			ItemIsPopular: ItemIsPopular,
			ItemCookTime: ItemCookTime,
		},
	]);
	console.log(data);
	console.log(error);
});
app.post("/updatemenu", async (req, res) => {
	const {
		ItemName,
		ItemPrice,
		RestPhoneNumber,
		ItemDescription,
		ItemImg,
		ItemBreakfast,
		ItemLunch,
		ItemDinner,
		ItemType,
		ItemAvailable,
		ItemIsPopular,
		ItemCookTime,
	} = req.body;
	const { data, error } = await supabase
		.from("MenuItems")
		.update({
			ItemName: ItemName,
			ItemPrice: ItemPrice,
			RestPhoneNumber: RestPhoneNumber,
			ItemDescription: ItemDescription,
			ItemImg: ItemImg,
			ItemBreakfast: ItemBreakfast,
			ItemLunch: ItemLunch,
			ItemDinner: ItemDinner,
			ItemType: ItemType,
			ItemAvailable: ItemAvailable,
			ItemIsPopular: ItemIsPopular,
			ItemCookTime: ItemCookTime,
		})
		.eq([
			(ItemName, ItemName),
			(ItemPrice, ItemPrice),
			(RestPhoneNumber, RestPhoneNumber),
			(ItemDescription, ItemDescription),
			(ItemImg, ItemImg),
			(ItemBreakfast, ItemBreakfast),
			(ItemLunch, ItemLunch),
			(ItemDinner, ItemDinner),
			(ItemType, ItemType),
			(ItemAvailable, ItemAvailable),
			(ItemIsPopular, ItemIsPopular),
			(ItemCookTime, ItemCookTime),
		]);
	console.log(data);
	console.log(error);
});
app.get("/displaymenu", async (req, res) => {
	let { data: MenuItems, error } = await supabase.from("MenuItems").select("*");
	console.log(MenuItems);
	console.log(error);
	res.send(MenuItems);
});
app.get("/displayrest", async (req, res) => {
	let { data: Restaurant, error } = await supabase
		.from("Restaurant")
		.select("*");
	console.log(Restaurant);
	console.log(error);
	res.send(Restaurant);
});
app.get("/displayowner", async (req, res) => {
	let { data: Owner, error } = await supabase.from("Owner").select("*");
	console.log(Owner);
	console.log(error);
	res.send(Owner);
});
app.get("/displaycustomer", async (req, res) => {
	let { data: Customer, error } = await supabase.from("Customer").select("*");
	console.log(Customer);
	console.log(error);
	res.send(Customer);
});
app.get("/displayorder", async (req, res) => {
	let { data: Order, error } = await supabase.from("Order").select("*");
	console.log(Order);
	console.log(error);
	res.send(Order);
});
app.get("/displayorderitem", async (req, res) => {
	let { data: Order, error } = await supabase.from("OrderItem").select("*");
	console.log(Order);
	console.log(error);
	res.send(Order);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
