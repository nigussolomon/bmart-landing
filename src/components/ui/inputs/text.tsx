import { TextInput } from "@mantine/core";
import classes from "./style.module.css";
import React from "react";

export function ContainedInputs({
  label,
  placeholder,
  mt,
  mb,
  mr,
  ml,
  setValue,
  value,
  override = false,
  mutator,
  error,
  disabled,
  icon,
  mask,
}: {
  label: string;
  placeholder: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  setValue?: (value: string) => void;
  value?: string | number;
  override?: boolean;
  mutator?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  mask?: boolean;
}) {
  return (
    <>
      <TextInput
        disabled={disabled}
        type={mask ? "password" : "text"}
        value={value}
        onChange={(e) =>
          !override ? setValue?.(e.target.value) : mutator?.(e.target.value)
        }
        mt={mt}
        mb={mb}
        mr={mr}
        ml={ml}
        label={label}
        error={error}
        placeholder={placeholder}
        classNames={classes}
        rightSection={icon}
      />
    </>
  );
}
