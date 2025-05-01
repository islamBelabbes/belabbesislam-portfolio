import { PAGINATION } from "@/constants/constants";
import {
  countProjects,
  createProject,
  deleteProject,
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
    const uploadedGallery = await Promise.all(
      gallery.map((image) => utapi.uploadFiles(image))
    );
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
  const { image, ...rest } = data;

  const project = await getProjectByIdUseCase(rest.id); // this will throw if not found

  const categories = await getCategoriesByIds(data.categories);

  if (categories.length !== data.categories.length) {
    throw new AppError("one or more Invalid categories", 400);
  }

  let _image: string | undefined;
  if (image) {
    const [_, uploadedImage] = await Promise.all([
      utapi.deleteFiles(project.image),
      utapi.uploadFiles(image),
    ]);

    if (uploadedImage.error) throw new AppError("Error uploading image");
    _image = uploadedImage.data.key;
  }

  return updateProject({
    ...rest,
    image: _image,
  });
};

export const deleteProjectUseCase = async (id: Id, user?: User) => {
  if (!user?.isAdmin) throw new AuthError();

  const { gallery, ...project } = await getProjectByIdUseCase(id);
  const filesToDelete = [...gallery.map((item) => item.image), project.image];

  await Promise.all([utapi.deleteFiles(filesToDelete), deleteProject(id)]);
  return true;
};
