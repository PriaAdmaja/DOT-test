"use client";
import { useRouter, usePathname } from "next/navigation";

const AuthFilter = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const pathname = usePathname();

  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user as string);

  if (!parsedUser) {
    if (pathname !== "/") {
      router.push("/");
      return;
    }
  }

  if (parsedUser) {
    if (pathname === "/") {
      router.push("/dashboard");
      return;
    }
  }

  return <>{children}</>;
};

export default AuthFilter;
