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
  { id: 4, from: "Anne", text: "Good to see you 2" },
  { id: 5, from: "Helen", text: "Long time, no see 2" },
  { id: 6, from: "Anne", text: "let's go for a coffee 2" },
  { id: 7, from: "Bart", text: "Welcome to CYF chat system! 2" },
  { id: 8, from: "Anne", text: "Good to see you 3" },
  { id: 9, from: "Helen", text: "Long time, no see 3" },
  { id: 10, from: "Anne", text: "let's go for a coffee 3" },
  { id: 11, from: "Helen", text: "Long time, no see 4" },
  { id: 12, from: "Anne", text: "let's go for a coffee 4" }
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

function isValidMessage(message) {
  if (message.text && message.from) {
    return true;
  }
  return false;
}

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.status(201).send(messages);
});


app.get("/messages/search", (req, res) => {
  // get search terms from query params
  const searchTerm = req.query.text.toLowerCase()
  // find messages containing the search term
  const result = messages.filter(item => item.text.toLowerCase().includes(searchTerm))
  // return them
  res.send(result)
})

app.get("/messages/latest", (req, res) => {
  // get the LAST 10 messages and return them
  // slice with a negative number will create a new array with the items of the number, counting backwards
  let result = messages.slice(-10)
  res.send(result)
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
  const message = {
    id:  getNextId(),
    from: req.body.from,
    text: req.body.text,
  };

  if (!isValidMessage(message)) {
    res.status(404).send("This message is not complete.");
    return;
  }
  messages.push(message);
  res.status(201).send(message);
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
