import React from 'react';
import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import * as COMMON_STYLES from '../constants/commonStyles';
import * as COLORS from '../constants/colors';
import * as ICONS from '../constants/icons';
import * as FONTS from '../constants/fonts';
import RectButton from './RectButton';
import GenderButton from './GenderButton';

export default class SignUpModal extends React.Component {
    renderAccountInfoForm() {
        return (
            <View style={styles.form}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        underlineColorAndroid={COLORS.WHITE}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        placeholder={'Email'}
                        onChangeText={(text) => this.props.setEmail(text)}
                        placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
                        style={styles.input} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        underlineColorAndroid={COLORS.WHITE}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
                        placeholder={'Password'}
                        onChangeText={(text) => this.props.setPassword(text)}
                        style={styles.input} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        underlineColorAndroid={COLORS.WHITE}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
                        placeholder={'Repeat password'}
                        onChangeText={(text) => this.props.confirmPassword(text)}
                        style={styles.input} />
                </View>
            </View>
        );
    }
    renderGenderForm() {
        return (
            <View style={styles.form}>
                <Text style={styles.title}>Gender</Text>
                <View style={styles.genderButtonWrapper}>
                    <GenderButton
                        text={'Female'}
                        onPress={() => this.props.setGender('FEMALE')}
                        selected={this.props.gender == 'FEMALE'}
                        inactiveIcon={ICONS.FEMALE_ACTIVE}
                        activeIcon={ICONS.FEMALE_ACTIVE}
                    />
                    <GenderButton
                        text={'Male'}
                        onPress={() => this.props.setGender('MALE')}
                        selected={this.props.gender == 'MALE'}
                        inactiveIcon={ICONS.MALE_ACTIVE}
                        activeIcon={ICONS.MALE_ACTIVE}
                    />
                    <GenderButton
                        text={'Other'}
                        onPress={() => this.props.setGender('OTHER')}
                        selected={this.props.gender == 'OTHER'}
                        inactiveIcon={ICONS.OTHER_ACTIVE}
                        activeIcon={ICONS.OTHER_ACTIVE}
                    />
                </View>
            </View>
        );
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}>


                <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
                    <ScrollView
                        keyboardShouldPersistTaps={true}
                        contentContainerStyle={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.cancel} onPress={this.props.cancel}><Text style={styles.cancelIcon}>X</Text></TouchableOpacity>

                        <Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>

                        <Text style={styles.description}>Sign up</Text>

                        {this.renderAccountInfoForm()}
                        {this.renderGenderForm()}
                        {/*TODO: password reset*/}

                        <View style={styles.buttonWrapper}>
                            <RectButton
                                onPress={this.props.onSignUpPress}
                                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                                height={COMMON_STYLES.BUTTON_HEIGHT}
                                textColor={COLORS.WHITE}
                                backgroundColor={COLORS.TRANSPARENT}
                                border={{ borderColor: COLORS.WHITE, borderStyle: 'solid', borderWidth: 2 }}
                                text={`Sign up`} />
                        </View>
                    </ScrollView>

                </Image>

            </Modal>
        );
    }
}

const styles = {
    cancel: {
        position: 'absolute',
        top: 30,
        right: 15,
        width: 20,
        height: 20,
    },
    cancelIcon: {
        fontSize: FONTS.HEADER_FONT_SIZE,
        fontWeight: '500',
        color: COLORS.SOFT_TRANSPARENT_WHITE,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    logo: {
        height: 150,
        resizeMode: 'contain',
        marginTop: 50,
    },
    form: {
        marginVertical: 5,
    },
    title: {
        color: COLORS.WHITE,
        fontSize: FONTS.DEFAULT_FONT_SIZE,
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
    input: {
        height: 40,
        color: COLORS.WHITE,
    },
    buttonWrapper: {
        marginTop: 25,
    },
    genderButtonWrapper: {
        flexDirection: 'row',
        marginHorizontal: -100,
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        // justifyContent: 'center',
        alignItems: 'center'
    },
}