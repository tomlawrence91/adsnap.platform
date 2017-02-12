import { fromJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';

const SET_UPLOADING_FLAG = 'SNAP/SET_UPLOADING_FLAG';
const UPDATE_ANIMATION = 'SNAP/UPDATE_ANIMATION';

// Initial state
const initialState = fromJS({
    uploading: false,
    animationObj: {
        stage: 0,
        current: '<(°.°)>',
        values: ['<(°.<°)', '<(°.°)>', '(°>.°)>', '<(°.°)>',]
    }
});

export function uploadImage(file) {
    console.log('uploadImage');
    console.log(file)
    return (dispatch, getState) => {
        dispatch(setUploadingFlag(true))
        // ajaxService.uploadImage(file).then(response => response.json()).then(response => {
        //     console.log(response.data.fileName);
        //     let fileLocation = ajaxService.baseUrl + response.data.fileName;
        //     dispatch(setUploadingFlag(false))        
        // })
        setTimeout(() => dispatch(setUploadingFlag(false)), 10000)
    }
}

export function setUploadingFlag(uploadingFlag) {
    return {
        type: SET_UPLOADING_FLAG,
        payload: uploadingFlag
    }
}
export function updateAnimation() {
    return {
        type: UPDATE_ANIMATION,
        payload: {}
    }
}

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case (SET_UPLOADING_FLAG):
            return state.set('uploading', fromJS(action.payload));
        case (UPDATE_ANIMATION):
            let newAnimationObj = state.get('animationObj').toJS();
            newAnimationObj.stage = newAnimationObj.stage <= 3 ? newAnimationObj.stage + 1 : 0;
            console.log("stage", newAnimationObj.stage)
            newAnimationObj.current = newAnimationObj.values[newAnimationObj.stage];
            return state.set('animationObj', fromJS(newAnimationObj));
        default:
            return state;
    }
}
