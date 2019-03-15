import { default as pipedrive } from "../api/default";
import { api_tokken } from "../api/api";
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
  await pipedrive.put(`/persons/${newI.ID}?api_token=${api_tokken}`, {
    "924f2715df861882889257f4031a080be2b08c1c": newIndex
  });

  await pipedrive.put(`/persons/${oldI.ID}?api_token=${api_tokken}`, {
    "924f2715df861882889257f4031a080be2b08c1c": oldIndex
  });
};

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

export const deletePersonById = id => async dispatch => {
  await pipedrive.delete(`/persons/${id}?api_token=${api_tokken}`);
  dispatch({
    type: DELETE_PERSON,
    payload: id
  });
};
