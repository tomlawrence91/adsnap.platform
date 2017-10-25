import { createRouter } from "@exponent/ex-navigation";

import WelcomeViewContainer from "./welcome/WelcomeViewContainer";
import TabNavigationViewContainer
  from "./tabNavigation/TabNavigationViewContainer";
import SnapViewContainer from "./snap/SnapViewContainer";
import DealsViewContainer from "./deals/DealsViewContainer";
import RedeemViewContainer from "./redeem/RedeemViewContainer";
import SettingsViewContainer from "./settings/SettingsViewContainer";
import ImageBrowserContainer from "./imageBrowser/ImageBrowserContainer";
import ImageResultsContainer from "./imageResults/ImageResultsContainer";

export default (Router = createRouter(() => ({
  welcome: () => WelcomeViewContainer,
  tabNavigation: () => TabNavigationViewContainer,
  snap: () => SnapViewContainer,
  deals: () => DealsViewContainer,
  redeem: () => RedeemViewContainer,
  settings: () => SettingsViewContainer,
  imageBrowser: () => ImageBrowserContainer,
  results: () => ImageResultsContainer
})));
