import { useState } from "react";

function NewMessageForm({ addDate }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const data = {
      from: name,
      text: message,
    };
    const url = "http://localhost:4000/messages";
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
    <div className="blog-details">
      <h2 className="blog-details-messages">Send a message</h2>
      <form onSubmit={handleOnSubmit}>
        <p className="blog-details-messages">
          Name:{" "}
          <input
            className="blog-details-input"
            type="text"
            name="from"
            placeholder="Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />{" "}
          <br />
          Message:{" "}
          <input
            className="blog-details-input"
            type="text"
            name="text"
            placeholder="The message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <br />
        </p>
        <button
          style={{ color: "#3561f1", cursor: "pointer", marginLeft: "18rem" }}
          type="submit"
          onClick={addDate}
        >
          Send
        </button>
      </form>
    </div>
  );
}
export default NewMessageForm;
