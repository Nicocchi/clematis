import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialState = [
    {
        title: "Backlog",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "we created a static list and a static card"
            },
            {
                id: `card-${1}`,
                text: "we used a mix between material UI React and styled components"
            }
        ]
    },
    {
        title: "In Progress",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "create first reducer"
            },
            {
                id: `card-${3}`,
                text: "render many cards"
            },
            {
                id: `card-${4}`,
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
                id: `list-${listID}`,
                cards: []
            }

            listID += 1;
            return [...state, newList];
        
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
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
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload;

            const newState = [...state];
            
            // In the same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;

        default:
            return state;
    }
};

export default listsReducer;