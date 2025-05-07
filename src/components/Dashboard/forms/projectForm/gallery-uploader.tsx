// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { cn } from "@/lib/utils";
// import { Images } from "lucide-react";
// import { nanoid } from "nanoid";

// export type GalleryItem = {
//   id: string;
//   file: File;
// };

// type GalleryUploadProps = {
//   gallery: GalleryItem[];
//   setGallery: (image: GalleryItem[]) => void;
//   className?: string;
//   disabled?: boolean;
// };

// const GalleryUploader = ({
//   gallery,
//   setGallery,
//   className,
//   disabled = false,
// }: GalleryUploadProps) => {
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const fields = acceptedFiles.map((file) => ({
//         id: nanoid(),
//         file,
//       }));
//       return setGallery([...gallery, ...fields]);
//     },
//     [setGallery, gallery]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/png": [".png", ".jpg", ".jpeg"],
//     },
//     multiple: true,
//   });

//   return (
//     <div
//       {...getRootProps({
//         onClick: (event) => disabled && event.stopPropagation(),
//       })}
//       className={cn(
//         "dropzone rounded-md w-[200px] aspect-video cursor-pointer flex items-center justify-center border  text-sm gap-1 bg-gray-950/10",
//         className
//       )}
//     >
//       <input
//         {...getInputProps({ className: "dropzone" })}
//         disabled={disabled}
//       />
//       <Images />
//       add to gallery
//     </div>
//   );
// };

// export default GalleryUploader;
