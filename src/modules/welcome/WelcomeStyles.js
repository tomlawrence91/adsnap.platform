import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/fonts';
import * as COMMON_STYLES from '../../constants/commonStyles';

const tabHeight = 35;
export default styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        // height: 50,
        // flexDirection: 'row',
        // alignItems: 'center',
    // },
    // logoWrapper: {
    //     flex: 1,
    //     alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 150,
        resizeMode: 'contain'
    },

    description: {
        backgroundColor: 'transparent',
        color: COLORS.WHITE,
        margin: 20,
        textAlign: 'center'
    },
    // formWrapper: {
    //     marginBottom: 20,
    // },
    // inputWrapper: {
    //     marginTop: 10,
    //     width: 300,
    //     borderBottomColor: COLORS.WHITE,
    //     borderBottomWidth: 1,
    // },
    // label: {
    //     color: COLORS.WHITE,
    //     fontSize: FONTS.DEFAULT_FONT_SIZE,
    //     backgroundColor: 'transparent',
    // },
    // input: {
    //     height: 40,
    //     color: COLORS.WHITE,
    // },
    buttonWrapper: {
        marginVertical: 5,
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },


})