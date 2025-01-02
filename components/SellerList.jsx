"use client";
import $axios from "@/lib/axios.instance";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { CircularProgress, Pagination } from "@mui/material";

const SellerList = () => {
  const [productList, setProductList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getSellerProduct = async () => {
      try {
        setIsPending(true);
        const res = await $axios.post("/product/seller/list", {
          page: page,
          limit: 2,
        });
        setIsPending(false);
        setProductList(res?.data?.productList);
      } catch (error) {
        setError("Something  went wrong.");
        setIsPending(false);
      }
    };
    getSellerProduct();
  }, [page]);
  if (isPending) {
    return <CircularProgress />;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="flex flex-col justify-between items-center gap-8">
      <div>
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>
      <Pagination
        page={page}
        count={5}
        color="secondary"
        className="my-12"
        size="large"
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default SellerList;
