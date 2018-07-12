import { createRouter } from '@exponent/ex-navigation';

import WelcomeViewContainer from './welcome/WelcomeViewContainer';
import HomeViewContainer from './home/HomeViewContainer';
import PermissionsCameraView from './permissionsCamera/PermissionsCameraView';
import PermissionsGeolocationView from './permissionsGeolocation/PermissionsGeolocation';
import PermissionsDeniedView from './permissionsDenied/PermissionsDeniedView';
import ChallengesViewContainer from './challenges/ChallengesViewContainer';
import TabNavigationViewContainer from './tabNavigation/TabNavigationViewContainer';
import SnapViewContainer from './snap/SnapViewContainer';
import DealsViewContainer from './deals/DealsViewContainer';
import RedeemViewContainer from './redeem/RedeemViewContainer';
import SettingsViewContainer from './settings/SettingsViewContainer';
import ImageBrowserContainer from './imageBrowser/ImageBrowserContainer';
import ImageResultsContainer from './imageResults/ImageResultsContainer';

export default (Router = createRouter(() => ({
  welcome: () => WelcomeViewContainer,
  home: () => HomeViewContainer,
  permissionsCamera: () => PermissionsCameraView,
  permissionsGeolocation: () => PermissionsGeolocationView,
  permissionsDenied: () => PermissionsDeniedView,
  challenges: () => ChallengesViewContainer,
  tabNavigation: () => TabNavigationViewContainer,
  snap: () => SnapViewContainer,
  deals: () => DealsViewContainer,
  redeem: () => RedeemViewContainer,
  settings: () => SettingsViewContainer,
  imageBrowser: () => ImageBrowserContainer,
  results: () => ImageResultsContainer
})));
