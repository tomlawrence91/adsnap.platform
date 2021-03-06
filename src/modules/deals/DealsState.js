import { fromJS, toJS } from 'immutable';
import * as IMAGES from '../../constants/images';
import * as COLORS from '../../constants/colors';

const ADD_DEAL = 'DEALS/ADD_DEAL';
const ENABLE_DEAL = 'DEALS/ENABLE_DEAL';
const SET_ACTIVE_DEAL = 'DEALS/SET_ACTIVE_DEAL';
const SET_OVERLAY_COLOR = 'DEALS/SET_COLOR';

const initialState = fromJS({
  deals: [
    {
      'logoUrl': IMAGES.HEINEKEN,
      'campaignImgUrl': IMAGES.HEINEKEN,
      'id': '0',
      'amount': 'FREE',
      'description': 'Get a free heineken at Tomorrowland festival.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'Heineken',
      'code': 'Td34dJ',
      enabled: false
    },
    {
      'logoUrl': IMAGES.ADIDAS,
      'campaignImgUrl': IMAGES.ADIDAS,
      'id': '1',
      'amount': '20%',
      'description': 'Get a 20% discount on sneakers.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'Adidas',
      'code': 'Kd57GF',
      enabled: false
    },
    {
      'logoUrl': IMAGES.KFC,
      'campaignImgUrl': IMAGES.KFC,
      'id': '2',
      'amount': '15%',
      'description': 'The cernal offers you a discount on some chicken.',
      'disclaimer': 'Only available in attending partner shops',
      'brandName': 'KFC',
      'code': 'CHICKEN',
      enabled: false
    },
    {
      'logoUrl': IMAGES.CURRYS,
      'campaignImgUrl': IMAGES.CURRYS,
      'id': '3',
      'amount': '5%',
      'description': 'Get 1% off on all purchases today',
      'disclaimer': 'Only available within the next 24 hours',
      'brandName': 'Curry\'s PC World',
      'code': 'DISCOUNTME',
      enabled: false
    }
  ],
  activeDeal: {},
  colors: [COLORS.TRANSPARENT_ORANGE, COLORS.TRANSPARENT_PURPLE, COLORS.TRANSPARENT_PINK]
});

export function addDeal(deal) {
  return {
    type: ADD_DEAL,
    payload: deal
  }
}

export function enableDeal(deal) {
  return {
    type: ENABLE_DEAL,
    payload: deal
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

export default function DealsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_DEAL:
      return state.updateIn(['deals'], deals => deals.push(fromJS(action.payload)));

    case ENABLE_DEAL:
      let deals = state.get("deals").toJS();
      deals = deals.map(deal => {
        if (deal.id == action.payload.id) {
          deal.enabled = true;
        }
        return deal;
      });
      return state.set("deals", fromJS(deals));

    case SET_ACTIVE_DEAL:
      const deal = action.payload;
      return state.set('activeDeal', fromJS(deal));

    case SET_OVERLAY_COLOR:
      return state.set('deals', fromJS(action.payload));

    default:
      return state;
  }
}
