import { fromJS } from 'immutable'
import * as IMAGES from '../../constants/images'

const SWITCH_VIEW = 'CHALLENGES/SWITCH_VIEW';

const initialState = fromJS({
  activeView: 'list',
  challenges: [
    {
      id: 1,
      'brandName': 'Adidas',
      'campaignImgUrl': IMAGES.ADIDAS,
      'code': 'y3LUKD',
      'description': 'Snap picture of Adidas Ads',
      'keywords': ['Adidas', 'Three Stripes', 'Logo', 'Footwear'],
      'name': 'Adidas Challenge',
      'goal': 10,
      'latitude': 51.508351,
      'longitude': -0.130158
    },
    {
      'id': 2,
      'brandName': 'KFC',
      'campaignImgUrl': IMAGES.KFC,
      'code': '5JrkNh',
      'description': 'Snap pictures of a KFC Ads',
      'keywords': ['KFC', 'Colonel Sanders', 'Logo', 'Fried chicken'],
      'name': 'KFC Challenge',
      'goal': 15,
      'latitude': 51.507051,
      'longitude': -0.127958
    },
    {
      'id': 0,
      'brandName': 'Heineken',
      'campaignImgUrl': IMAGES.HEINEKEN,
      'code': 'rGgf28',
      'description': 'Snap pictures of Heineken Ads',
      'keywords': ['Heineken', 'Beer', 'Logo', 'Lager'],
      'name': 'Heineken Challenge',
      'goal': 5,
      'latitude': 51.509451,
      'longitude': -0.127258
    }
  ]
});

export function switchView(payload) {
  return {
    type: SWITCH_VIEW,
    payload: payload
  }
}

export default function ChallengesStateReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_VIEW:
      const view = action.payload;
      return state.set('activeView', fromJS(view));
    default:
      return state
  }
}