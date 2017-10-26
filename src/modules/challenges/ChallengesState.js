import { fromJS } from 'immutable'

const initialState = fromJS({
  challenges: [
    {
      id: 0,
      brandName: 'Adidas',
      code: 'y3LUKD',
      description: 'Take a picture of an Adidas logo',
      keywords: ['Adidas', 'Three Stripes', 'Logo', 'Footwear'],
      name: 'Adidas Challenge',
    },
    {
      id: 1,
      brandName: 'KFC',
      code: '5JrkNh',
      description: 'Take a picture of a KFC logo',
      keywords: ['KFC', 'Colonel Sanders', 'Logo', 'Fried chicken'],
      name: 'KFC Challenge',
    },
    {
      id: 2,
      brandName: 'Heineken',
      code: 'rGgf28',
      description: 'Take a picture of a Heineken logo',
      keywords: ['Heineken', 'Beer', 'Logo', 'Lager'],
      name: 'Heineken Challenge',
    }
  ]
})

export default function ChallengesStateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}