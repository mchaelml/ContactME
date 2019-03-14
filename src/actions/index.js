import { default as pipedrive } from "../api/default";
import { api_tokken } from "../api/api";
import {
  FETCH_PERSONS,
  FETCH_PERSON_FIELDS,
  REORDER_LIST,
  FETCH_PERSON,
  EDIT_PERSON,
  ADD_PERSON,
  DELETE_PERSON
} from "../actions/types";

export const fetchPersons = () => async dispatch => {
  const response = await pipedrive.get(`persons?api_token=${api_tokken}`);
  const response2 = await pipedrive.get(`personFields?api_token=${api_tokken}`);

  response.data.data.forEach(item =>
    Object.values(response2.data)[1].forEach(key => {
      if (Object.keys(item === key.key)) {
        Object.defineProperty(
          item,
          key.name,
          Object.getOwnPropertyDescriptor(item, key.key)
        );
        delete item[key.key];
      }
    })
  );

  dispatch({
    type: FETCH_PERSONS,
    payload: response.data
  });
};

export const fetchPersonFields = () => async dispatch => {
  const response = await pipedrive.get(`personFields?api_token=${api_tokken}`);
  dispatch({
    type: FETCH_PERSON_FIELDS,
    payload: response.data
  });
};

export function orderList(oldIndex, newIndex) {
  return {
    type: REORDER_LIST,
    payload: { oldIndex, newIndex }
  };
}

export const fetchPersonById = id => async dispatch => {
  const response = await pipedrive.get(
    `/persons/${id}?api_token=${api_tokken}`
  );
  dispatch({
    type: FETCH_PERSON,
    payload: response.data
  });
};

export const addNewPerson = person => async dispatch => {
  const response = await pipedrive.post(`/persons?api_token=${api_tokken}`, {
    ...person
  });
  dispatch({
    type: ADD_PERSON,
    payload: response.data
  });
};

export const editPersonById = (id, person) => async dispatch => {
  const response = await pipedrive.put(
    `/persons/${id}?api_token=${api_tokken}`,
    person
  );
  dispatch({
    type: EDIT_PERSON,
    payload: response.data
  });
};

export const deletePersonById = id => async dispatch => {
  await pipedrive.delete(`/persons/${id}?api_token=${api_tokken}`);
  dispatch({
    type: DELETE_PERSON,
    payload: id
  });
};
