import {StyleSheet, Dimensions} from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/fonts';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent: 'center'
    },
    brand:{
        fontSize: FONTS.HEADER_FONT_SIZE,
        color: COLORS.WHITE,
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginVertical: 30,
    },
    codeWrapper:{
        height:200,
        marginBottom: 35,
    },
    backgroundImage:{
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    coloredOverlay: {
        opacity: 0.6,
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: COLORS.TRANSPARENT_LIGHT_PURPLE
    },
    codeBox:{
        height: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.WHITE
    },
    codeText:{
        backgroundColor:'transparent',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontSize: FONTS.SMALL_FONT_SIZE
    }
})