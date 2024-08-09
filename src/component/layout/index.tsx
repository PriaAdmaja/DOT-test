'use client'
import { useEffect, useState } from "react";
import Button from "../button";
import style from "./layout.module.css";
import { AccountData } from "@/type/account";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [name, setName] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const parsedUserData: AccountData = JSON.parse(userData as string);
    setName(parsedUserData.name);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/')
  }

  return (
    <section className={style.container}>
      <header className={style.header}>
        <p className={style.name}>{name.toUpperCase()}</p>
        <Button type="button" onClick={logout}>Logout</Button>
      </header>
      {children}
    </section>
  );
};

export default Layout;
