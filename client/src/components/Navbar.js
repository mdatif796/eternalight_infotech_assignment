import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import eternalight from "../images/eternalight-logo.jpeg";

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img className={styles.logo} alt="" src={eternalight} />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
