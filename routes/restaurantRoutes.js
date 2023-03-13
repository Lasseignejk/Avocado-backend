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

// update a restaurant's information
router.post("/updaterestaurant", async (req, res) => {
	const { RestName, RestLocation, RestPhoneNumber, RestHours, RestLogo, id } =
		req.body;
	const { error } = await supabase
		.from("Restaurant")
		.update({
			RestName: RestName,
			RestPhoneNumber: RestPhoneNumber,
			RestLocation: RestLocation,
			RestHours: RestHours,
			RestLogo: RestLogo,
		})
		.eq("id", id);
	if (error) {
		console.log(error);
		res.send(error);
	}
	res.send("ok");
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

// delete restaurant
router.delete("/deleterestaurant", async (req, res) => {
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
	}
});

router.get("/getOrders", async (req, res) => {
	restaurantId = req.headers.restaurantId;
	const { data, error } = await supabase
		.from("Order")
		.select()
		.eq("RestaurantId", restaurantId);

	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
		console.log(data);
	}
});
router.get("/getOrderItems", async (req, res) => {
	OrderId = req.headers.OrderId;
	const { data, error } = await supabase
		.from("OrderItem")
		.select()
		.eq("OrderId", OrderId);

	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
		console.log(data);
	}
});

// add menu item
router.post("/addtomenu", async (req, res) => {
	const {
		ItemName,
		ItemType,
		ItemPrice,
		ItemDescription,
		ItemBreakfast,
		ItemLunch,
		ItemDinner,
		ItemIsPopular,
		ItemAvailable,
		ItemCookTime,
		ItemImg,
		RestId,
	} = req.body;
	let { data, error } = await supabase.from("MenuItems").insert([
		{
			ItemName: ItemName,
			ItemType: ItemType,
			ItemPrice: ItemPrice,
			ItemDescription: ItemDescription,
			ItemBreakfast: ItemBreakfast,
			ItemLunch: ItemLunch,
			ItemDinner: ItemDinner,
			ItemIsPopular: ItemIsPopular,
			ItemAvailable: ItemAvailable,
			ItemCookTime: ItemCookTime,
			ItemImg: ItemImg,
			RestId: RestId,
		},
	]);
	res.send(data);
	console.log("req.body: ", req.body);
});

// Update menu item by id
router.post("/updatemenuitem", async (req, res) => {
	const {
		ItemName,
		ItemType,
		ItemPrice,
		ItemDescription,
		ItemBreakfast,
		ItemLunch,
		ItemDinner,
		ItemIsPopular,
		ItemAvailable,
		ItemCookTime,
		ItemImg,
		id,
	} = req.body;
	const { error } = await supabase
		.from("MenuItems")
		.update({
			ItemName: ItemName,
			ItemType: ItemType,
			ItemPrice: ItemPrice,
			ItemDescription: ItemDescription,
			ItemBreakfast: ItemBreakfast,
			ItemLunch: ItemLunch,
			ItemDinner: ItemDinner,
			ItemIsPopular: ItemIsPopular,
			ItemAvailable: ItemAvailable,
			ItemCookTime: ItemCookTime,
			ItemImg: ItemImg,
		})
		.eq("id", id);
	if (error) {
		console.log(error);
		res.send(error);
	}
	res.send("ok");
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
