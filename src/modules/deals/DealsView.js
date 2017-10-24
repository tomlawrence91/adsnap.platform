import * as DealsState from './DealsState';
import * as RedeemState from '../redeem/RedeemState';
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

const lodash = require('lodash');

export default class DealsView extends React.Component {
    static route = {
        navigationBar: {
            title: 'Your Discounts',
        }
    }
    componentWillMount() {
        // this.props.dispatch(DealsState.retrieveDeals());
        this.colorDeals();
    }


    onPress = (deal) => {
        this.props.dispatch(RedeemState.setDeal(deal));
        this.props.navigator.push(Router.getRoute('redeem', { deal: deal }));
    }

    renderTile(i, overlayColor) {
        let deal = this.props.deals[i];
        if (!deal) {
            return (<View style={{ flex: .5 }} />);
        }
        return (
            <Tile
                imgUrl={deal.logoUrl}
                brand={deal.brandName}
                amount={deal.amount}
                overlayColor={this.getColor(i)}
                onPress={() => this.onPress(deal)} />
        );
    }

    setDealOverlayColor(dealColorMap) {
        console.log('called')
        this.props.dispatch(DealsState.setDealOverlayColor(dealColorMap));
    }

    //new
    // colorDeal(index) {
    //     const color = _.sample(this.props.colors);
    //     const deal = this.props.deals[index];
    //     if(index === 0) {
    //         return color;
    //     } else if ( index % 2 === 0 && index > 0 ) {
    //         const prevDeal = this.props.deals[index-2];
    //         if (prevDeal.overlayColor !== color) {
    //             this.setDealOverlayColor(deal.id, color);
    //         }
    //         return colorDeal(index)
    //     } else if ( index % 2 !== 0 && index > 0 ) {
    //         const prevDeal = this.props.deals[index-1];
    //         if (prevDeal.overlayColor !== color) {
    //             this.setDealOverlayColor(deal.id, color);
    //         }
    //         return colorDeal(index)
    //     }
    // }

    getColor(index) {
        let ci = index % 4;
        switch (ci) {
            case 0:
                return this.props.colors[2];
            case 3:
                return this.props.colors[1];
            default:
                return this.props.colors[0];
        }
    }

    colorDeals() {
        dealColorMap = this.props.deals.map(deal => {
            return { ...deal, overlayColor: lodash.sample(this.props.colors) }
        });
        this.setDealOverlayColor(dealColorMap);
    }



    // colorDeals(colorMap = [], retryCount = 0) {
    //     let deals = this.props.deals;
    //     if (retryCount > this.props.deals.length) {
    //         return;
    //     }
    //     for (let i = 0; i < this.props.deals.length; i++) {

    //         let deal = this.props.deals[i];
    //         console.log("i", i)
    //         console.log("deal", deal)

    //         if (deal['overlayColor']) {
    //             continue;
    //         }
    //         const color = _.sample(this.props.colors);
    //         if (i === 0) {
    //             colorMap.push({ id: deal.id, overlayColor: color });
    //         }
    //         else if (i % 2 === 0) {
    //             const prevDeal = this.props.deals[i - 2]
    //             if (color !== prevDeal.overlayColor) {
    //                 colorMap.push({ id: deal.id, overlayColor: color });
    //             } else {
    //                 return colorDeals(colorMap, retryCount++);
    //             }
    //         }
    //         else if (i % 2 !== 0) {
    //             const prevDeal = this.props.deals[i - 1]
    //             if (color !== prevDeal.overlayColor) {
    //                 colorMap.push({ id: deal.id, overlayColor: color });
    //             } else {
    //                 return colorDeals(colorMap, retryCount++);
    //             }
    //         }
    //     }
    //     this.setDealOverlayColor(colorMap)
    // }

    renderTiles() {
        return this.props.deals.reduce((tiles, deal, i) => {
            return i % 2 == 0
                ? tiles.concat([
                    <View key={i} style={styles.tileWrapper}>
                        {this.renderTile(i)}
                        {this.renderTile(i + 1)}
                    </View>])
                : tiles
        }, [])
    }

    renderDeals() {
        return (
            <View style={styles.table}>
                {
                    this.renderTiles()
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
