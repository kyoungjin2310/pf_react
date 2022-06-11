import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header({ type }) {
  return (
    <header className={type}>
      <div className="inner">
        <h1>
          <Link to="/">Neige</Link>
        </h1>
        <ul id="gnb">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/pr">PR</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/join">Join</Link>
          </li>
        </ul>

        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
}

export default Header;
