import * as RedeemState from './RedeemState';
import * as COLORS from '../../constants/colors';
import React from 'react';
import {
    Image,
    Text,
    View,
    Dimensions,
    ScrollView
} from 'react-native';
import * as ICONS from '../../constants/icons';
import Container from '../../components/Container';
import KeyValue from '../../components/KeyValue';
import RectButton from '../../components/RectButton';
import Tile from '../../components/Tile';
import * as COMMON_STYLES from '../../constants/commonStyles';

import styles from './RedeemStyles';


export default class RedeemView extends React.Component {
    static route = {
        navigationBar: {
            title: 'Redeem',
        }
    }
    //TODO: fetch code
    //TODO: popup on remove
    render() {
        console.log(this.props)
        return (
            <Container loading={!this.props.deal}>
                <ScrollView>
                    <View style={styles.codeWrapper}>
                        <Image style={styles.backgroundImage} source={{ uri: this.props.deal.campaignImgUrl }}>
                            {/*<View style={styles.coloredOverlay} />
                            <View style={styles.codeBox}><Text style={styles.codeText}>{this.props.route.params.deal.code}</Text></View>*/}
                        </Image>
                    </View>
                    <View style={styles.contentWrapper}>
                        {/*<Text style={styles.brand}>{this.props.route.params.deal.retailer}</Text>*/}
                        <Text style={styles.brand}>{this.props.deal.brandName}</Text>
                        <View style={styles.codeBox}><Text style={styles.codeText}>{this.props.deal.code}</Text></View>
                        <Text style={styles.description}>
                            {this.props.deal.description}
                        </Text>
                        <KeyValue
                            name={'Expiration'}
                            value={'12.07.2017'}
                        />
                        <KeyValue
                            name={'Website'}
                            isLink={true}
                            value={'www.this-could-be-your-website.com'}
                        />
                        <KeyValue
                            name={'Disclaimer'}
                            value={this.props.deal.disclaimer}
                        />
                        {/*<Text style={styles.longDescription}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </Text>*/}
                        <View style={styles.buttonWrapper}>
                            <RectButton
                                onPress={() => { }}
                                text={'Trade'}
                                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                                height={COMMON_STYLES.BUTTON_HEIGHT}
                                textColor={COLORS.WHITE}
                                backgroundColor={COLORS.DARK_GREY}
                                borderColor={COLORS.BLACK} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <RectButton
                                onPress={() => { }}
                                text={'Remove Discount'}
                                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                                height={COMMON_STYLES.BUTTON_HEIGHT}
                                textColor={COLORS.WHITE}
                                backgroundColor={COLORS.DARK_GREY}
                                borderColor={COLORS.BLACK} />
                        </View>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}
