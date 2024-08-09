import { useState } from "react";
import style from "./login.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const accountData = localStorage.getItem('account');
  

  return (
    <>
      <div className={style.input_wrap}>
        <label className={style.label}>Username :</label>
        <input
          placeholder="Masukkan Username"
          type="text"
          className={style.input}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Password :</label>
        <div className={style.password}>
          <input
            placeholder="Masukkan Password"
            type={showPassword ? "text" : "password"}
            className={style.input}
          />
          <button
            className={style.password_toggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye style={{ width: 20, height: 20 }} />
            ) : (
              <FaRegEyeSlash style={{ width: 20, height: 20 }} />
            )}
          </button>
        </div>
      </div>
      <div className={style.login_wrap}>
        <button className={style.login_button}>Login</button>
      </div>
    </>
  );
};

export default Login;
