import { useState } from "react";
import "./NewMessageForm.css";

function NewMessageForm({ addDate }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const data = {
      from: name,
      text: message,
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/messages`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => console.log(res));
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <h2 className="title">Send a message</h2>
        <form onSubmit={handleOnSubmit} className="form-wrapper">
          <div className="name">
            <label className="label">Full Name</label>
            <input
              className="input"
              type="text"
              name="from"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="message">
            <label className="label">Message</label>

            <textarea
              className="input-message"
              type="text"
              name="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <button className="NewMessageForm__send" onClick={addDate}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default NewMessageForm;
