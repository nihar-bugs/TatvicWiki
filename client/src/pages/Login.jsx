import { Link } from "react-router-dom";

const Login = () => {
  const googleImage = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png";

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="login">
      <div className="loginTitle">Login</div>
      <div className="wrapper">
        <Link onClick={google}>
          <img src={googleImage} className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
