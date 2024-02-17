"use client";

import { ThemeProvider } from "next-themes";
import { Next13ProgressBar } from "next13-progressbar";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  children: JSX.Element[] | JSX.Element;
};
export function Providers({ children }: Props) {
  return (
    <>
      <ToastContainer />
      <Next13ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: true }}
      />
      {children}
    </>
  );
}
export function RootProviders({ children }: Props) {
  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </>
  );
}
