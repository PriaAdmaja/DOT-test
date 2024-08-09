import { ChangeEvent, useState } from "react";
import style from "../login/login.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

type AccountData = {
  name: string;
  userName: string;
  password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = () => {
    const storageData = localStorage.getItem("account");
    const parsedStorageData: AccountData[] | null = JSON.parse(
      storageData as string
    );
    const previousData = parsedStorageData === null ? [] : parsedStorageData;

    if (previousData.find((d) => d.userName === userName) !== undefined) {
      return toast.error("Username telah terdaftar!");
    }

    const data = {
      name: name,
      userName: userName,
      password: password,
    };

    previousData.push(data);
    localStorage.setItem("account", JSON.stringify(previousData));
    toast.success("Pendaftaran berhasil!");
    setName('');
    setUserName('');
    setPassword('');
  };

  return (
    <section>
      <div className={style.input_wrap}>
        <label className={style.label}>Nama :</label>
        <input
          placeholder="Masukkan Nama"
          type="text"
          className={style.input}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Username :</label>
        <input
          placeholder="Masukkan Username"
          type="text"
          className={style.input}
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value)
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
                setPassword(e.target.value)
              }}
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
        <button
          className={style.login_button}
          onClick={register}
          disabled={name === "" || userName === "" || password === ""}
        >
          Daftar
        </button>
      </div>
      <ToastContainer draggable />
    </section>
  );
};

export default Register;
