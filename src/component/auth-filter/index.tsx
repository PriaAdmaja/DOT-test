"use client";

import { AccountData } from "@/type/account";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const AuthFilter = ({ children }: { children: JSX.Element }) => {
  const [userData, setUserData] = useState<AccountData | undefined | null>(
    undefined
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (userData === undefined) {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user as string);
      setUserData(parsedUser);
    }
  }, [userData]);

  if (userData === undefined) {
    return <Loading />;
  }

  if (userData === null) {
    if (pathname !== "/") {
      router.push('/')
      return <></>;
    }
  }

  if (userData !== null) {
    if (pathname === "/") {
      router.push('/dashboard')
      return <></>;
    }
  }

  return <>{children}</>;
};

export default AuthFilter;
