import * as RedeemState from './RedeemState';
import * as COLORS from '../../constants/colors';
import React from 'react';
import {
    Image,
    Text,
    View,
    Dimensions,
} from 'react-native';
import * as ICONS from '../../constants/icons';
import Container from '../../components/Container';
import RectButton from '../../components/RectButton';
import Tile from '../../components/Tile';
import * as COMMON_STYLES from '../../constants/commonStyles';

import styles from './RedeemStyles';


export default class RedeemView extends React.Component {
    static route = {
        navigationBar: {
            title: 'Chat',
        }
    }
    //TODO: fetch code
    //TODO: popup on remove
    render() {
        return (
            <Container loading={!this.props.deal}>
                <View style={styles.codeWrapper}>
                    <Image style={styles.backgroundImage} source={{ uri: "http://www.urlaubwelt.com/wp-content/uploads/2016/02/Hawaii-15.jpg" }}>
                        <View style={styles.coloredOverlay} />
                        <View style={styles.codeBox}><Text style={styles.codeText}>{this.props.route.params.deal.code}</Text></View>
                    </Image>
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.brand}>{this.props.route.params.deal.retailer}</Text>

                    <View style={styles.buttonWrapper}>
                        <RectButton
                            onPress={() => this.login()}
                            text={'Trade'}
                            width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                            height={COMMON_STYLES.BUTTON_HEIGHT}
                            textColor={COLORS.WHITE}
                            backgroundColor={COLORS.DARK_GREY}
                            borderColor={COLORS.BLACK} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <RectButton
                            onPress={() => this.login()}
                            text={'Remove Discount'}
                            width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                            height={COMMON_STYLES.BUTTON_HEIGHT}
                            textColor={COLORS.WHITE}
                            backgroundColor={COLORS.DARK_GREY}
                            borderColor={COLORS.BLACK} />
                    </View>
                </View>
            </Container >
        );
    }
}
