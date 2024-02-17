import * as z from "zod";

const MAX_FILE_SIZE = 2048000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const challengeFormSchema = z.object({
  name: z
    .string()
    .min(12, { message: "Challenge title should be minimum 12 characters" }),
  description: z
    .string()
    .min(12, { message: "Description should be minimum 60 characters." }),
  start_date: z.date(),
  end_date: z.date(),
  few: z.array(z.string().nonempty("A string cannot be empty")),

  image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});