import { GET_SHIRTS,
    GET_CATEGORIES,
    GET_PARENTCATEGORIES,
    GET_CATEGORYBYID,
    GET_DETAIL,
     GET_SHIRTS_SELLER,
     GET_SHIRTS_STORE,
     GET_SHIRTS_NEW  } from "../constants/typeRedux";

const initialState = {
    shirtsShop: {},
    categories:[],
    parentcategories:[],
    categorybyid:[],
    shirtDetail:{},
    shirtSeller:{},
    shirtsStore:{},
    shirtsNew:{},
};


// destruturing, spread

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SHIRTS:
            console.log("action pay", action);
            return { ...state, shirtsShop: action.payload };
        case GET_CATEGORYBYID:
            return { ...state,categorybyid:action.payload};
        case GET_CATEGORIES:
            return { ...state, categories: action.payload };
        case GET_PARENTCATEGORIES:
            return { ...state, parentcategories: action.payload };
        case GET_DETAIL:
            return { ...state, shirtDetail:action.payload };
        case GET_SHIRTS_SELLER:
            return { ...state, shirtSeller:action.payload }; 
        case GET_SHIRTS_STORE:
            return { ...state, shirtsStore:action.payload }; 
        case GET_SHIRTS_NEW:
            return { ...state, shirtsNew:action.payload };           
        default:
            return state;
    }
}