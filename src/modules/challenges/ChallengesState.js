import { fromJS } from 'immutable'

const initialState = fromJS({
  challenges: [
    {
      id: 0,
      brandName: 'Adidas',
      code: 'y3LUKD',
      description: 'Snap picture of Adidas Ads',
      keywords: ['Adidas', 'Three Stripes', 'Logo', 'Footwear'],
      name: 'Adidas Challenge',
      goal: 10
    },
    {
      id: 1,
      brandName: 'KFC',
      code: '5JrkNh',
      description: 'Snap pictures of a KFC Ads',
      keywords: ['KFC', 'Colonel Sanders', 'Logo', 'Fried chicken'],
      name: 'KFC Challenge',
      goal: 15
    },
    {
      id: 2,
      brandName: 'Heineken',
      code: 'rGgf28',
      description: 'Snap pictures of Heineken Ads',
      keywords: ['Heineken', 'Beer', 'Logo', 'Lager'],
      name: 'Heineken Challenge',
      goal: 5
    }
  ]
})

export default function ChallengesStateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}