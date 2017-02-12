import { fromJS, toJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';
import * as ICONS from '../../constants/icons';
import * as COLORS from '../../constants/colors';

var _ = require('lodash');

const SET_DEALS = 'DEALS/SET_DEALS';
const SET_OVERLAY_COLOR = 'DEALS/SET_COLOR';


// Initial state
const initialState = fromJS({
  'deals': [
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '0', amount: '40%', description: 'get a Beer', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '2', amount: '30%', description: 'on E-Coins 2', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '3', amount: '40%', description: 'on E-Coins 3', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '4', amount: '40%', description: 'on E-Coins 1', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '5', amount: '30%', description: 'on E-Coins 2', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '6', amount: '40%', description: 'on E-Coins 3', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '7', amount: '40%', description: 'on E-Coins 1', retailer: 'Evil Corp', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '8', amount: '30%', description: 'on E-Coins 2', retailer: 'Evil Corp', code: 'Td34dJ' },
  ],
  'colors': [COLORS.TRANSPARENT_ORANGE, COLORS.TRANSPARENT_PURPLE, COLORS.TRANSPARENT_PINK]
});

export function retrieveDeals() {
  return (dispatch, getState) => {
    let response = ajaxService.retrieveDeals().then(response => {
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

export function setDealOverlayColor(dealColorMap) {
  return {
    type: SET_OVERLAY_COLOR,
    payload: dealColorMap
  }
}

// Reducer
export default function DealsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DEALS:
      let newDeals = fromJS(action.payload);
      return state.set('deals', newDeals);
    case SET_OVERLAY_COLOR:
      return state.set('deals', fromJS(action.payload));
    default:
      return state;
  }
}
