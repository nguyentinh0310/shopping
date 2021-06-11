const Product = require("../models/productModel");
// const Category = require("../models/categoryModel");
const APIFeature = require("../middlewares/apiFeatures");
const cloudinary = require("cloudinary");

const productCtrl = {
  // lấy nhiều product
  getMany: async (req, res, next) => {
    try {
      const resPerPage = 6;
      const productsCount = await Product.countDocuments();

      // const categegoryApi = new APIFeature(Category, {
      //   name: req.query.categories,
      // }).filter();

      // let categories = await categegoryApi.query;

      //categiries: [abc, xyz]
      // {categories: {$in: ["abc"]}}

      const apiFeatures = new APIFeature(
        Product.find(),
        // { categories: { $in: categories.map((c) => c._id) } },
        req.query
      )
        .search()
        .filter();

      let products = await apiFeatures.query;
      let filteredProductsCount = products.length;

      apiFeatures.pagination(resPerPage);
      products = await apiFeatures.query;

      res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
      });

      apiFeatures.pagination(resPerPage);
      products = await apiFeatures.query;
    } catch (err) {
      next(err);
    }
  },
  async getAll(req, res, next) {
    try {
      const productsCount = await Product.countDocuments();

      const products = await Product.find();

      res.status(200).json({
        success: true,
        productsCount,
        products,
      });
    } catch (err) {
      next(err);
    }
  },
  // lấy 1 products
  getSingleProduct: async (req, res, next) => {
    try {
      const id = req.params.id;

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không có sản phẩm nào cả",
        });
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      next(err);
    }
  },

  // tạo products mới
  create: async (req, res, next) => {
    try {
      // upload ảnh sản phẩm
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
      req.body.user = req.user.id;

      const product = await Product.create(req.body);
      // if(!data) return res.status(400).json({
      //   success: false,
      //   message: "Vui lòng nhập các trường",
      // });
      res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        product,
      });
    } catch (err) {
      next(err);
    }
  },
  // cập nhật product
  update: async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không có sản phẩm nào cả",
        });
      }

      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      if (images !== undefined) {
        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        req.body.images = imagesLinks;
      }

      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      next(err);
    }
  },
  // xóa product
  delete: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không có sản phẩm nào cả",
        });
      }

      // xóa ảnh
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      await product.remove();

      res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      next(err);
    }
  },

  // Review
  createProductReview: async (req, res, next) => {
    try {
    

      res.status(200).json({
        success: true,
        message: "Bình luận thành công",
      });
    } catch (err) {
      next(err);
    }
  },
  // get product reviews
  getProductReviews: async (req, res, next) => {
    try {
      const product = await Product.findById(req.query.id);

      res.status(200).json({
        success: true,
        reviews: product.reviews,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteProductReviews: async (req, res, next) => {
    try {
      const product = await Product.findById(req.query.productId);

      const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req.query.id.toString()
      );

      const numberOfReviews = reviews.length;

      const ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        reviews.length;

      await Product.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numberOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productCtrl;
