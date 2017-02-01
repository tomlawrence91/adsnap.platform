import { fromJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';

const SET_DEALS = 'DEALS/SET_DEALS';


// Initial state
const initialState = fromJS({
  'deals': [
    // { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '0', amount: '40%', description: 'on E-Coins 1', retailer: 'Evil Corp', code: 'Td34dJ' },
    // { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '0', amount: '40%', description: 'on E-Coins 2', retailer: 'Evil Corp', code: 'Td34dJ' },
    // { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '0', amount: '40%', description: 'on E-Coins 3', retailer: 'Evil Corp', code: 'Td34dJ' },
  ]
});

export function retrieveDeals() {
  return (dispatch, getState) => {
    let response = ajaxService.retrieveDeals().then(response => {
      console.log(response)
      dispatch(setDeals(response.data));
    });
  }
}

export function setDeals(deals) {
  return {
    type: SET_DEALS,
    payload: deals
  }
}

// Reducer
export default function DealsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DEALS:
      let deals = fromJS(action.payload);
      return state.set('deals', deals)
    default:
      return state;
  }
}
