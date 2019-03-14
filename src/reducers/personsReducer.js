import { arrayMove } from "react-sortable-hoc";

import {
  ADD_PERSON,
  DELETE_PERSON,
  FETCH_PERSON,
  FETCH_PERSONS,
  EDIT_PERSON,
  REORDER_LIST
} from "../actions/types";

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_PERSONS:
      return {
        ...state,
        persons: payload.data,
        organizations: payload.related_objects.organization,
        user: payload.related_objects.user
      };
    case FETCH_PERSON:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_PERSON:
      return { ...state, persons: [...state.persons, payload.data] };
    case EDIT_PERSON:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PERSON:
      return { ...state, persons: state.persons.filter(e => e.ID !== payload) };
    case REORDER_LIST:
      return {
        ...state,
        persons: arrayMove(
          state.persons,
          action.payload.oldIndex,
          action.payload.newIndex
        )
      };
    default:
      return state;
  }
};
