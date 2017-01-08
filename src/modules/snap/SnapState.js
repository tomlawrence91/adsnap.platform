import {Map} from 'immutable';
import * as ajaxService from '../../services/ajaxService';



// Initial state
const initialState = Map({
});

export function uploadImage(file){
    console.log('uploadImage');
    console.log(file)
    return (dispatch, getState) => {
        console.log('uploadImage ajax');
        ajaxService.uploadImage(file).then(response =>response.json()).then(response =>{
            console.log(response.data.fileName);
            let fileLocation = 'http://192.168.22.22' + response.data.fileName; 
            
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
