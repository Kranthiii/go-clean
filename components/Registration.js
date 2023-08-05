import { Link } from "react-router-dom";
import { Button } from "primereact/button";

function Registration() {
  return (
    <>
      {/* <div>
        <img
          className="blob"
          src="/blob-1.png"
          style={{
            position: "absolute",
            top: "-18%",
            // transform: "rotate(255deg)",
            left: "51%",
            scale: "0.3",
          }}
        />
      </div> */}
      <form action="#" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <Button
          label="Sign Up"
          onClick={""}
          className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
        />
        <p className="social-text">
          Or
          <Link to={"/login"}>
            <p style={{ color: "black" }}>Sign In</p>
          </Link>
        </p>
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
      {/* <div>
        <img
          src="/blob-1.png"
          className="blob"
          style={{
            position: "absolute",
            top: "35%",
            transform: "rotateY(180deg)",
            left: "0%",
            scale: "0.3",
          }}
        />
      </div> */}
    </>
  );
}

export default Registration;
