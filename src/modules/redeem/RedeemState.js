import { fromJS } from 'immutable';

const initialState = fromJS({
  deal:{}
});

const SET_DEAL = 'REDEEM/SET_DEAL';

export function setDeal(deal){
  return {
    type: SET_DEAL,
    payload: deal
  }
}

export default function DealsStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_DEAL:
      return state.set('deal', fromJS(action.payload))

    default:
      return state;
  }
}
