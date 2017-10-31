import { fromJS } from 'immutable'

const initialState = fromJS({
  challenges: [
    {
      id: 0,
      'brandName': 'Adidas',
      'campaignImgUrl': 'http://www.adidas.de/static/on/demandware.static/Sites-adidas-DE-Site/-/default/dw721d387e/images/favicons/favicon.png',
      'code': 'y3LUKD',
      'description': 'Snap picture of Adidas Ads',
      'keywords': ['Adidas', 'Three Stripes', 'Logo', 'Footwear'],
      'name': 'Adidas Challenge',
      'goal': 10
    },
    {
      'id': 1,
      'brandName': 'KFC',
      'campaignImgUrl': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png',
      'code': '5JrkNh',
      'description': 'Snap pictures of a KFC Ads',
      'keywords': ['KFC', 'Colonel Sanders', 'Logo', 'Fried chicken'],
      'name': 'KFC Challenge',
      'goal': 15
    },
    {
      'id': 2,
      'brandName': 'Heineken',
      'campaignImgUrl': 'http://fullhdpictures.com/wp-content/uploads/2016/06/Heineken-HD-Logos.png',
      'code': 'rGgf28',
      'description': 'Snap pictures of Heineken Ads',
      'keywords': ['Heineken', 'Beer', 'Logo', 'Lager'],
      'name': 'Heineken Challenge',
      'goal': 5
    }
  ]
})

export default function ChallengesStateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}