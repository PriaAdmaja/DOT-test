"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Login from "@/component/login";
import Register from "@/component/register";
import AuthFilter from "@/component/auth-filter";

function Home() {
  const [tab, setTab] = useState<"login" | "register">("login");
  return (
    <main className={styles.main}>
      <section className={styles.form_wrap}>
        <nav className={`${styles.tab_group}`}>
          <p
            className={`${styles.tab} ${tab === "login" && styles.tab_select}`}
            onClick={() => setTab('login')}
          >
            Login
          </p>
          <p
            className={`${styles.tab} ${
              tab === "register" && styles.tab_select
            }`}
            onClick={() => setTab('register')}
          >
            Daftar Baru
          </p>
        </nav>
        <section className={styles.content}>
          {tab === 'login' && <Login/>}
          {tab === 'register' && <Register/>}
        </section>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <AuthFilter>
      <Home />
    </AuthFilter>
  );
}