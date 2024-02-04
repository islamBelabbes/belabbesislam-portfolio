"use client";

import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  children: JSX.Element[] | JSX.Element;
};
export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <ToastContainer />
      {children}
    </ThemeProvider>
  );
}
