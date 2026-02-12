import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";

export const stopPropagationOnEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    e.stopPropagation();
  }
};

export const preventDefault = (e: MouseEvent | FocusEvent | KeyboardEvent) => {
  e.preventDefault();
};

export const stopPropagation = (e: MouseEvent | FocusEvent | KeyboardEvent) => {
  e.stopPropagation();
};

export const preventDefaultAndStopPropagation = (e: MouseEvent | FocusEvent | KeyboardEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export const returnTrue = () => true;

export const returnFalse = () => false;

export const returnVoid = () => {};
