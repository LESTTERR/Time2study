import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { SessionsClient } from "@google-cloud/dialogflow";
import { v4 as uuidv4 } from "uuid";

// ✅ Use the correct path to your downloaded JSON
const keyFile = "./dialogflow-key.json";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new SessionsClient({ keyFilename: keyFile });

// ✅ Use your actual project ID
const projectId = "time2study-4f2f3";

app.post("/chat", async (req, res) => {
  const sessionId = uuidv4();
  const sessionPath = client.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message,
        languageCode: "en",
      },
    },
  };

  try {
    const responses = await client.detectIntent(request);
    const result = responses[0].queryResult;
    res.send({ reply: result.fulfillmentText });
  } catch (error) {
    console.error("Dialogflow error:", error);
    res.status(500).send({ reply: "Error connecting to Dialogflow." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
