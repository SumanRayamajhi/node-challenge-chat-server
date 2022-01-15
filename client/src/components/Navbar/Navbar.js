import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ showMessage }) => {
  return (
    <nav className="navbar">
      <h1>Chat-Server</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link
          to="/messages"
          style={{
            color: "white",
            backgroundColor: "#3561f1",
            borderRadius: "8px",
          }}
          onClick={showMessage}
        >
          All Messages
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
