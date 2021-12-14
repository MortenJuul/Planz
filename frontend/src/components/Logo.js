import mainLogo from "../icons/logo_white.png"

const Logo = (props) => (
  <img
    alt="Logo"
    src={ mainLogo }
    className="mainLogo"
    {...props}
  />
);

export default Logo;
