import {z} from "zod";

export const TaskSchema = z.object({
  task_id: z.number().nonnegative().default(1).describe("ID of a task"),
  task_name: z.string().describe("Name of a task"),
  task_description : z.string().optional().describe("Description of a task"),
  task_created : z.string().date().default(() => {const d = new Date(); return d.toISOString().split("T")[0]}),
  task_date : z.string().date(),
  task_status : z.enum(["Finished", "On Progress", "Expired", "Archived"]).default("On Progress"),
})

export type Task = z.infer<typeof TaskSchema>;
