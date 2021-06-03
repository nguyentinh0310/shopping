const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Xin mời nhập tất cả các trường 😢" });
      }
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Mật khẩu phải lớn hơn hoặc bằng 6 😢" });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ message: "Email này đã tồn tại 😢" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/api/auth/activation/${activation_token}`;
      const message = `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng tới SHOPPING APP.</h2>
          <p>Xin chúc mừng! Bạn sắp bắt đầu sử dụng SHOPPING APP.
          Chỉ cần nhấp vào nút bên dưới để xác thực địa chỉ email của bạn.
          </p>

          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Xác nhận email</a>

          <p>Nếu nút không hoạt động vì bất kỳ lý do gì, bạn cũng có thể nhấp vào liên kết bên dưới:</p>

          <div>${url}</div>
          </div>`;

      await sendMail({
        email: newUser.email,
        subject: "Shopping app password Recovery",
        message,
      });
      res.status(200).json({
        message: "Đăng ký thành công! Xin mời xác nhận email để bắt đầu",
      });
    } catch (err) {
      next(err);
    }
  },

  activateEMail: async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ message: "Email đã tồn tại. 😢" });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      res.status(201).json({
        message: "Tài khoản đã được kích hoạt 😇 ",
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const formatedEmail = String(email).trim().toLowerCase();
      if (!formatedEmail || !password)
        return res
          .status(400)
          .json({ message: "Xin mời nhập email hoặc mật khẩu 😢" });

      const user = await Users.findOne({ email: formatedEmail });
      if (!user)
        return res.status(400).json({ message: "Email không tồn tại 😢!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng 😢!" });

      const refresh_token = createRefreshToken({ id: user._id }); // xét mã id
      res.cookie("refresh_token", refresh_token, {
        httpOnlly: true,
        path: "/api/auth/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
      });

      res.status(200).json({ message: "Đăng nhập thành công!", user });
    } catch (err) {
      next(err);
    }
  },

  getAccessToken: async (req, res, next) => {
    try {
      const rf_token = req.cookies.refresh_token;
      if (!rf_token)
        res.status(400).json({ message: "Đăng nhập ngay bây giờ" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          res.status(400).json({ message: "Hãy đăng nhập ngay bây giờ" });

        const access_token = createAccessToken({ id: user.id });

        res.status(200).json({ access_token });
      });
    } catch (err) {
      next(err);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email)
        return res.status(400).json({ message: "Xin mời nhập email 😢!" });

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Email không tồn tại" });

      const access_token = createAccessToken({ id: user.id });
      const url = `${CLIENT_URL}/api/auth/reset-password/${access_token}`;

      const message = `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng tới SHOPPING APP.</h2>
      <p>Xin chúc mừng! Bạn sắp bắt đầu sử dụng SHOPPING APP.
      Chỉ cần nhấp vào nút bên dưới để xác thực địa chỉ email của bạn.
      </p>

      <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Cài đặt lại mật khẩu</a>

      <p>Nếu nút không hoạt động vì bất kỳ lý do gì, bạn cũng có thể nhấp vào liên kết bên dưới:</p>

      <div>${url}</div>
      </div>`;

      await sendMail({
        email: user.email,
        subject: "Shopping app password Recovery",
        message,
      });
      res.status(200).json({
        message: "Gửi lại mật khẩu, vui lòng kiểm tra email của bạn.",
      });
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      if (!password)
        return res.status(400).json({ message: "Xin mời nhập mật khẩu 😢!" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Mật khẩu phải lớn hơn hoặc bằng 6 😢" });

      const passwordHash = await bcrypt.hash(password, 10);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.status(200).json({ message: "Mật khẩu thay đổi thành công" });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      res.clearCookie("refresh_token", { path: "/api/auth/refresh_token" });
      res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (err) {
      next(err);
    }
  },

  getUserInfor: async (req, res, next) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const { name, avatar } = req.body;
      if (!name)
        return res.status(400).json({ message: "Xin mời nhập lại tên 😢!" });

      await Users.findByIdAndUpdate(
        req.user.id,
        { name, avatar },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({ message: "Cập nhập thông tin thành công!" });
    } catch (err) {
      next(err);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const { password_old, password } = req.body;
      if (!password)
        return res.status(400).json({ message: "Xin mời nhập mật khẩu 😢!" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Mật khẩu phải lớn hơn hoặc bằng 6 😢" });

      const user = await Users.findById(req.user.id);

      const isMatch = await bcrypt.compare(password_old, user.password); // (user.password là mật khẩu id hiện tại xét nhập trùng khớp không)
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng" });

      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;

      await user.save();
      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    } catch (err) {
      next(err);
    }
  },


  updatePassword: async (req, res, next) => {
    try {
      const { password_old, password } = req.body;
      if (!password)
        return res.status(400).json({ message: "Xin mời nhập mật khẩu 😢!" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Mật khẩu phải lớn hơn hoặc bằng 6 😢" });

      const user = await Users.findById(req.user.id);

      const isMatch = await bcrypt.compare(password_old, user.password); // (user.password là mật khẩu id hiện tại xét nhập trùng khớp không)
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng" });

      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;

      await user.save();
      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    } catch (err) {
      next(err);
    }
  },

  getUsersAllInfor: async (req, res, next) => {
    try {
      const users = await Users.find().select("-password");

      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  },

  getUserDetail: async (req, res, next) => {
    try {
      const user = await Users.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: `Không tìm thấy người dùng có id: ${req.params.id}`,
        });
      }
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  },

  updateUsersRole: async (req, res, next) => {
    try {
      const { role } = req.body;

      await Users.findByIdAndUpdate(
        req.params.id,
        { role },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({ message: "Cập nhập người dùng thành công!" });
    } catch (err) {
      next(err);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      await Users.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Xóa người dùng thành công!" });
    } catch (err) {
      next(err);
    }
  },
  googleLogin: async (req, res, next) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      // console.log(verify);
      const { email_verified, name, email, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 10);

      if (email_verified) {
        const user = await Users.findOne({ email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return res.status(400).json({ message: "Mật khẩu không đúng" });

          const refresh_token = createRefreshToken({ id: user._id }); // xét mã id
          res.cookie("refresh_token", refresh_token, {
            httpOnlly: true,
            path: "/api/auth/refresh_token",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
          });
          res.status(200).json({ message: "Đăng nhập thành công!" });
        } else {
          const newUser = new Users({
            name,
            email,
            password: passwordHash,
            avatar: picture,
          });

          await newUser.save();

          const refresh_token = createRefreshToken({ id: newUser._id });
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/user/refresh_token",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.status(200).json({ message: "Đăng nhập thành công!" });
        }
      }
    } catch (err) {
      next(err);
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
