export function saveToSpreadsheet(annotations) {
  const labels = annotations.labelAnnotations ? annotations.labelAnnotations.map(label => label.description) : '-'
  const textPieces = annotations.textAnnotations ? annotations.textAnnotations.map(piece => piece.description) : '-'
  const textFull = annotations.fullTextAnnotation ? annotations.fullTextAnnotation.text : '-'

  fetch(
    'https://us-central1-awesome-project-bac2a.cloudfunctions.net/appendToSpreadsheet?labels=' + labels + '&textPieces=' + textPieces + '&textFull=' + textFull)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}