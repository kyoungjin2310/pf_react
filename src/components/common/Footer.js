import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="inner">
        <Link className="footerLink" to="/privacy">
          Privacy Policy
        </Link>
        <p>2022 Neige &copy; All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
