import * as DealsState from './DealsState';
import * as COLORS from '../../constants/colors';
import React from 'react';
import {
    PropTypes,
    Text,
    ScrollView,
    View,
} from 'react-native';
import * as ROUTES from '../../constants/routes';
import * as ICONS from '../../constants/icons';
import Container from '../../components/Container';
import Tile from '../../components/Tile';

import styles from './DealsStyles';

export default class DealsView extends React.Component {

     
    onPress = (deal) => {
        this.props.navigator.push(Router.getRoute('redeem',{deal:deal}));
    }

    renderTile(i) {
        let deal = this.props.deals[i];
        if (!deal) {
            return (<View style={{ flex: .5 }} />);
        }
        return (<Tile
            description={deal.description} imgUrl={deal.imgUrl} brand={deal.retailer} amount={deal.amount}
            onPress={() => this.onPress(deal)} />)
    }

    renderDeals() {
        return (
            <View style={styles.table}>
                {
                    this.props.deals.reduce((tiles, deal, i) => {
                        return i % 2 == 0 
                            ? tiles.concat([
                                <View key={i} style={styles.tileWrapper}>
                                    {this.renderTile(i)}
                                    {this.renderTile(i + 1)}
                                </View>]) 
                            : tiles
                    },[])
                }
            </View>);
    }

    render() {
        return (
            <Container loading={this.props.deals.length == 0}>
                <ScrollView>{this.renderDeals()}</ScrollView>
            </Container>
        );
    }
}
