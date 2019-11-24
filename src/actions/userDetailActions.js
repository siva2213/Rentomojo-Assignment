import api from "../helpers";

const userDetails = {
  setUserName: payload => {
    return dispatch => {
      dispatch({
        type: "USER_NAME",
        payload: payload.name
      });
    };
  },
  getUserDetails: payload => {
    return dispatch => {
      return api({
        url: `/users`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            resp.forEach(userObj => {
              userObj["key"] = userObj.id;
            });
            dispatch({
              type: "USER_DETAILS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  }
};

export default userDetails;
