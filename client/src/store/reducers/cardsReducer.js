import { CONSTANTS } from "../actions";

const initialState = {
    "card-0": {
        id: `card-0`,
        list: "list-0",
        text: "Refactoring",
        description: "I will add notes here for refactoring needs to clean up the code. When you make a pull request, have staff and/or peer review (Ready for QA) before merging",
        checklists: [
            {
                id: `checklist-0`,
                title: "Checklist 1",
                content: [
                    {
                        text: "Clean up branches",
                        checked: false
                    },
                    {
                        text: "Clean up console logs",
                        checked: true
                    }
                ]
            },
            {
                id: `checklist-1`,
                title: "Checklist 2",
                content: [
                    {
                        text: "Clean up branches 2",
                        checked: false
                    },
                    {
                        text: "Clean up console logs 2",
                        checked: true
                    }
                ]
            }
        ],
        comments: []
    }
};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_CARD: {
            const { text, listID, id } = action.payload;

            const newCard = {
                text,
                id: `card-${id}`,
                list: listID,
                description: "Description test",
                checklists: [],
                comments: []
            };

            return { ...state, [`card-${id}`]: newCard };
        }
        case CONSTANTS.EDIT_CARD: {
            const { id, newText } = action.payload;
            const card = state[id];
            card.text = newText;
            return { ...state, [`card-${id}`]: card };
        }

        case CONSTANTS.DELETE_CARD: {
            const { id } = action.payload;
            const newState = state;
            delete newState[id];
            return newState;
        }

        case CONSTANTS.EDIT_CARD_CHECKLIST_BOOL: {
            const { id, bool, index, index2 } = action.payload;
            const card = state[id];
            card.checklists[index].content[index2].checked = !card.checklists[index].content[index2].checked;
            return { ...state, [`card-${id}`]: card };
        }

        case CONSTANTS.DELETE_CHECKLIST: {
            const { id, checklistID } = action.payload;
            const card = state[id];
            const newChecklists = card.checklists.filter(checklist => checklist.id !== checklistID);
            card.checklists = newChecklists;
            return { ...state, [id]: card };
        }

        case CONSTANTS.ADD_CHECKLIST_ITEM: {
            const { id, checklistID, text } = action.payload;
            const card = state[id];
            let checklist = card.checklists.filter(checklist => checklist.id === checklistID);
            checklist[0].content.push({
                text: text,
                checked: false
            });
            return { ...state, [id]: card };
        }

        case CONSTANTS.ADD_CHECKLIST: {
            const { id, checklistID, text } = action.payload;
            const card = state[id];
            card.checklists.push({
                id: checklistID,
                title: text,
                content: []
            });

            return { ...state, [id]: card };
        }

        default:
            return state;
    }
};

export default cardsReducer;
