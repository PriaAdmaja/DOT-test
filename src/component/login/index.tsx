'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AccountData } from "@/type/account";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const accountData = localStorage.getItem("account");
  const parsedAccountData: AccountData[] = JSON.parse(accountData as string);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parsedAccountData.find((d) => d.userName === username) === undefined) {
      return toast.error("Akun belum terdaftar!");
    }

    const userData = parsedAccountData.find(d => d.userName === username)
    if(userData?.password !== password) {
      return toast.error('Password salah!')
    }

    localStorage.setItem('user', JSON.stringify(userData));

    router.push('/dashboard')
  };

  return (
    <form onSubmit={login}>
      <div className={style.input_wrap}>
        <label className={style.label}>Username :</label>
        <input
          placeholder="Masukkan Username"
          type="text"
          className={style.input}
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Password :</label>
        <div className={style.password}>
          <input
            placeholder="Masukkan Password"
            type={showPassword ? "text" : "password"}
            className={style.input}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="button"
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
        <button
          className={style.login_button}
          type="submit"
          disabled={username === "" || password === ""}
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;
