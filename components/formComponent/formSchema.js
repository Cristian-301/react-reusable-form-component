// schemas/formSchema.js
import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "At least 6 characters").required("Password is required"),
    birthdate: yup.date().required("Date is required"),
    gender: yup.string().required("Gender is required"),
    country: yup.string().required("Country is required"),
    phone: yup.string().required("Phone is required").matches(/^\+?\d{10,14}$/, "Enter a valid phone number"),
    rating: yup
      .number()
      .min(1, "Please select a rating")
      .max(5)
      .required("Rating is required"),
    customCountry: yup.string().when("country", {
        is: "other",
        then:  (schema) => schema.required("Please specify your country"),
        otherwise: (schema) => schema.notRequired()
      }),
    newsletter: yup.boolean().oneOf([true], "You must accept the newsletter"),
    bio: yup.string().max(500, "Max 500 characters"),
    profilePicture: yup
    .mixed()
    .test("fileExists", "File is required", (value) => value?.length > 0),
  });