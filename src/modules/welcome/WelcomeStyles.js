import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';

const tabHeight = 35;
export default styles = StyleSheet.create({
    logoWrapper:{
        flex: .4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    logo: {
        // width:75,
        height: 150,
        resizeMode: 'contain'
    },
    contentWrapper:{flex:1},
    description: {
        backgroundColor: 'transparent',
        color: COLORS.WHITE,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    formWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20,
        justifyContent: 'center'
    },
    inputWrapper: {
        flex:1,
        width: 300,
    },
    input: {
        // width: 200,
        height: 40,
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        marginVertical: 10,
        color: COLORS.WHITE
    },
    label:{
        color: COLORS.WHITE,
        fontSize: FONTS.DEFAULT_FONT_SIZE,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    background: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        resizeMode: 'cover', // or 'stretch'
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    title: {
        backgroundColor: 'transparent',
        color: COLORS.WHITE,
        marginTop: 20,
        fontSize: 22,
        marginBottom: 30
    },
    // logo: {
    //     height: 160,
    //     marginTop: 50,
    //     resizeMode: 'contain'
    // },
    divider:{
        marginHorizontal: 50,
        width:3,
        backgroundColor: COLORS.WHITE,
        paddingVertical: 15,
    },
    tabSwitch:{
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        height: tabHeight
    },
    tab:{
        textAlign: 'center',
        lineHeight: tabHeight,
        height: tabHeight,
        backgroundColor: 'transparent',
        color: COLORS.WHITE,
        fontSize: 16,
        width: 110
    },
    tabHover:{
        fontSize: 17,
        textDecorationLine: 'underline'
    },
    button: {
        width: 200
    }


})