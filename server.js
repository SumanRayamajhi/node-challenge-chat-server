const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [
  { id: 0, from: "Bart", text: "Welcome to CYF chat system!" },
  { id: 1, from: "Anne", text: "Good to see you" },
  { id: 2, from: "Helen", text: "Long time, no see" },
  { id: 3, from: "Anne", text: "let's go for a coffee" },
];

function getNextId() {
  const lastMessageIndex = messages.length - 1;
  if (lastMessageIndex === -1) {
    return 0;
  } else {
    const nextId = lastMessageIndex + 1;
    return nextId;
  }
  // for json object, the id has to be a string: nextId.toString();
}

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.status(201).send(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((message) => message.id === messageId);
  if (message) {
    res.status(201).send(message);
  } else {
    res.status(404).send("This message does not exist");
  }
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const id = getNextId();
  const newMessage = { id: id, from: from, text: text };
  if (from === "" || text === "") {
    res.status(404).send("This message is not complete.");
  } else {
    messages.push(newMessage);
    res.status(201).send(newMessage);
  }
});

app.put("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  let updatedMessage = req.body;
  console.log(updatedMessage);

  let message = messages.find((message) => message.id === messageId);
  if (message) {
    message.from = updatedMessage.from;
    message.text = updatedMessage.text;
    res.status(201).send(updatedMessage);
  } else {
    res.status(404).send("This message does not exist");
  }
});

app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;

  const index = messages.findIndex((message) => message.id == messageId);
  // findIndex() returns -1 if item is not found, but -1 should not be used as index: negative number is not a valid position
  if (index === -1) {
    res.status(404).send();
    return;
  }
  // remove one item starting from the index that is found
  messages.splice(index, 1);
  res.status(201).send({ success: true });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
