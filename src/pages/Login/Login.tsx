import { useState } from "react";
import "./styles.css";
import logo from "./../../assets/images/logo.png";
import { Regiser } from "../../services/auth.service";

const Login: React.FC = () => {
  const [userCred, setuserCred] = useState({ name: "", email: "" });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserCred({ ...userCred, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    Regiser(userCred)
      .then((response) => {
        const user_token = response.data.data.sl_token;
        if (user_token) {
          localStorage.setItem("user_token", JSON.stringify(user_token));
          window.location.reload();
        } else {
          throw new Error("NO token found");
        }

        return response.data;
      })
      .catch((e) => console.log(e));
  };
  const isFormInvalid = (): boolean => {
    const emailMatch = userCred.email.match(/.*@.*.[a-z]$/g);
    return !(userCred.name && emailMatch && emailMatch[0] === userCred.email);
  };
  return (
    <div id="login-form" className="basic-form">
      <h3 className="basic-form__title">Login</h3>
      <img src={logo} alt="" />
      <form onSubmit={handleSubmit}>
        <div className="basic-form__element">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter username"
            name="name"
            value={userCred.name}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="basic-form__element">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={userCred.email}
            onChange={handleChange}
          />
        </div>
        <button disabled={isFormInvalid()} className="basic-form__submit">
          Go
        </button>
      </form>
    </div>
  );
};

export default Login;
