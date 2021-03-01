const initalState = {
  name: "alo",
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "ALO":
      return {...state};

    default:
      return state;
  }
};

export default reducer;
