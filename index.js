import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { login, register } from "./controllers/auth.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const PORT = process.env.PORT | 5000;

/* configure */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/assets");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

//auth routes
app.post("/auth/register", register);
app.post("/auth/login", login);

//post routes
app.use("/posts", postRoutes);
//user routes
app.use("/users", userRoutes);

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;
