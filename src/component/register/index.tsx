"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "../login/login.module.css";
import { toast, ToastContainer } from "react-toastify";
import { AccountData } from "@/type/account";
import Input from "../input";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accountList, setAccountList] = useState<AccountData[]>([]);

  useEffect(() => {
    const storageData = localStorage.getItem("account");
    const parsedStorageData: AccountData[] | null = JSON.parse(
      storageData as string
    );
    const previousData = parsedStorageData === null ? [] : parsedStorageData;
    setAccountList(previousData);
  }, [accountList]);

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (accountList.find((d) => d.userName === userName) !== undefined) {
      return toast.error("Username telah terdaftar!");
    }
    const previousData = [...accountList];
    const data = {
      name: name,
      userName: userName,
      password: password,
    };

    previousData.push(data);
    localStorage.setItem("account", JSON.stringify(previousData));
    toast.success("Pendaftaran berhasil!");
    setName("");
    setUserName("");
    setPassword("");
  };

  return (
    <form onSubmit={register}>
      <div className={style.input_wrap}>
        <label className={style.label}>Nama :</label>
        <Input
          placeholder="Masukkan Nama"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Username :</label>
        <Input
          placeholder="Masukkan Username"
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className={style.input_wrap}>
        <label className={style.label}>Password :</label>
        <Input
          placeholder="Masukkan Password"
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
          disabled={name === "" || userName === "" || password === ""}
        >
          Daftar
        </button>
      </div>
      <ToastContainer draggable />
    </form>
  );
};

export default Register;
