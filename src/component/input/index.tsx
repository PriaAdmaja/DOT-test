import { ChangeEvent, ComponentPropsWithoutRef, useState } from "react";
import style from "./input.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type InputProps = {
  isPassword?: boolean;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ isPassword = false, ...rest }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={style.input_container}>
      <input
        placeholder="Masukkan Password"
        type={showPassword ? "text" : "password"}
        className={style.input}
        {...rest}
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
