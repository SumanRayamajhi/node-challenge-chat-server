const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { response, request } = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  app.use(wxpress.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use(cors());
app.use(express.json());

const saveNewMessageToJson = (messages) => {
  const text = JSON.stringify(messages, null, 4);
  fs.writeFileSync("./messages.json", text);
};

const getMessagesFromJson = () => {
  const text = fs.readFileSync("./messages.json");
  const obj = JSON.parse(text);
  return obj;
};

const fromHtml = (request, response) => {
  response.sendFile(__dirname + "/index.html");
};

//get all the messages
const getAllMessages = (request, response) => {
  const messages = getMessagesFromJson();
  response.send(messages);
};

//get messages by Id
const getMassagesById = (request, response) => {
  const messagesId = parseInt(request.params.id);
  let foundMessage = getMessagesFromJson().find((m) => m.id === messagesId);
  if (foundMessage) {
    response.status(201).send(foundMessage);
  } else {
    res.status(404).send("This message does not exist");
  }
};

// get last 10 messages
const getLastTenMessages = (request, response) => {
  const lastTenMessages = getMessagesFromJson().slice(-10);
  response.send(lastTenMessages);
};

//Create a new message with date
const addNewMessageWithDate = (request, response) => {
  const newMessage = request.body;
  console.log(newMessage);
  const messages = getMessagesFromJson();

  const maxMessageId = Math.max(...messages.map((m) => m.id));
  newMessage.id = maxMessageId + 1;
  newMessage.timeSent = `${new Date()}`;

  if (isEmpty(newMessage.text) || isEmpty(newMessage.from)) {
    response.status(400).send("either text or sender name is empty");
  } else {
    messages.push(newMessage);
    saveNewMessageToJson(messages);

    response.status(201).send(newMessage);
  }
};

const isEmpty = (v) => {
  return v === "" || v === null || v === undefined;
};

//Delete a message, by ID
const deleteMessageById = (request, response) => {
  const messageId = parseInt(request.params.id);
  let messages = getMessagesFromJson();

  const jsonMessage = messages.find((m) => m.id === messageId);
  if (jsonMessage) {
    messages = messages.filter((m) => m.id != messageId);
    saveNewMessageToJson(messages);
    response.status(200).send(jsonMessage);
  } else {
    response.status(404).send("Did not find messsages with id " + messageId);
  }
};

// search specific message with the text
const searchSpecificMessageWithText = (request, response) => {
  const query = request.query.text.toLowerCase();
  const foundMessages = getMessagesFromJson().filter(
    (m) => m.text.toLowerCase().includes(query) || m.from.toLowerCase(query)
  );
  if (foundMessages.length < 1) {
    response.status(404).send(`Message doesn't contain "${query}"`);
  } else {
    response.send(foundMessages);
  }
};

// change messages information
const changeMessagesInfo = (request, response) => {
  const id = parseInt(request.params.id);
  const updatedInfo = request.body;
  let foundMessage = getMessagesFromJson().find((m) => m.id === id);
  if (updatedInfo.text) {
    foundMessage.text = updatedInfo.text;
  }
  if (updatedInfo.from) {
    foundMessage.from = updatedInfo.from;
  }
  addToJson(messages);
  response.status(200).send(updatedInfo);
};

app.get("/", fromHtml);
app.get("/messages", getAllMessages);
app.post("/messages", addNewMessageWithDate);
app.get("/messages/search", searchSpecificMessageWithText);
app.patch("/messages/:id", changeMessagesInfo);
app.get("/messages/latest", getLastTenMessages);
app.delete("/messages/:id", deleteMessageById);
app.get("/messages/:id", getMassagesById);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
