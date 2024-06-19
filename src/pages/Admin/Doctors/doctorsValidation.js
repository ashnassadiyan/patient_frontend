import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("PasslastNameword is required"),
  specialized: Yup.string().required("specialized is required"),
});

export default validationSchema;
