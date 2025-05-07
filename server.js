const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { SessionsClient } = require("@google-cloud/dialogflow");
const uuid = require("uuid");

// ✅ Use the correct path to your downloaded JSON
const keyFile = "./dialogflow-key.json";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new SessionsClient({ keyFilename: keyFile });

// ✅ Use your actual project ID
const projectId = "time2study-4f2f3";

app.post("/chat", async (req, res) => {
  const sessionId = uuid.v4();
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

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
