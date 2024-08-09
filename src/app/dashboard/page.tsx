"use client";
import AuthFilter from "@/component/auth-filter";
import Layout from "@/component/layout";
import style from "./dashboard.module.css";
import Input from "@/component/input";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import Button from "@/component/button";
import { ChangeEvent, useState } from "react";

const Dashboard = () => {
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);

  const inputWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const weightValue = e.target.value;
    const number = "1234567890";
    const filteredWeightValue = weightValue
      .split("")
      .map((d) => (number.includes(d) ? d : ""))
      .join("");
    const removeFirstZero = filteredWeightValue
      .split("")
      .map((d) => (d[0] === "0" ? "" : d))
      .join("");
    setWeight(removeFirstZero === "" ? 0 : Number(removeFirstZero));
  };

  return (
    <Layout>
      <section className={style.section}>
        <p className={style.title}>Cek Ongkir</p>
        <section className={style.card}>
          <div className={style.filter}>
            <div className={style.input_wrap}>
              <Input
                placeholder="Dari"
                value={fromAddress}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFromAddress(e.target.value)
                }
              />
            </div>
            <div className={style.input_wrap}>
              <Input
                placeholder="Menuju"
                value={toAddress}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setToAddress(e.target.value)
                }
              />
            </div>
            <section className={style.weight_wrap}>
              <div className={style.input_weight}>
                <Input
                  placeholder="Berat"
                  value={weight}
                  onChange={inputWeight}
                />
                <p>KG</p>
              </div>
              <div className={style.number_button_wrap}>
                <button
                  type="button"
                  className={style.number_button}
                  onClick={() => setWeight((prev) => prev + 1)}
                >
                  <BsPlusCircle />
                </button>
                <button
                  type="button"
                  className={style.number_button}
                  onClick={() =>
                    setWeight((prev) => (prev === 0 ? 0 : prev - 1))
                  }
                >
                  <BsDashCircle />
                </button>
              </div>
            </section>
            <Button type="button">Cari</Button>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default function Page() {
  return (
    <AuthFilter>
      <Dashboard />
    </AuthFilter>
  );
}
