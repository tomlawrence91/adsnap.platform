import * as SnapState from './SnapState';
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';
import React from 'react';
import { Text, Animated } from 'react-native';

import Container from '../../components/Container';
import CaptureButton from '../../components/CaptureButton';
import Camera from 'react-native-camera';

import styles from './SnapStyles';


export default class SnapView extends React.Component {
    // componentDidMount() {
    //     if (this.props.uploading) {
    //        this.updateAnimation();
    //     }
    // }

    static route = {
        navigationBar: {
            title: 'Snap',
        }
    }

    takePicture() {
        this.props.navigator.push(Router.getRoute('welcome'));
        // this.props.navigator.showLocalAlert('Uploading Snap <(<°.°)', COMMON_STYLES.ALERT_STYLES_SUCCESS);
        // this.camera.capture()
        //     .then((data) => this.props.dispatch(SnapState.uploadImage(data)))
        //     .catch(err => console.error(err));
        // console.log("snap snap")
    }

    renderCameraOverlay() {
        return (<CaptureButton
            onPress={() => this.takePicture()}
        />)
        //return <Text style={styles.capture} onPress={() => this.takePicture()}>[CAPTURE]</Text>;
    }

    updateAnimation() {
        setTimeout(() => {
            console.log('I do not leak!');
            this.props.dispatch(SnapState.updateAnimation());
        }, 400);
    }

    renderUploadingAnimation() {
        return null;
        // this.updateAnimation();
        // return <Text style={styles.capture} onPress={() => { }}>{this.props.animationValue}</Text>;
    }

    render() {
        return (
            <Container>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    {this.props.uploading ? this.renderUploadingAnimation() : this.renderCameraOverlay()}
                </Camera>
            </Container>
        );
    }
}