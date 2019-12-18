import { CONSTANTS } from "../actions";

const initialState = {
    "card-0": {
        id: `card-0`,
        list: "list-0",
        text: "Wash dishes",
        description: "Description test",
        checklists: [
            {
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
                title: "Checklist 2",
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
            console.log("EDIT");
            const { id, bool, index, index2 } = action.payload;
            console.log("REDUCER FIRED", id, index, index2);
            const card = state[id];
            console.log(
                "Old card",
                card.checklists[index].content[index2].checked
            );
            card.checklists[index].content[index2].checked = !card.checklists[
                index
            ].content[index2].checked;

            console.log(
                "new card",
                card.checklists[index].content[index2].checked
            );
            return { ...state, [`card-${id}`]: card };
        }

        default:
            return state;
    }
};

export default cardsReducer;
