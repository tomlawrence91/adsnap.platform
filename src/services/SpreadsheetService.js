export function saveToSpreadsheet(match, brand, terms, annotations) {

  const labels = annotations[0] ? annotations[0].map(label => label.description) : '-'
  const textPieces = annotations[1] ? annotations[1].map(piece => piece.description) : '-'
  const logos = annotations[2] ? annotations[2].map(logo => logo.description) : '-'

  navigator.geolocation.getCurrentPosition(coordinates => {    
    fetch(
      'https://us-central1-adsnap-183811.cloudfunctions.net/appendToSpreadsheet?match=' + match +
        '&terms=' + terms +
        '&brand=' + brand +
        '&labels=' + labels + 
        '&textPieces=' + textPieces + 
        '&logos=' + logos + 
        '&latitude=' + coordinates.coords.latitude +
        '&longitude=' + coordinates.coords.longitude +
        '&timestamp=' + new Date())
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  })

}