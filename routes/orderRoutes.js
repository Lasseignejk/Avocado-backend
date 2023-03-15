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

// submit order
router.post("/sendorder", async (req, res) => {
	const {
		CustomerId,
		RestaurantId,
		OrderTotal,
		OrderComplete,
		IsPickup,
		IsDelivery,
		TotalItems,
		Notes,
	} = req.body;
	let { data, error } = await supabase.from("Order").insert({
		CustomerId: CustomerId,
		RestaurantId: RestaurantId,
		OrderTotal: OrderTotal,
		OrderComplete: OrderComplete,
		IsPickup: IsPickup,
		IsDelivery: IsDelivery,
		TotalItems: TotalItems,
		Notes: Notes,
	});
	res.send(data);
});

// submit order
router.post("/sendorderitems", async (req, res) => {
	const { MenuItemId, OrderId, ItemQuantity, MenuItemName } = req.body;
	let { data, error } = await supabase.from("OrderItem").insert({
		MenuItemId: MenuItemId,
		OrderId: OrderId,
		ItemQuantity: ItemQuantity,
		MenuItemName: MenuItemName,
	});
	if (error) {
		res.send(error);
	} else {
		res.send(data);
	}
});

// get orders by user id
router.get("/getorders", async (req, res) => {
	userid = req.headers.userid;
	const { data, error } = await supabase
		.from("Order")
		.select()
		.eq("CustomerId", userid);
	if (error) {
		res.send(error);
	}
	if (data) {
		res.send(data);
	}
});

module.exports = router;
