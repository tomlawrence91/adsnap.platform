import * as SearchState from './SnapState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as COMMON_STYLES from '../../constants/commonStyles';
import * as COLORS from '../../constants/colors';
import React from 'react';
import {
    PropTypes,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Image,
    Text,
    ListView,
    MapView,
    Animated,
    StatusBar,
    View,
    InteractionManager,
    ScrollView
} from 'react-native';
import * as ROUTES from '../../constants/routes';
import * as ICONS from '../../constants/icons';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Camera from 'react-native-camera';

import styles from './SearchStyles';


const SearchView = React.createClass({
    getInitialState(){
        return {

        }
    },
    render() {
        return (
            <Container>
               
            </Container>
        );
    }
});

export default SearchView;
