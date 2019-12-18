
import { CONSTANTS } from "../actions";
const shortid = require('shortid');

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = title => {
  const id = shortid.generate();
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};