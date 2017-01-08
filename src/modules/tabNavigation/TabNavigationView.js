import React from 'react';
import * as TabNavigationState from '../tabNavigation/TabNavigationState';
import styles from './TabNavigationStyles';
import * as ICONS from '../../constants/icons';
import * as COLORS from '../../constants/colors';
import AppRouter from '../AppRouter';
import Container from '../../components/Container';
import {
  View,
  Text,
  Image,
} from 'react-native';

import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

const defaultRouteConfig = {
  navigationBar: {
    tintColor: COLORS.WHITE,
    backgroundColor: COLORS.APP_HEADER
  },
};

export default class TabNavigationView extends React.Component {
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
        initialTab="snap">

        <TabNavigationItem
          id="snap"
          renderIcon={(isSelected) => this.renderTabIcon(ICONS.CAMERA, isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('snap')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="deals"
          renderIcon={(isSelected) => this.renderTabIcon(ICONS.VOUCHER, isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('deals')} />
        </TabNavigationItem>

      </TabNavigation>
    );
  }
}
