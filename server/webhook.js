const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
    const { body } = req;

    // Extract email from the sessionInfo parameters
    const email = body.sessionInfo.parameters.email;

    if (!email) {
        return res.status(400).json({ error: "Email not found in request" });
    }

    try {
        // Insert email into the database
        await pool.query('INSERT INTO email (email) VALUES ($1)', [email]);

        const jsonResponse = {
            fulfillmentResponse: {
                messages: [
                    {
                        text: {
                            text: ["Email saved successfully"],
                        },
                    },
                ],
            },
        };

        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.error("Error saving email to database:", error);
        console.log("Email value:", email); // Add this line to log the email value
        return res.status(500).json({ error: "Error saving email to database" });
    }
});

app.listen(6001, () => {
    console.log("Server is running on port 6001");
});
