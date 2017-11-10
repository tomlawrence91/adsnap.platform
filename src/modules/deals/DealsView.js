import * as DealsState from './DealsState';
import * as RedeemState from '../redeem/RedeemState';
import React from 'react';
import {
	ScrollView,
	View,
	Text,
	Dimensions
} from 'react-native';

import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";

import Container from '../../components/Container';
import Tile from '../../components/Tile';

import styles from './DealsStyles';
import RectButton from "../../components/RectButton";

export default class DealsView extends React.Component {
	static route = {
		navigationBar: {
			title: 'Your Discounts',
		}
	};

	componentWillMount() {
		this.colorDeals();
	}

	componentDidUpdate() {
		if (this.props.activeDeal.id) {
			this.props.dispatch(RedeemState.setDeal(this.props.activeDeal));
			this.props.dispatch(DealsState.setActiveDeal({}));
			this.props.navigator.push(Router.getRoute('redeem'));
		}
	}

	onPress = (deal) => {
		this.props.dispatch(RedeemState.setDeal(deal));
		this.props.navigator.push(Router.getRoute('redeem', { deal: deal }));
	};

	renderTile(i) {
		let deal = this.props.deals[i];
		if (!deal || !deal.enabled) {
			return null;
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
		this.setDealOverlayColor(this.props.deals);
	}

	renderDeals() {
		const deals = this.props.deals.filter(deal => deal.enabled)
		return (
			<View style={[styles.table, deals.length === 0 ? { flex: 1, height: Dimensions.get('window').height - 100, justifyContent: 'center', alignItems: 'center' } : null]}>
				{
					deals.length ? this.props.deals.map((tile, idx) => this.renderTile(idx)) :
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ marginVertical: 10 }}>You haven't unlocked any deals yet.</Text>
							<RectButton
								onPress={() => {
									this.props.navigation.performAction(({ tabs }) => {
										tabs('main').jumpToTab('snap');
									})
								}}
								text={"Go take some snaps"}
								width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
								height={COMMON_STYLES.BUTTON_HEIGHT}
								textColor={COLORS.PINK}
								backgroundColor={COLORS.TRANSPARENT}
								borderColor={COLORS.PINK}
								border={{
									borderColor: COLORS.PINK,
									borderStyle: "solid",
									borderWidth: 2
								}} />
						</View>
				}
			</View>);
	}

	render() {
		return (
			<Container loading={this.props.deals.length === 0}>
				<ScrollView>{this.renderDeals()}</ScrollView>
			</Container>
		);
	}
}
