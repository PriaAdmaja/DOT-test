"use client";
import { useRouter, usePathname } from "next/navigation";

const AuthFilter = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const pathname = usePathname();

  let isAllow = false;
  if (typeof window !== undefined) {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user as string);
    if (parsedUser) {
      isAllow = true;
    }
  }

  if (!isAllow) {
    if (pathname !== "/") {
      router.push("/");
      return;
    }
  }

  if (isAllow) {
    if (pathname === "/") {
      router.push("/dashboard");
      return;
    }
  }

  return <>{children}</>;
};

export default AuthFilter;
