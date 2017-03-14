import { StyleSheet, Platform } from 'react-native';
import * as COMMON_STYLES from '../../constants/commonStyles';
import * as COLORS from '../../constants/colors';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 64 : 56;

export default styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        height: 30,
        width: 100,
        resizeMode: 'contain',
        opacity: .7
    },
    tabIconActive: {
        height: 36,
        width: 110,
        resizeMode: 'contain',

    }
});
