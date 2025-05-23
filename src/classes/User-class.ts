import {z} from "zod/v4";

export const UserSchema = z.object({
  // email : z
  //   .string()
  //   .describe("Email")
  //   .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {message: "email_regex"}),
  username : z
    .string()
    .describe("Username")
    .min(4, {error : "min_length"})
    .max(20, {error : "max_length"}),
  password : z
    .string()
    .describe("Password")
    .min(4, {error : "min_length"})
    .max(20, {error : "max_length"})
    // The rest might not fit
    // .regex(/^(?=.*\d).+$/, {error : "no_numbers"})
    // .regex(/^(?=.*[a-z]).+$/, {error : "no_lowercase"})
    // .regex(/^(?=.*[A-Z]).+$/, {error : "no_uppercase"})
    // .regex(/^(?=.*[#?!@$%^&*-]).+$/, {error: "no_special_characters"})

})

export type User = z.infer<typeof UserSchema>;
