import { combineReducers } from "redux";
import personsReducer from "./personsReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  form: formReducer,
  persons: personsReducer
});
