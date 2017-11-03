import React from 'react';

import styles from './TabNavigationStyles';
import * as ICONS from '../../constants/icons';
import * as COLORS from '../../constants/colors';
import Score from '../../components/Score';
import Title from '../../components/Title';
import {
  View,
  Image
} from 'react-native';

import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem
} from '@exponent/ex-navigation';

export default class TabNavigationView extends React.Component {

  defaultRouteConfig = {
    navigationBar: {
      tintColor: COLORS.WHITE,
      backgroundColor: COLORS.APP_HEADER,
      renderRight: (params) => {
        return <Score points={this.props.points} pointsUpdated={params.params.pointsUpdated} />
      }
    },
  };

  renderTabIcon(icon, isSelected) {
    const iconStyle = isSelected ? styles.tabIconActive : styles.tabIcon;
    return (
      <View style={styles.tab}>
        <Image style={iconStyle} source={icon} />
      </View>);
  }

  render() {
    return (
      <TabNavigation
        tabBarColor={COLORS.NAVIGATION_PINK}
        tabBarHeight={56}
        initialTab="snap"
        navigatorUID="main">

        <TabNavigationItem
          id="challenges"
          renderIcon={(isSelected) => this.renderTabIcon(ICONS.CHALLENGES, isSelected)}>
          <StackNavigation
            defaultRouteConfig={this.defaultRouteConfig}
            initialRoute={Router.getRoute('challenges')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="snap"
          renderIcon={(isSelected) => this.renderTabIcon(ICONS.CAMERA, isSelected)}>
          <StackNavigation
            defaultRouteConfig={this.defaultRouteConfig}
            navigatorUID='snap'
            initialRoute={Router.getRoute('snap')}
            />
        </TabNavigationItem>

        <TabNavigationItem
          id="deals"
          renderIcon={(isSelected) => this.renderTabIcon(ICONS.VOUCHER, isSelected)}>
          <StackNavigation
            defaultRouteConfig={this.defaultRouteConfig}
            navigatorUID='deals'
            initialRoute={Router.getRoute('deals')} />
        </TabNavigationItem>

      </TabNavigation>
    );
  }
}
