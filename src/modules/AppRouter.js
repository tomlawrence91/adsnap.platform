import { createRouter } from "@exponent/ex-navigation";

import WelcomeViewContainer from "./welcome/WelcomeViewContainer";
import HomeViewContainer from './home/HomeViewContainer'
import ChallengesViewContainer from './challenges/ChallengesViewContainer'
import ChallengeDetailsContainer from './challengeDetails/ChallengeDetailsContainer'
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
  home: () => HomeViewContainer,
  challenges: () => ChallengesViewContainer,
  challengeDetails: () => ChallengeDetailsContainer,
  tabNavigation: () => TabNavigationViewContainer,
  snap: () => SnapViewContainer,
  deals: () => DealsViewContainer,
  redeem: () => RedeemViewContainer,
  settings: () => SettingsViewContainer,
  imageBrowser: () => ImageBrowserContainer,
  results: () => ImageResultsContainer
})));
