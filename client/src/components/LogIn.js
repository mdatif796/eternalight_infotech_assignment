import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import styles from "../styles/login_signup.module.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      toast.error("Enter email and password");
      setLoggingIn(false);
      return;
    }
    const response = await auth.login(email, password);
    if (response.success) {
      toast.success("successfully logged In");
      return <Navigate to="/" />;
    } else {
      toast.error(response.message);
    }
    setLoggingIn(false);
    setEmail("");
    setPassword("");
    return;
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.login_signup_form} onSubmit={handleSubmit}>
      <span className={styles.login_signup_header}>Log In</span>
      <input
        className={styles.input_field}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={styles.input_field}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className={styles.btn} disabled={loggingIn}>
        {loggingIn ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LogIn;
