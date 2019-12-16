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
        default:
            return state;
    }
};

export default listsReducer;