const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { response, request } = require("express");
const app = express();

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
  const messages = getMessagesFromJson();

  const maxMessageId = Math.max(...messages.map((m) => m.id));
  newMessage.id = maxMessageId + 1;
  message.timeSent = `${new Date()}`;

  if (newMessage.text === "" || newMessage.from === "") {
    response.status(400).send("either text or sender name is empty");
  } else {
    messages.push(newMessage);
    saveNewMessageToJson(messages);

    response.status(201).send(newMessage);
  }
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

// function isValidMessage(message) {
//   if (message.text && message.from) {
//     return true;
//   }
//   return false;
// }

// app.get("/messages", (req, res) => {
//   res.status(201).send(messages);
// });

// app.put("/messages/:id", (req, res) => {
//   const messageId = parseInt(req.params.id);
//   let updatedMessage = req.body;

//   let message = messages.find((message) => message.id === messageId);
//   if (!message) {
//     res.status(404).send("This message does not exist");
//   }
//   message.from = updatedMessage.from;
//   message.text = updatedMessage.text;
//   timeSent = message.timeSent;
//   res.status(201).send(updatedMessage);
// });

// app.delete("/messages/:id", (req, res) => {
//   const messageId = req.params.id;

//   const index = messages.findIndex((message) => message.id == messageId);
//   // findIndex() returns -1 if item is not found, but -1 should not be used as index: negative number is not a valid position
//   if (index === -1) {
//     res.status(404).send();
//     return;
//   }
//   // remove one item starting from the index that is found
//   messages.splice(index, 1);
//   res.status(201).send({ success: true });
// });

app.get("/", fromHtml);
app.get("/messages", getAllMessages);
app.post("/messages", addNewMessageWithDate);
app.get("/messages/search", searchSpecificMessageWithText);
app.patch("/messages/:id", changeMessagesInfo);
app.get("/messages/latest", getLastTenMessages);
app.delete("/messages/:id", deleteMessageById);
app.get("/messages/:id", getMassagesById);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
