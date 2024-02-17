import ProjectForm from "@/components/Dashboard/forms/ProjectForm";
import React, { Suspense } from "react";

function page() {
  return (
    <ProjectForm
      projectImg={
        "http://localhost:3000/_next/image?url=%2Fproject.png&w=1920&q=75"
      }
    />
  );
}

export default page;
