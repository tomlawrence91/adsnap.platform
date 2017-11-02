export function saveToSpreadsheet(match, annotations) {
  const labels = annotations.labelAnnotations ? annotations.labelAnnotations.map(label => label.description) : '-'
  const textPieces = annotations.textAnnotations ? annotations.textAnnotations.map(piece => piece.description) : '-'
  const logos = annotations.logoAnnotations ? annotations.logoAnnotations.map(logo => logo.description) : '-'
  
  navigator.geolocation.getCurrentPosition(coordinates => {    
    fetch(
      'https://us-central1-adsnap-183811.cloudfunctions.net/appendToSpreadsheet?match=' + match + 
        '&labels=' + labels + 
        '&textPieces=' +  textPieces + 
        '&logos=' + logos + 
        '&latitude=' + coordinates.coords.latitude +
        '&longitude=' + coordinates.coords.longitude +
        '&timestamp=' + new Date())
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  })

}