"use client";
import { productCategories } from "@/constants/general.constant";
import $axios from "@/lib/axios.instance";
import { addProductValidationSchema } from "@/validation-schema/add.product.validation.schema";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AddProduct = () => {

  const router =useRouter();
   const { isPending, error, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values);
    },
    onSuccess: (res) => {
   router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        brand: "",
        price: "",
        quantity: "",
        category: "",
        freeShipping: false,
        description: "",
      }}
      validationSchema={addProductValidationSchema}
      onSubmit={(values) => {
      mutate(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="auth-form min-w-[450px]"
          >
            <Typography variant="h4">Add Product</Typography>
            <FormControl fullWidth>
              <TextField label="Name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Brand" {...formik.getFieldProps("brand")} />
              {formik.touched.brand && formik.errors.brand ? (
                <FormHelperText error>{formik.errors.brand}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="price"
                {...formik.getFieldProps("price")}
                type="number"
              />
              {formik.touched.errors && formik.touched.price ? (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Quantity"
                {...formik.getFieldProps("quantity")}
                type="number"
              />
              {formik.touched.quantity && formik.touched.quantity ? (
                <FormHelperText error>{formik.errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select {...formik.getFieldProps("category")} label="Category">
                {productCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              {formik.touched.category && formik.errors.category ? (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                {...formik.getFieldProps("description")}
                multiline
                rows={6}
                label="Description"
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl
              fullWidth
              sx={{ display: "flex", alignItems: "self-start" }}
            >
              <FormControlLabel
                control={<Checkbox {...formik.getFieldProps("freeShipping")} />}
                label="Free Shipping"
                labelPlacement="start"
              />
            </FormControl>
            {/* {console.log(formik.errors)} */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;