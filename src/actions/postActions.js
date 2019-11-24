import api from "../helpers";

const posts = {
  getPosts: payload => {
    return dispatch => {
      return api({
        url: `/posts?userId=${payload.id}&skip=${payload.skip}&limit=${payload.limit}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "POSTS",
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
  
};

export default posts;
