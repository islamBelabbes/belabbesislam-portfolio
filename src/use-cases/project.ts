import { PAGINATION } from "@/constants/constants";
import {
  countProjects,
  createProject,
  deleteProject,
  getGallery,
  getProjectById,
  getProjects,
  updateProject,
} from "@/data-access/project";
import { User } from "@/dto/users";
import { AppError, AuthError, NotFoundError } from "@/lib/error";
import { Id } from "@/lib/schema";
import { utapi } from "@/lib/upload-thing";
import { CreateProject, GetProjects, UpdateProject } from "@/schema/project";
import { QueryWithPagination } from "@/types";
import generatePagination from "@/lib/generate-pagination";
import { getCategoriesByIds } from "@/data-access/category";
import { UploadFileResult, UploadedFileData } from "uploadthing/types";

export const getProjectsUseCase = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  categoryId,
}: QueryWithPagination<GetProjects> = {}) => {
  const projectP = getProjects({ limit, page, categoryId });
  const countProjectsP = countProjects({ categoryId });
  const [count, projects] = await Promise.all([countProjectsP, projectP]);

  return {
    data: projects,
    ...generatePagination({
      limit,
      page,
      total: count,
    }),
  };
};

export const getProjectByIdUseCase = async (id: Id) => {
  const project = await getProjectById(id);
  if (!project) throw new NotFoundError();

  return project;
};

export const createProjectUseCase = async (
  data: CreateProject,
  user?: User
) => {
  if (!user?.isAdmin) throw new AuthError();

  const categories = await getCategoriesByIds(data.categories);
  if (categories.length !== data.categories.length) {
    throw new AppError("one or more Invalid categories", 400);
  }

  const { image, gallery, ...rest } = data;
  const uploadedImage = await utapi.uploadFiles(image);
  if (uploadedImage.error) throw new AppError("Error uploading image");

  let galleryKeys: string[] | undefined;
  if (gallery) {
    // for this use case i assume that upload-thing will not throw any error.
    const uploadedGallery = await utapi.uploadFiles(gallery);

    console.log("createProjectUseCase-upload-thing", uploadedGallery);

    galleryKeys = uploadedGallery
      .map((item) => item.data?.key)
      .filter(Boolean) as string[];
  }

  return createProject({
    ...rest,
    image: uploadedImage.data.key,
    gallery: galleryKeys,
  });
};

export const updateProjectUseCase = async (
  data: UpdateProject,
  user?: User
) => {
  if (!user?.isAdmin) throw new AuthError();
  const { image, gallery, deletedGalleryImage, ...rest } = data;

  const project = await getProjectByIdUseCase(rest.id); // this will throw if not found

  const categories = await getCategoriesByIds(data.categories);

  if (categories.length !== data.categories.length) {
    throw new AppError("one or more Invalid categories", 400);
  }

  const fileToDelete: string[] = [];

  let _image: string | undefined;
  if (image) {
    fileToDelete.push(project.image);

    const uploadedImage = await utapi.uploadFiles(image);
    if (uploadedImage.error) throw new AppError("Error uploading image");
    _image = uploadedImage.data.key;
  }

  // handle deleted gallery images
  if (deletedGalleryImage?.length) {
    const gallery = await getGallery(deletedGalleryImage);
    fileToDelete.push(...gallery);
  }

  // upload new gallery images
  let _gallery: string[] | undefined;
  if (gallery?.length) {
    const uploadedGallery = await utapi.uploadFiles(gallery);

    console.log("updateProjectUseCase-upload-thing", uploadedGallery);

    // if there's any error log it
    const errors = uploadedGallery.filter((item) => item.error);
    if (errors.length > 0) {
      console.log("errors from upload thing", errors);
    }

    _gallery = uploadedGallery
      .map((item) => item.data?.key)
      .filter(Boolean) as string[];
  }

  fileToDelete.length && (await utapi.deleteFiles(fileToDelete));

  return updateProject({
    ...rest,
    image: _image,
    deletedGalleryImage,
    gallery: _gallery,
  });
};

export const deleteProjectUseCase = async (id: Id, user?: User) => {
  if (!user?.isAdmin) throw new AuthError();

  const { gallery, ...project } = await getProjectByIdUseCase(id);
  const filesToDelete = [...gallery.map((item) => item.image), project.image];

  const [uploadThing] = await Promise.all([
    utapi.deleteFiles(filesToDelete),
    deleteProject(id),
  ]);
  console.log("deleteProjectUseCase-upload-thing", uploadThing);

  return true;
};
