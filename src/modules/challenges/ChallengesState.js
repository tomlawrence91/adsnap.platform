import { fromJS } from 'immutable'
import * as IMAGES from '../../constants/images'

const SWITCH_VIEW = 'CHALLENGES/SWITCH_VIEW';
const SET_COMPLETED = 'CHALLENGES/SET_COMPLETED';

const initialState = fromJS({
  activeView: 'list',
  challenges: [
    {
      'id': '1',
      'brandName': 'Adidas',
      'campaignImgUrl': IMAGES.ADIDAS,
      'code': 'y3LUKD',
      'description': 'Snap picture of Adidas Ads',
      'keywords': ['Adidas', 'Three Stripes', 'Logo', 'Footwear'],
      'name': 'Adidas Challenge',
      'goal': 10,
      'latitude': 51.508351,
      'longitude': -0.130158,
      'completed': false
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
      'longitude': -0.127958,
      'completed': false
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
      'longitude': -0.127258,
      'completed': false
    }
  ]
});

export function switchView(payload) {
  return {
    type: SWITCH_VIEW,
    payload: payload
  }
}

export function setCompleted(payload) {
  return {
    type: SET_COMPLETED,
    payload: payload
  }
}

export default function ChallengesStateReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_VIEW:
      const view = action.payload;
      return state.set('activeView', fromJS(view));
    case SET_COMPLETED:
      let challenges = state.get('challenges').toJS();
      challenges = challenges.map( challenge => {
        if (challenge.id == action.payload.id) {
          challenge.completed = true;
        }
        return challenge;
      });
      return state.set('challenges', fromJS(challenges));
    default:
      return state
  }
}