const defaultState = {
  posts: [],
  userName: null,
  postDetails: {},
  comments: [],
  userDetails: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload
      };
    case "POST_DETAILS":
      return {
        ...state,
        postDetails: action.payload
      };
    case "COMMENTS":
      return {
        ...state,
        comments: action.payload
      };
    case "POSTS":
      return {
        ...state,
        posts: action.payload
      };
    case "USER_NAME":
      return {
        ...state,
        userName: action.payload
      };
    default:
      return state;
  }
};
