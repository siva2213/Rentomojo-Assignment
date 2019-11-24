import api from "../helpers";

const postDetails = {
  getPostDetails: payload => {
    return dispatch => {
      return api({
        url: `/posts/${payload.id}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "POST_DETAILS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  getComments: payload => {
    return dispatch => {
      return api({
        url: `/comments?postId=${payload.id}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "COMMENTS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  deletePost: payload => {
    return dispatch => {
      return api({
        url: `/posts/${payload.id}`,
        method: "DELETE"
      })
        .then(resp => {
          if (resp) {
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  }
};

export default postDetails;
