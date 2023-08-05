import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Button } from "primereact/button";

export default function Login() {
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (ev) => {
    swal({
      //     text: "Sucussfully Logged in",
      //     icon: "success",
      //     type: "success",
      //   });
    });
  };
  return (
    <>
      <form method="Post" onSubmit={handleSubmit} className="sign-in-form">
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          label="Sign In"
          onClick={""}
          className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
        />

        <p className="social-text">Or </p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </form>
      <div></div>
    </>
  );
}
