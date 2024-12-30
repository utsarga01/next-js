"use client";

import { loginUserValidationSchema } from "@/validation-schema/login.user.validation.schema";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter(); //hooks
  return (
    <Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginUserValidationSchema}
        onSubmit={async (values) => {
          try {
            const response = await axios.post(
              "http://localhost:8080/user/login",
              values
            );

            localStorage.setItem("token", response?.data?.accessToken);
            localStorage.setItem("userRole", response.data.userDetails.role);
            router.push("/");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-between items-center max-w-[400px] shadow-2xl
              shadow-slate-500 px-8 py-4 min-h-[400px]"
            >
              <p className="text-3xl font-bold">Sign in</p>
              {/* email */}
              <FormControl fullWidth>
                <TextField label="Email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              {/* password */}
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
              >
                login
              </Button>
              <div className="text-xs text-gray-500 justify-self-center">
                <Link href={"/register"}>New here? Register</Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
