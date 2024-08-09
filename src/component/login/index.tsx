import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./login.module.css";
import { AccountData } from "@/type/account";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Input from "../input";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [parsedAccountData, setParsedAccountData] = useState<AccountData[]>([]);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      const parsedAccount: AccountData[] = JSON.parse(accountData as string);
      setParsedAccountData(parsedAccount);
    }
  }, []);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parsedAccountData.find((d) => d.userName === username) === undefined) {
      return toast.error("Akun belum terdaftar!");
    }

    const userData = parsedAccountData.find((d) => d.userName === username);
    if (userData?.password !== password) {
      return toast.error("Password salah!");
    }
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoginSuccess(true)
  };

  useEffect(() => {
    if(isLoginSuccess) {
      router.push("/dashboard");
    }
  }, [isLoginSuccess, router])

  return (
    <form onSubmit={login}>
      <div className={style.input_wrap}>
        <label className={style.label}>Username :</label>
        <Input
          placeholder="Masukkan Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Password :</label>
        <Input
          placeholder="Masukkan password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          isPassword
        />
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
