import * as SnapState from './SnapState';
import * as COLORS from '../../constants/colors';
import React from 'react';
import { Text } from 'react-native';

import Container from '../../components/Container';
import Camera from 'react-native-camera';

import styles from './SnapStyles';


export default class SnapView extends React.Component {
    static route = {
        navigationBar: {
            title: 'Snap',
        }
    }

    takePicture() {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <Container>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    } }
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={() => this.takePicture()}>[CAPTURE]</Text>
                </Camera>
            </Container>
        );
    }
}