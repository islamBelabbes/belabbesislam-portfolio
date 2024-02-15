import CreateProjectForm from "@/components/Dashboard/forms/CreateProjectForm";
import React, { Suspense } from "react";

function page() {
  return (
    <CreateProjectForm
      projectImg={
        "http://localhost:3000/_next/image?url=%2Fproject.png&w=1920&q=75"
      }
    />
  );
}

export default page;
