import express from "express";
import helmet from "helmet";
import cors from "cors";
import db from "./app/models/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import {decryptRequest, encryptResponse} from "./app/middlewares/encryptionMiddleware.js";

// Setup for __dirname (because ES modules don’t support it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(decryptRequest);
//app.use(encryptResponse);
// API can be used from mentioned domain
// const corsOptions = {
//     origin: "http://localhost:8081",
// };
app.use(cors());

// Simple test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js API." });
});

// Routes
// app.use("/api/auth", ./app/routes/auth.routes.js);
// app.use("/api/user", ./app/routes/user.routes.js);
const routesDir = path.join(__dirname, "app", "routes");
fs.readdirSync(routesDir).forEach((versionFolder) => {
    const versionPath = path.join(routesDir, versionFolder);

    if (fs.lstatSync(versionPath).isDirectory()) {
        fs.readdirSync(versionPath).forEach((file) => {
            if (file.endsWith(".routes.js")) {
                const route = `/${file.split(".")[0]}`; // /auth or /user
                const fullPath = `/api/${versionFolder}${route}`;

                const modulePath = pathToFileURL(path.join(versionPath, file)).href;

                import(modulePath).then((module) => {
                    app.use(fullPath, module.default);
                    console.log('Route mounted: ${fullPath}');
                }).catch((err) => {
                    console.error('Failed to load ${modulePath}:', err);
                });
            }
        });
    }
});

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});