import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/fonts';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    contentWrapper: {
        paddingHorizontal: 15,

    },
    brand: {
        fontSize: FONTS.HEADER_FONT_SIZE + 3,
        color: COLORS.GREY,
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginVertical: 20,
    },
    codeWrapper: {
        height: 200,
        //marginBottom: 35,
    },
    description: {
        marginVertical: 10,
        color: COLORS.GREY,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
    },
    coloredOverlay: {
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.TRANSPARENT_BLACK
    },
    codeBox: {
        height: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.GREY
    },
    codeText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.GREY,
        fontSize: FONTS.BIG_FONT_SIZE
    },
    buttonWrapper: {
        marginVertical: 5,
    },
})