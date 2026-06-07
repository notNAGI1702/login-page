import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const tokensFilePath = path.join(__dirname, 'tokens.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Server received data: ", { username, password });

    if (username === "admin" && password === "password123") {
        const sessionToken = crypto.randomUUID();

        fs.readFile(tokensFilePath, 'utf8', (err, data) => {
            let tokens = {};

            if (!err && data) {
                try {
                    tokens = JSON.parse(data);
                } catch (parseErr) {
                    tokens = {};
                }
            }

            tokens[sessionToken] = {
                username: username,
                createdAt: new Date()
            };

            fs.writeFile(tokensFilePath, JSON.stringify(tokens, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ success: false, message: "Error writing token data." });
                }

                return res.json({
                    success: true,
                    message: "Login Successful!",
                    token: sessionToken
                });
            });
        });

    } else {
        return res.status(401).json({
            success: false,
            message: "Login Failed"
        });
    }
});

app.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});