import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/fonts';
import * as COMMON_STYLES from '../../constants/commonStyles';

const tabHeight = 35;
export default styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 15,
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
        textAlign: 'center',
        fontSize: FONTS.HEADER_FONT_SIZE
    },
    inputWrapper: {
        marginTop: 10,
        width: Dimensions.get('window').width - 30,
        borderBottomColor: COLORS.WHITE,
        borderBottomWidth: 1,
    },
    // input: {
    //     height: 40,
    //     color: COLORS.WHITE,
    // },
    buttonWrapper: {
        marginTop: 25,
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        marginBottom: 20,
    },
    multiInputContainer: {
        flexDirection: 'row',
        marginHorizontal: -5
    },
    input: {
        flex: .9,
        height: 40,
        // borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: COLORS.TEXT_GRAY,
        marginBottom: 10,
        borderRadius: 4,
        paddingHorizontal: 10
    },
    multiInput: {
        marginHorizontal: 5,
    },


})