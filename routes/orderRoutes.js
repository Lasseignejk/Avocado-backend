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
  let { data, error } = await supabase.from("Order").insert([
    {
      CustomerId: CustomerId,
      RestaurantId: RestaurantId,
      OrderTotal: OrderTotal,
      OrderComplete: OrderComplete,
      IsPickup: IsPickup,
      IsDelivery: IsDelivery,
      TotalItems: TotalItems,
      Notes: Notes,
    },
  ]);
  res.send(data);
  console.log("req.body: ", req.body);
});

module.exports = router;
