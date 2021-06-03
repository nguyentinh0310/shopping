const Category = require("../models/categoryModel");

const categoryCtrl = {
  getMany: async (req, res, next) => {
    try {
      const categories = await Category.find({});
      res.json({ categories });
    } catch (err) {
      next(err);
    }
  },
  getSingleCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const data = req.body;

      const category = await Category.create(data);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const data = req.body;
      const id = req.body._id;
      if (!id) {
        throw new Error(`Require 'id' to update`);
      }
      const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators:true,
        useFindAndModify: false
      }); //không có {new:true} thì update chậm 1 nhịp
      res.json({ category });
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByIdAndRemove(id);
      res.json({ category });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryCtrl;
