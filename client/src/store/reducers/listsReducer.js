import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 4;

const initialState = [
    {
        title: "Backlog",
        id: 0,
        cards: [
            {
                id: 0,
                text: "we created a static list and a static card"
            },
            {
                id: 1,
                text: "we used a mix between material UI React and styled components"
            }
        ]
    },
    {
        title: "In Progress",
        id: 1,
        cards: [
            {
                id: 0,
                text: "create first reducer"
            },
            {
                id: 1,
                text: "render many cards"
            },
            {
                id: 2,
                text: "font changes"
            }
        ]
    }
];

const listsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                id: listID,
                cards: []
            }

            listID += 1;
            return [...state, newList];
        
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: cardID
            }

            cardID += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };

                } else {
                    return list;
                }
            });

            return newState;

        default:
            return state;
    }
};

export default listsReducer;