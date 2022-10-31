import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./userRedux";
import cartReduce from "./cartRedux";
export default configureStore({
  reducer: {
    user: userReduce,
    cart: cartReduce,
  },
});
