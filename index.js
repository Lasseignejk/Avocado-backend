const express = require("express");
const cors = require("cors");
const products = require("./products");

const PORT = process.env.PORT || 3060;
const cloudinary = require("cloudinary");
const supabaseUrl = "https://dwjnomervswgqasgexck.supabase.coM";
const supabaseKey = env.VITE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/products", (req, res) => {
	res.send(products);
});

app.post("/products", async (req, res) => {
	const { data, error } = await supabase.auth.signUp({
		email: req.body.email,
		password: req.body.password,
	});
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
