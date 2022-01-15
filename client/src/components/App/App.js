import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "../Message/Message";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function App() {
  const [messages, setMessages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/messages/latest`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const deleteMessage = (id) => {
    const url1 = `${process.env.REACT_APP_API_BASE_URL}/messages/${id}`;

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
      <div className="allMessageField">
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
      <Navbar />

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
    </Router>
  );
}

export default App;
