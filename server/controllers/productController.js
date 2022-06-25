const Product = require("../modules/productHuntModule");
const ErrorHander = require("../utils/errorhander");
const catchAsynchError = require("../middleware/catchAsyncErrors");

// ApiFeatures is used for search
const ApiFeatures = require("../utils/apifeatures");

// Creating product

exports.creatProduct = catchAsynchError(async (req, res, next) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// getting all the products
exports.getAllProducts = catchAsynchError(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  // const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// updating the product
exports.updataProduct = catchAsynchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
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
});

//Deleting a product

exports.deleteProduct = catchAsynchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  await Product.remove();

  res.status(200).json({
    success: true,
    message: "product has been deleted successfully",
  });
});

//getting a single product
exports.getSingleProduct = catchAsynchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
