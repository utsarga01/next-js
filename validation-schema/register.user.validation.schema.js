import * as Yup from "yup";
export const registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("Required")
    .max(15, "Name must be at max 15 characters.")
    .trim(),
  lastName: Yup.string()
    .required("Required")
    .max(15, "Name must be at max 15 characters")
    .trim(),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required")
    .max(55, "Email must be at max 55 characters.")
    .trim()
    .lowercase(),
  password: Yup.string()
    .required("Password is required")
    .max(20, "Password must be at max 20 characters."),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "others"]),
  role: Yup.string().required("Role is required").oneOf(["buyer", "seller"]),
});
