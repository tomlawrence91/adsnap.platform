import { createRouter } from '@exponent/ex-navigation';

import WelcomeViewContainer from './welcome/WelcomeViewContainer';
import TabNavigationViewContainer from './tabNavigation/TabNavigationViewContainer';
import SnapViewContainer from './snap/SnapViewContainer';
import DealsViewContainer from './deals/DealsViewContainer';
import RedeemViewContainer from './redeem/RedeemViewContainer';
import SignInViewContainer from './signin/SignInViewContainer';
import SignUpViewContainer from './signup/SignUpViewContainer';

export default Router = createRouter(() => ({
    welcome: () => WelcomeViewContainer,
    signin: () => SignInViewContainer,
    signup: () => SignUpViewContainer,
    tabNavigation: () => TabNavigationViewContainer,
    snap: () => SnapViewContainer,
    deals: () => DealsViewContainer,
    redeem: () => RedeemViewContainer
}));