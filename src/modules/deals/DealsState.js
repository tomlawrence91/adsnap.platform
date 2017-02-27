import { fromJS, toJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';
import * as ICONS from '../../constants/icons';
import * as COLORS from '../../constants/colors';

var _ = require('lodash');

const SET_DEALS = 'DEALS/SET_DEALS';
const SET_OVERLAY_COLOR = 'DEALS/SET_COLOR';
const ADD_DEAL = 'DEALS/ADD_DEAL';


// Initial state
const initialState = fromJS({
  'deals': [
    { imgUrl: 'http://fullhdpictures.com/wp-content/uploads/2016/06/Heineken-HD-Logos.png', id: '0', amount: 'FREE', description: 'get a free heineken', retailer: 'Heineken', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '2', amount: '30%', description: 'on a BigMac menu', retailer: 'Mc Donalds', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '3', amount: '10%', description: 'on sports wear', retailer: 'Nike', code: 'Td34dJ' },
    { imgUrl: 'http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409', id: '4', amount: '40%', description: 'on a coffee', retailer: 'Starbucks', code: 'Td34dJ' },
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

export function addDeal(deal) {
  return {
    type: ADD_DEAL,
    payload: deal
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

    case ADD_DEAL:
      return state.updateIn(['deals'], deals => deals.push(fromJS(action.payload)));

    case SET_DEALS:
      return state.set('deals', fromJS(action.payload));

    case SET_OVERLAY_COLOR:
      return state.set('deals', fromJS(action.payload));

    default:
      return state;
  }
}
