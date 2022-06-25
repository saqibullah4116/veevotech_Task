const ErrorHander = require("../utils/errorhander");
const catchAsynchError = require("../middleware/catchAsyncErrors");
const User = require("../modules/userModels");

//Registering a user
exports.registerUser = catchAsynchError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    image: {
      public_id: "this is sample id",
      url: " url will be from cloudinary",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// user login

exports.loginUser = catchAsynchError(async (req, res, next) => {
  const { email, password } = req.body;

  //check wheather user has enter eamil and password
  if (!email || !password) {
    return next(new ErrorHander("Please enter your email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
