"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthFilter = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const pathname = usePathname();

  let isAllow = false;
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user as string);
    if (parsedUser) {
      isAllow = true;
    }
  }

  useEffect(() => {
    if (!isAllow) {
      if (pathname !== "/") {
        router.push("/");
        return;
      }
    } else {
      if (pathname === "/") {
        router.push("/dashboard");
        return;
      }
    }
  }, [isAllow, pathname, router]);

  if (!isAllow) {
    if (pathname !== "/") {
      return <></>;
    }
  }

  if (isAllow) {
    if (pathname === "/") {
      return <></>;
    }
  }

  return <>{children}</>;
};

export default AuthFilter;
