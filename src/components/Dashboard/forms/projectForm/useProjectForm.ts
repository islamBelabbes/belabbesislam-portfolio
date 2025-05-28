import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next13-progressbar";
import { Category } from "@/dto/categories";
import {
  CreateProject,
  UpdateProject,
  createProjectSchema,
  updateProjectSchema,
} from "@/schema/project";
import { Project } from "@/dto/projects";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/lib/react-query/mutations";
import { getDirtyFields } from "@/lib/utils";
import { safeAsync } from "@/lib/safe";
import { toast } from "react-toastify";
import { useState } from "react";
import { z } from "zod";
import { ImageSchema } from "@/lib/schema";
import { MEDIA_URL } from "@/constants/constants";

const gallerySchema = z.array(
  z.object({
    id: z.string(),
    image: ImageSchema,
  })
);

const updateProjectFormSchema = updateProjectSchema.extend({
  gallery: gallerySchema.optional(),
});

const createProjectFormSchema = createProjectSchema.extend({
  gallery: gallerySchema.optional(),
});

type CreateProjectForm = z.infer<typeof createProjectFormSchema>;
type UpdateProjectForm = z.infer<typeof updateProjectFormSchema>;

type ProjectFormValues = CreateProjectForm | UpdateProjectForm;

type LocalGallery = {
  id: string;
  image: string;
  isUploaded: boolean;
};

export const isInSelectedCategories = (
  selectedCategories: Category[],
  category: Category
) => {
  return selectedCategories?.some((item) => item.id === category?.id);
};

const useProjectForm = ({ initial }: { initial?: Project }) => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initial ? [...initial.categories] : []
  );
  const [renderedGallery, setRenderedGallery] = useState<LocalGallery[]>(
    initial?.gallery.map((i) => ({
      id: i.id.toString(),
      image: `${MEDIA_URL}/${i.image}`,
      isUploaded: false,
    })) ?? []
  );

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(
      (initial ? updateProjectFormSchema : createProjectFormSchema) as any
    ),
    defaultValues: {
      id: initial?.id,
      title: initial?.title,
      categories: initial?.categories.map((cat) => cat.id),
      description: initial?.description ?? undefined,
      url: initial?.url ?? undefined,
      github: initial?.github ?? undefined,
    },
  });

  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();

  const onSubmit = async (data: ProjectFormValues) => {
    if ("id" in data && initial) {
      const dirtyFields = form.formState.dirtyFields;

      const mappedData = {
        ...data,
        gallery: data.gallery?.map((item) => item.image) ?? [],
      };

      const dirtyData = {
        ...(getDirtyFields(dirtyFields, mappedData) as UpdateProject),
        id: data.id,
        categories: form.getValues("categories"), //this should be included both in post and patch,
      };

      const project = await safeAsync(updateMutation.mutateAsync(dirtyData));
      if (!project.success) {
        console.log(project.error);
        return toast.error("there was an error updating the project");
      }

      form.setValue("deletedGalleryImage", []);
      form.setValue("gallery", []);
      console.log("client", project);

      const newGal = project.data.gallery.map((item) => ({
        id: item.id.toString(),
        image: `${MEDIA_URL}/${item.image}`,
        isUploaded: false,
      }));
      console.log(newGal);

      setRenderedGallery(newGal);

      form.reset(form.getValues());
      return toast.success("project updated successfully");
    }

    const mappedData = {
      ...data,
      gallery: data.gallery?.map((item) => item.image) ?? [],
    };
    const project = await safeAsync(
      createMutation.mutateAsync(mappedData as CreateProject)
    );
    if (!project.success) return toast.error("an error occurred");

    toast.success("project created successfully");
    return router.push(`/dashboard/project/${project.data.id}`);
  };

  const onSelect = (value: Category, onChange: (...event: any[]) => void) => {
    // make sure the value in not already selected
    if (isInSelectedCategories(selectedCategories, value)) {
      const filtered = selectedCategories.filter((cat) => cat.id !== value.id);
      setSelectedCategories(filtered);
      return onChange([...filtered.map((item) => item.id)]);
    }

    const selected = [...selectedCategories, value];
    setSelectedCategories(selected);
    return onChange([...selected.map((item) => item.id)]);
  };

  const onGalleryRemove = (gallery: LocalGallery) => {
    const filtered = renderedGallery.filter((item) => item.id !== gallery.id);

    if (!gallery.isUploaded) {
      const deleted = form.getValues("deletedGalleryImage") ?? [];
      form.setValue("deletedGalleryImage", [...deleted, +gallery.id], {
        shouldDirty: true,
      });
    } else {
      const newGal =
        form.getValues("gallery")?.filter((item) => item.id !== gallery.id) ??
        [];
      form.setValue("gallery", newGal, { shouldDirty: true });
    }

    setRenderedGallery(filtered);
  };

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(onSubmit),
    },
    onSelect,
    setSelectedCategories,
    selectedCategories,
    onGalleryRemove,
    renderedGallery,
    setRenderedGallery,
  };
};

export default useProjectForm;
