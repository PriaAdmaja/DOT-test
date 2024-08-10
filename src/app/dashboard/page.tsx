"use client";
import AuthFilter from "@/component/auth-filter";
import Layout from "@/component/layout";
import style from "./dashboard.module.css";
import { useEffect, useState } from "react";
import SearchableInput from "@/component/searchable-input";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Image from "next/image";

type PokeUrlResult = {
  name: string;
  url: string;
};

type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
};
const Dashboard = () => {
  const [generationList, setGenerationList] = useState<PokeUrlResult[]>([
    { name: "Loading...", url: "" },
  ]);
  const [selectGeneration, setSelectGeneration] = useState<boolean>(false);
  const [pokemonType, setPokemonType] = useState<PokeUrlResult[]>([
    { name: "Loading...", url: "" },
  ]);
  const [selectType, setSelectType] = useState<boolean>(false);
  const [pokemonName, setPokemonName] = useState<PokeUrlResult[]>([
    { name: "Loading...", url: "" },
  ]);
  const [pokemonData, setPokemonData] = useState<PokemonData | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/generation/")
      .then((res) => setGenerationList(res.data.results))
      .catch((err: Error) => console.log(err.message));
  }, []);

  return (
    <Layout>
      <section className={style.section}>
        <p className={style.title}>Cari Pokemon</p>
        <section className={style.card}>
          <header className={style.filter}>
            <div className={style.input_wrap}>
              <SearchableInput
                options={generationList.map((d) => {
                  return {
                    label: d.name,
                    value: d.url,
                  };
                })}
                setValue={async (d) => {
                  try {
                    const res = await axios.get(d.value);
                    const result = res.data.types;
                    if (result.length === 0) {
                      return setPokemonType([
                        { name: "Tidak ada data", url: "" },
                      ]);
                    }
                    setSelectGeneration(true);
                    setPokemonType(result);
                  } catch (error) {
                    toast.error("Gagal mengunduh data tipe pokemon");
                  }
                }}
                placeholder="Generasi"
                clearValue={() => setSelectGeneration(false)}
              />
            </div>
            {pokemonType.length > 0 && selectGeneration && (
              <div className={style.input_wrap}>
                <SearchableInput
                  options={pokemonType.map((d) => ({
                    label: d.name,
                    value: d.url,
                  }))}
                  setValue={async (d) => {
                    try {
                      const res = await axios.get(d.value);
                      const result = res.data.pokemon.map(
                        (d: any) => d.pokemon
                      );
                      if (result.length === 0) {
                        return setPokemonName([
                          { name: "Tidak ada data", url: "" },
                        ]);
                      }
                      setSelectType(true);
                      setPokemonName(result);
                    } catch (error) {
                      toast.error("Gagal mengunduh daftar pokemon");
                    }
                  }}
                  placeholder="Tipe Pokemon"
                  clearValue={() => setSelectType(false)}
                />
              </div>
            )}
            {pokemonName.length > 0 && selectType && (
              <div className={style.input_wrap}>
                <SearchableInput
                  options={pokemonName.map((d) => ({
                    label: d.name,
                    value: d.url,
                  }))}
                  setValue={async (d) => {
                    try {
                      console.log(d);
                      const res = await axios.get(d.value);
                      const result = res.data;
                      setPokemonData(result);
                    } catch (error) {
                      toast.error("Gagal mengunduh data pokemon");
                    }
                  }}
                  placeholder="Nama Pokemon"
                />
              </div>
            )}
          </header>
          {pokemonData !== undefined && (
            <section className={style.data_container}>
              <p className={style.title}>{pokemonData.name.toUpperCase()}</p>
              <div className={style.poke_data}>
                <Image
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name || "img"}
                  width={200}
                  height={200}
                />
                <div>
                  <p>Berat : {pokemonData.weight} kg</p>
                  <p>Tinggi : {pokemonData.height} cm</p>
                </div>
              </div>
            </section>
          )}
        </section>
        <ToastContainer />
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
