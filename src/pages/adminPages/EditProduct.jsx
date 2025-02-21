import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Textarea } from "../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import { Dropdown } from "../../components/dropdown";
import { useParams } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  author: yup.string().required("Tên tác giả không được để trống"),
  introduction: yup.string().required("Giới thiệu không được để trống"),
  price: yup.number().required("Giá không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
  image1: yup.string().required("Ảnh không được để trống"),
  image2: yup.string().required("Ảnh không được để trống"),
  image3: yup.string().required("Ảnh không được để trống"),
  image4: yup.string().required("Ảnh không được để trống"),
  image5: yup.string().required("Ảnh không được để trống"),
  image6: yup.string().required("Ảnh không được để trống"),
  image7: yup.string().required("Ảnh không được để trống"),
  image8: yup.string().required("Ảnh không được để trống"),
  stock: yup.number().required("Số lượng không được để trống"),
});

const categoriesData = ["architecture", "education"];

const EditProduct = () => {

  document.title = "Sửa sản phẩm - ABook";

  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        axios
          .get(`https://api-ebook.cyclic.app/api/products/${productId}`)
          .then((res) => {
            setProduct(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productId, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://api-ebook.cyclic.app/api/products/${productId}`,
        data
      );
      toast.success("Sửa sản phẩm thành công", {
        pauseOnHover: false,
        delay: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="bg-darkbg rounded-xl p-5">
        <h2 className="font-semibold text-3xl">Sửa thông tin sản phẩm</h2>
        <p className="">{product.name}</p>
        <form
          className="mt-10 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input
              type="text"
              name="name"
              control={control}
              placeholder="Nhập tên sách"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="author">Tên tác giả</Label>
            <Input
              type="text"
              name="author"
              control={control}
              placeholder="Nhập tên tác giả"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="introduction">Giới thiệu</Label>
            <Textarea
              name="introduction"
              control={control}
              placeholder="Nhập giới thiệu"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="price">Giá</Label>
            <Input
              type="number"
              name="price"
              control={control}
              placeholder="Nhập giá"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              name="description"
              control={control}
              placeholder="Nhập mô tả"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="category">Danh mục</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel(
                  "category",
                  "Select category"
                )}></Dropdown.Select>
              <Dropdown.List>
                {categoriesData.map((category) => (
                  <Dropdown.Option
                    key={category}
                    onClick={() =>
                      handleSelectDropdownOption("category", category)
                    }>
                    <span className="capitalize">{category}</span>
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 1</Label>
            <Input
              type="text"
              name="image1"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 2</Label>
            <Input
              type="text"
              name="image2"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 3</Label>
            <Input
              type="text"
              name="image3"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 4</Label>
            <Input
              type="text"
              name="image4"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 5</Label>
            <Input
              type="text"
              name="image5"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 6</Label>
            <Input
              type="text"
              name="image6"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 7</Label>
            <Input
              type="text"
              name="image7"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="images">Ảnh 8</Label>
            <Input
              type="text"
              name="image8"
              control={control}
              placeholder="Nhập ảnh"
              className="bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="stock">Số lượng</Label>
            <Input
              type="number"
              name="stock"
              control={control}
              placeholder="Nhập số lượng"
              className="bg-transparent text-white"
            />
          </div>
          <div className="my-5 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              type="submit">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditProduct;
