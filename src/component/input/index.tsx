import { ComponentPropsWithoutRef, LegacyRef, useState } from "react";
import style from "./input.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type InputProps = {
  isPassword?: boolean;
  ref?: LegacyRef<HTMLInputElement>
} & ComponentPropsWithoutRef<"input">;

const Input = ({ isPassword = false, ref, ...rest }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={style.input_container}>
      <input
        type={!isPassword ? "text" : showPassword ? "text" : "password"}
        className={style.input}
        {...rest}
        ref={ref}
      />
      {isPassword && (
        <button
          type="button"
          className={style.password_toggle}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaRegEye style={{ width: 20, height: 20 }} />
          ) : (
            <FaRegEyeSlash style={{ width: 20, height: 20 }} />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
