import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Button } from "primereact/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  let session = useSession();

  console.log({ session });

  const router = useRouter();
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    if (session.status === "authenticated") {
      if (session.data.user.role === "admin") router.push("/admin");
      else router.push("/");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      callbackUrl: "/",
    });
    console.log({ res });
    if (res.ok) {
      swal({
        text: "Successfully Logged in",
        icon: "success",
        buttons: false,
        timer: 2000,
      });
      // router.push(res.url);
    } else {
      swal({
        text: "Wrong Credentials",
        icon: "error",
        buttons: false,
        timer: 2000,
      });
    }
  };
  return (
    <>
      <div>
        <div className="text-center pt-7" style={{ backgroundColor: "white" }}>
          <img src="/logo1.png" alt="hyper" height={150} className="" />
        </div>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="sign-in-form"
          style={{ height: "70vh" }}
        >
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
          <br />
          <Button
            label="Sign In"
            className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          />

          <p className="social-text">Or{""}</p>
          {/* <a href="http://localhost:3000/signup">
          <p style={{ color: "black", textDecoration: "none" }}></p>
        </a> */}
          <a
            href="http://localhost:3000/signup"
            className="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
          >
            Sign Up
          </a>
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
      </div>
    </>
  );
}
