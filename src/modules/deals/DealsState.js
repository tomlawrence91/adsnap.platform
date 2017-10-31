import { fromJS, toJS } from 'immutable';
import AjaxService from '../../services/AjaxService';
import * as ICONS from '../../constants/icons';
import * as COLORS from '../../constants/colors';
import { storeItem } from '../../utils/storageUtils';
import * as STORAGE from '../../constants/storageNames';

const lodash = require('lodash');

const SET_DEALS = 'DEALS/SET_DEALS';
const SET_OVERLAY_COLOR = 'DEALS/SET_COLOR';
const ADD_DEAL = 'DEALS/ADD_DEAL';
const SET_ACTIVE_DEAL = 'DEALS/SET_ACTIVE_DEAL';

// Initial state
const initialState = fromJS({
  deals: [
    {
      'logoUrl': 'http://fullhdpictures.com/wp-content/uploads/2016/06/Heineken-HD-Logos.png',
      'campaignImgUrl': 'http://fullhdpictures.com/wp-content/uploads/2016/06/Heineken-HD-Logos.png',
      'id': '0',
      'amount': 'FREE',
      'description': 'Get a free heineken at Tomorrowland festival.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'Heineken',
      'code': 'Td34dJ'
    },
    {
      'logoUrl': 'http://www.adidas.de/static/on/demandware.static/Sites-adidas-DE-Site/-/default/dw721d387e/images/favicons/favicon.png',
      'campaignImgUrl': 'http://www.adidas.de/static/on/demandware.static/Sites-adidas-DE-Site/-/default/dw721d387e/images/favicons/favicon.png',
      'id': '1',
      'amount': '20%',
      'description': 'Get a 20% discount on sneakers.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'Adidas',
      'code': 'Kd57GF'
    },
    {
      'logoUrl': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png',
      'campaignImgUrl': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png',
      'id': '2',
      'amount': '15%',
      'description': 'The cernal offers you a discount on some chicken.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'KFC',
      'code': 'CHICKEN'
    }],
  activeDeal: {},
  colors: [COLORS.TRANSPARENT_ORANGE, COLORS.TRANSPARENT_PURPLE, COLORS.TRANSPARENT_PINK]
});

export function retrieveDeals() {
  return async (dispatch, getState) => {
    let response = AjaxService.retrieveDeals();
    dispatch(setDeals(response.data));
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

export function setActiveDeal(deal) {
  return {
    type: SET_ACTIVE_DEAL,
    payload: deal
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
      const deals = actions.payload;
      storeItem(STORAGE.DEALS, deals);
      return state.set('deals', fromJS(deals));

    case SET_ACTIVE_DEAL:
      const deal = action.payload;
      return state.set('activeDeal', fromJS(deal));

    case SET_OVERLAY_COLOR:
      return state.set('deals', fromJS(action.payload));

    default:
      return state;
  }
}
