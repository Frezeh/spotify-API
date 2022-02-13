import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const addLibrary = (library) => ({
  type: ActionTypes.ADD_LIBRARY,
  payload: library,
});

export const addMyLibrary = (token, track) => async (dispatch) => {
  const id = `${track.id}`;
  try {
    const data = await axios.put("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
        params: {
          q: id,
        },
      },
    });
    dispatch(addLibrary(data));
    alert(id);
  } catch (error) {
    alert(error);
  }
};

export const fetchMyLibrary = (token) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const data = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addLibrary(data));
  } catch (error) {
    alert(error);
  }
};

export const addNewReleaseLibrary = (token, news) => async (dispatch) => {
  const id = `${news.id}`;

  try {
    const data = await axios.put("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
        params: {
          q: [id],
        },
      },
    });
    dispatch(addLibrary(data));
  } catch (error) {
    alert(error);
  }
};

export const removeLibrary = (token, news) => async (dispatch) => {
  const id = `${news.id}`;

  try {
    const data = await axios.delete("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
        params: {
          q: id,
        },
      },
    });
    dispatch(addLibrary(data));
  } catch (error) {
    alert(error);
  }
};
