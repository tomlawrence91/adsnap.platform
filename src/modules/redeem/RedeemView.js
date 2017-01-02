import * as RedeemState from './RedeemState';
import * as COLORS from '../../constants/colors';
import React from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import * as ICONS from '../../constants/icons';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Tile from '../../components/Tile';

import styles from './RedeemStyles';


export default class RedeemView extends React.Component {
    static route = {
        navigationBar: {
            title: 'Chat',
        }
    }
    render() {
        return (
            <Container loading={!this.props.deal}>
                <Text style={styles.brand}>{this.props.route.params.deal.retailer}</Text>
                <View style={styles.codeWrapper}>
                    <Image style={styles.backgroundImage} source={{ uri: "http://www.urlaubwelt.com/wp-content/uploads/2016/02/Hawaii-15.jpg" }}>
                        <View style={styles.coloredOverlay} />
                        <View style={styles.codeBox}><Text style={styles.codeText}>{this.props.route.params.deal.code}</Text></View>
                    </Image>
                </View>
                <Button text="Remove Deal" onPress={() => { } }></Button>

            </Container>
        );
    }
}
