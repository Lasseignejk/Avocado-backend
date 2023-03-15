const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const PORT = process.env.PORT || 3060;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/admin/restaurant", restaurantRoutes);
app.use("/order", orderRoutes);

//signup route

app.post("/addtomenu", async (req, res) => {
	const {
		ItemName,
		ItemPrice,
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
});

app.get("/displaymenu", async (req, res) => {
	let { data: MenuItems, error } = await supabase.from("MenuItems").select("*");

	res.send(MenuItems);
});

app.get("/displayorder", async (req, res) => {
	let { data: Order, error } = await supabase.from("Order").select("*");

	res.send(Order);
});
app.get("/displayorderitem", async (req, res) => {
	let { data: Order, error } = await supabase.from("OrderItem").select("*");

	res.send(Order);
});

app.use((req, res) => {
	res.send("Hello World");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
