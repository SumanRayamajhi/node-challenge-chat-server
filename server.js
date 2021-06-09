const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [
  {id: 0, from: "Bart", text: "Welcome to CYF chat system!" },
  { from: "Anne", text: "Good to see you" },
  { from: "Helen", text: "Long time, no see"},
  { from: "Anne", text: "let's go for a coffee"}
];

function getNextId() {
  const lastMessage = messages[messages.length - 1].id  
  const nextId = parseInt(lastMessage) + 1;
  return nextId.toString();
}

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);

  const message = messages.find((message) => message.id === messageId);
  if (message) {
    res.send(message);
  } else {
    console.log("This message does not exist");
    res.status(404).send();
  }
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const id = getNextId();
  const newMessage = { id: id, from: from, text: text };
  if (from === "" || text === "") {
    console.log("This message is not complete.");
    res.status(404).send();
  } else {
    messages.push(newMessage);
    console.log("Posted new message", newMessage);
  }
});

app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);

  const message = messages.find((message) => message.id === messageId);
  if (message) {
    const index = messages.findIndex((message) => message.messageId == messageId);
    messages.splice(index, 1);
    res.send({ success: true });
  } else {
    console.log("This message does not exist");
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
