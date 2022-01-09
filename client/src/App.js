import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./components/Message";
import NewMessageForm from "./components/NewMessageForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [messages, setMessages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const url = "http://localhost:4000/messages/latest";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const deleteMessage = (id) => {
    const url1 = `http://localhost:4000/messages/${id}`;

    fetch(url1, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setMessages(messages.filter((message) => message.id !== id));
    console.log("delete", id);
  };

  const messageElements = messages.map((message) => {
    return (
      <div>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Message
              id={message.id}
              from={message.from}
              text={message.text}
              date={message.timeSent}
              
              onDelete={deleteMessage}
              // addDate={addDate}
            />
          </li>
        </ul>
      </div>
    );
  });

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <NewMessageForm
                showMessage={() => setShowMessage(!showMessage)}
                setMessages={setMessages}
              />
            </Route>
            <Route exact path="/messages">
              {messageElements}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
