import CreatePostForm from "@/components/Dashboard/forms/CreatePostForm";
import React from "react";

function page() {
  return (
    <CreatePostForm
      postImg={
        "http://localhost:3000/_next/image?url=%2Fproject.png&w=1920&q=75"
      }
    />
  );
}

export default page;
