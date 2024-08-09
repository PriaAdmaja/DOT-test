import { ComponentPropsWithoutRef, ReactNode } from "react";
import style from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className={style.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
