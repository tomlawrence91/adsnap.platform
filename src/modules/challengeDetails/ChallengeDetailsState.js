import { fromJS } from 'immutable'

const initialState = fromJS({
  challenge: {}
})

export function setChallenge(challenge) {
  return {
    type: 'SET_CHALLENGE',
    payload: challenge
  }
}

export default function ChallengeDetailState (state = initialState, action) {
  switch (action.type) {
    case 'SET_CHALLENGE':
      return state.set('challenge', fromJS(action.payload))
    default:
      return state
  }
}