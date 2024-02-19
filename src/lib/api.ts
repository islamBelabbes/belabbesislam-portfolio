import { TCategory, TProject, TToken } from "@/types";

import { v4 as uuidv4 } from "uuid";
import { tryCatch, urlToBlob } from "./utils";

type TCreateCategory = Omit<TCategory, "id"> & TToken;
type TCreateProject = Omit<TProject, "categories"> & TToken;
type TUploadImage = { image: Blob; folder: "projects" | "category" } & TToken;

export const createCategory = async ({ image, name }: TCreateCategory) => {
  const imageToUpload = await urlToBlob(image);
  if (!imageToUpload) throw new Error("image not found");

  const supabase = createSupabaseBrowserClient();

  const [path, mediaError] = await tryCatch(
    uploadImage(imageToUpload, "category")
  );
  if (mediaError) throw mediaError;

  const { error } = await supabase.from("categories").insert({
    name,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${path}`,
  });

  if (error) throw error;
  return true;
};

export const createProject = async ({
  description,
  image,
  title,
  url,
}: TCreateProject) => {
  const imageToUpload = await urlToBlob(image);
  if (!imageToUpload) throw new Error("image not found");

  const supabase = createSupabaseBrowserClient(null);

  const [path, mediaError] = await tryCatch(
    uploadImage(imageToUpload, "projects")
  );
  if (mediaError) throw mediaError;

  const { data, error } = await supabase.from("projects").insert({
    description,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/${path}`,
    title,
    url,
  });
  if (error) throw error;

  return true;
};

export const uploadImage = async ({ folder, image }: TUploadImage) => {
  if (!image) return;

  const supabase = createSupabaseBrowserClient(null);

  const { data, error } = await supabase.storage
    .from("media")
    .upload(`${folder}/${uuidv4()}.jpg`, image);

  if (error) throw error;
  return data.path;
};
