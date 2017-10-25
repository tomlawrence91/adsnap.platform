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

export default class SignUpModal extends React.Component {
	onEmailChange(text) { this.props.setEmail(text) }

	onPasswordChange(text) { this.props.setPassword(text) }
	
	renderForm() {
		return (
			<View>
				<View style={styles.inputWrapper}>
					<TextInput
						underlineColorAndroid={COLORS.TRANSPARENT}
						selectionColor={COLORS.WHITE}
						keyboardType={'email-address'}
						autoCapitalize={'none'}
						placeholder={'Email'}
						onChangeText={(text) => this.onEmailChange(text)}
						placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
						style={styles.input} />
				</View>
				<View style={styles.inputWrapper}>
					<TextInput
						underlineColorAndroid={COLORS.TRANSPARENT}
						selectionColor={COLORS.WHITE}
						secureTextEntry={true}
						autoCapitalize={'none'}
						placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
						placeholder={'Password'}
						onChangeText={(text) => this.onPasswordChange(text)}
						style={styles.input} />
				</View>
			</View>
		);
	}
	render() {
		return (
			<Modal
				animationType={"slide"}
				transparent={true}
				visible={this.props.visible}
				onRequestClose={this.props.cancel}>

				<View style={{ flex: 1 }}>
					<Image style={styles.backgroundImage} source={ICONS.WELCOME_BG} />
					<ScrollView
						style={{ flex: 1 }}
						keyboardShouldPersistTaps={'always'}
						contentContainerStyle={styles.scrollView}>
						<TouchableOpacity style={styles.cancel} onPress={this.props.cancel}>
							<Text style={styles.cancelIcon}>X</Text>
						</TouchableOpacity>
						<Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>

						<Text style={styles.description}>Sign in</Text>

						{this.renderForm()}
						{/*TODO: password reset*/}

						<View style={styles.buttonWrapper}>
							<RectButton
								onPress={this.props.onLoginPress}
								text={`Sign in`}
								width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
								height={COMMON_STYLES.BUTTON_HEIGHT}
								textColor={COLORS.WHITE}
								backgroundColor={COLORS.TRANSPARENT}
								border={{ borderColor: COLORS.WHITE, borderStyle: 'solid', borderWidth: 2 }} />
						</View>
					</ScrollView>
				</View>
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
	backgroundImage: {
		position: 'absolute',
		flex: 1,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		//width: Dimensions.get('window').width,
		resizeMode: 'cover',
		// justifyContent: 'center',
		alignItems: 'center'
	},
	scrollView: {
		alignItems: 'center',
		justifyContent: 'center'
	},
}