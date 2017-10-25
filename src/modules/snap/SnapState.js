import {Map} from 'immutable';
import * as ajaxService from '../../services/ajaxService';



// Initial state
const initialState = Map({
});

export function uploadSnap(file){
    console.log('uploadImage');
    return (dispatch, getState) => {
        console.log('uploadImage ajax');
        ajaxService.uploadImage(file).then(response =>response.json()).then(response =>{
            console.log(response.data.fileName);
            let fileLocation = 'http://192.168.22.22' + response.data.fileName; 
            ajaxService.classifyImage(fileLocation).then(r=>r.json()).then(response=>{
                console.log(response)
                dispatch(setSearchResults(response))
            })
        })
    }
}

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
