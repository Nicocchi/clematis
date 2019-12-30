import { CONSTANTS } from "../actions";
const shortid = require("shortid");

export const addCard = (listID, text) => {
    const id = shortid.generate();
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID, id }
    };
};

export const editCard = (id, listID, newText) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: { id, listID, newText }
    };
};

export const deleteCard = (id, listID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { id, listID }
    };
};

export const editChecklistBool = (id, index, index2) => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.EDIT_CARD_CHECKLIST_BOOL,
            payload: { id, index, index2 }
        });
    };
};

export const deleteChecklist = (id, checklistID) => {
    return {
        type: CONSTANTS.DELETE_CHECKLIST,
        payload: { id, checklistID }
    };
};

export const addChecklistItem = (id, checklistID, text) => {
    return {
        type: CONSTANTS.ADD_CHECKLIST_ITEM,
        payload: { id, checklistID, text }
    };
};

export const addChecklist = (id, text) => {
    const checklistID = shortid.generate();
    return {
        type: CONSTANTS.ADD_CHECKLIST,
        payload: { id, checklistID, text }
    };
};
