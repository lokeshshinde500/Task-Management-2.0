import mongoose from "mongoose";
import constant from "./constant.js";
 
const db = async () => {
  await mongoose
    .connect(constant.DB_URL)
    .then(() => {
      console.log("DB connected successfully :)");
    })
    .catch((error) => {
      console.erroror("DB not connected!", error);
    });
};

export default db;
