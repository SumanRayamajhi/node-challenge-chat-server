import { FaTimes } from "react-icons/fa";
import "./Message.css";

const Message = ({ id, from, text, onDelete, date }) => {
  return (
    <div className="blog-preview">
      <div className="Message__head">
        <p>From:{from}</p>
        <FaTimes
          className="deleteButton"
          style={{ color: "red", cursor: "pointer", marginLeft: "18rem" }}
          onClick={() => onDelete(id)}
        />
      </div>

      <p>Text: "{text}"</p>
      <p>Date: {date} </p>
    </div>
  );
};
export default Message;
