import { ChangeEvent, ComponentPropsWithoutRef, useState } from "react";
import Input from "../input";
import style from "./searchableInput.module.css";
import { RxCross2 } from "react-icons/rx";

type SearchableInputProps = {
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (d: FormatOptions) => void;
  clearValue?: () => void;
  options: FormatOptions[];
} & ComponentPropsWithoutRef<"input">;

type FormatOptions = {
  label: string;
  value: string;
};

const SearchableInput = ({
  placeholder,
  setValue,
  options,
  clearValue,
  ...rest
}: SearchableInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const filteredOptions = options.filter((d) => d.label.includes(inputValue));

  const clearButton = () => {
    setIsSelected(false);
    setInputValue("");
    clearValue && clearValue();
  };

  return (
    <form className={style.container}>
      <Input
        placeholder={placeholder || "Ketik sesuatu"}
        value={inputValue}
        onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          if (e.target.value === "") {
            setIsSelected(false);
          }
        }}
        {...rest}
      />
      {isSelected === false && isFocus ? (
        <div className={style.select_container}>
          {filteredOptions.map((d, i) => {
            return (
              <p
                key={i}
                className={style.select_row}
                onClick={() => {
                  setValue(d);
                  setIsSelected(true);
                  setInputValue(d.label);
                  setIsFocus(false);
                }}
              >
                {d.label}
              </p>
            );
          })}
        </div>
      ) : undefined}
      {isSelected && (
        <button
          type="button"
          onClick={clearButton}
          className={style.clear_button}
        >
          <RxCross2 />
        </button>
      )}
    </form>
  );
};

export default SearchableInput;
