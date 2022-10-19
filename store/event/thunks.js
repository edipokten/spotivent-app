import { apiUrl } from "../../config/constants";
import axios from "axios";
import { setEvents } from "./slice";
import { selectToken } from "../user/selectors";
// import { appLoading, appDoneLoading, setMessage } from "../appState/slice";

export const getEvents = (startDate, finishDate) => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      const response = await axios.get(`${apiUrl}/user/event`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate,
          finishDate,
        },
      });
      console.log(response.data[0].artists[0].genres);

      dispatch(setEvents(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
