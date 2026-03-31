import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { db } from "./database.ts"
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (req, file, callback) => {
		const uniqueName = Date.now() + ".png";
		callback(null, uniqueName);
	}
});

const upload = multer({ storage });

app.get("/garden", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM flowers ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.post("/garden", upload.single("image"), async (req, res) => {
	console.log("req.file:", req.file);
	
	if (!req.file) {
    	return res.status(400).json({ success: false, message: "No file uploaded" });
  	}

	const imagePath = req.file.filename;
	if (!imagePath) {
  		return res.status(400).json({ success: false, message: "No file uploaded" });
	}

	try {
		await db.execute(
		"INSERT INTO flowers (image_path) VALUES (?)", [imagePath]);
		res.json({ success: true });
	} catch (err: any) {
		console.error("DB INSERT ERROR:", JSON.stringify(err, null, 2));
		console.error("DB INSERT ERROR code:", err.code);
		console.error("DB INSERT ERROR sql:", err.sql);
		console.error("DB INSERT ERROR sqlMessage:", err.sqlMessage);
		res.status(500).json({ success: false, message: "Database error" });
	}
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});