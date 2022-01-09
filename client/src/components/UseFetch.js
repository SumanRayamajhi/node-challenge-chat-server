// import { useState, useEffect } from "react";
// const UseFetch = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const url = "http://localhost:4000/messages/latest";
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setMessages(data));
//   }, []);

//   const deleteMessage = (id) => {
//     const url1 = `http://localhost:4000/messages/${id}`;

//     fetch(url1, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));

//     setMessages(messages.filter((message) => message.id !== id));
//     console.log("delete", id);
//   };

//   const messageElements = messages.map((message) => {
//     return <div></div>;
//   });
// };

// export default UseFetch;
