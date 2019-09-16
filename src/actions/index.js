import { default as api } from "../api/default";
import { arrayMove } from "react-sortable-hoc";
import {
  FETCH_PERSONS,
  FETCH_PERSON_FIELDS,
  REORDER_LIST,
  FETCH_PERSON,
  ADD_PERSON,
  DELETE_PERSON
} from "../actions/types";

export const fetchPersons = () => async dispatch => {
  const response = await api.get(`persons`);
  const response2 = await api.get(`personFields`);
  console.log(response2);

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
  const response = await api.get(`personFields`);
  dispatch({
    type: FETCH_PERSON_FIELDS,
    payload: response.data
  });
};

export const orderList = (
  oldIndex,
  newIndex,
  persons,
  pageNumber,
  personsPerPage
) => async dispatch => {
  const rightIndex = (pageNumber - 1) * personsPerPage;
  oldIndex += rightIndex;
  newIndex += rightIndex;

  const data = arrayMove(persons, oldIndex, newIndex);

  const newI = data.find((e, index) => index === newIndex);
  newI.OrderId = newIndex;
  const oldI = data.find((e, index) => index === oldIndex);
  oldI.OrderId = oldIndex;

  dispatch({
    type: REORDER_LIST,
    payload: data
  });
  await api.put(`/persons/${newI.ID}`, {
    "9a7786715d18924b981f7a5da75c0fa84c3a152f": newIndex
  });

  await api.put(`/persons/${oldI.ID}`, {
    "9a7786715d18924b981f7a5da75c0fa84c3a152f": oldIndex
  });
};

export const fetchPersonById = id => async dispatch => {
  const response = await api.get(
    `/persons/${id}`
  );
  dispatch({
    type: FETCH_PERSON,
    payload: response.data
  });
};

export const addNewPerson = person => async dispatch => {
  const response = await api.post(`/persons`, {
    ...person
  });
  dispatch({
    type: ADD_PERSON,
    payload: response.data
  });
};

export const deletePersonById = id => async dispatch => {
  await api.delete(`/persons/${id}`);
  dispatch({
    type: DELETE_PERSON,
    payload: id
  });
};
