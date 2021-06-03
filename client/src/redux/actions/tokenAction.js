import axios from "axios";
import { GET_TOKEN } from "../contants/userContant";

export const getToken = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/auth/refresh_token", config);

    dispatch({
      type: GET_TOKEN,
      payload: data.access_token,
    });
  } catch (err) {

  }
};
