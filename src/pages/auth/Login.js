import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
//import Card from "../../componets/cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils";
import { toast } from "react-toastify";
import Loader from "../../componets/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import Card from "../../componets/card/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All feild are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please neter a valid email");
    }

    const userData = {
      email,
      password,
    };
    console.log(userData);
    await dispatch(login(userData));
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="--btn-block"
                style={{ backgroundColor: "blue", color: "#fff" }}
              >
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
