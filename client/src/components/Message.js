import { FaTimes } from "react-icons/fa";
const Message = ({ id, from, text, onDelete, date }) => {
  return (
    <div className="blog-preview">
      <p>From: {from} </p>
      <p>
        Text: "{text}"
        <FaTimes
          className="deleteButton"
          style={{ color: "red", cursor: "pointer", marginLeft: "18rem" }}
          onClick={() => onDelete(id)}
        />
      </p>
      <p>Date: {date} </p>
    </div>
  );
};
export default Message;
