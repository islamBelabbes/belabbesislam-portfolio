"use client";
import { GridLoader } from "react-spinners";

export default function Loading() {
  return (
    <GridLoader
      color="blue"
      size={10}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
