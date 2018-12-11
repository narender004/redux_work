import { FETCH_POSTS, NEW_POST, DELETE_POST } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
    console.log('THIS DOES SHOW UP IN CONSOLE data',action.payload);
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
    console.log('this is insert data',action.payload);
      return {
        ...state,
        item: action.payload
      };
      case DELETE_POST:
      console.log('this is delete data',action.payload);
        return {
          ...state,
     items: state.items.filter(item => item._id !== action.payload)
        };
    default:
      return state;
  }
}