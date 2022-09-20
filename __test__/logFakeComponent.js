/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import t from 'i18n'
import { KeyboardAwareScrollView } from '@eohjsc/react-native-keyboard-aware-scroll-view'

import { loginEmail, loginSocial } from 'actions/auth'
import { Images } from 'configs'
import { TESTID } from 'configs/Constants'
import Text from 'components/Text'
import SocialButton from 'components/Auth/SocialButton'
import TextInput from 'components/Form/TextInput'
import TextInputPassword from 'components/Form/TextInputPassword'
import { useBlockBackAndroid } from 'hooks/Common'
import { useSocialLogin } from 'hooks/SocialLogin'
import SocialSignin from 'utils/SocialSignin'
import Routes from 'utils/Route'
import styles from './LoginStyles'

import { Button } from 'components/Common'
import { useNavigation } from '@react-navigation/native'

// eslint-disable-next-line no-shadow
const Login = ({ isLoggedIn, loginEmail, loginSocial, errorData }) => {
  useBlockBackAndroid()
  const loginFacebook = useSocialLogin('facebook')
  const loginGoogle = useSocialLogin('google')
  const loginApple = useSocialLogin('apple')
  const [phone, setPhoneState] = useState('')
  const [phoneError, setPhoneErrorState] = useState()
  const [password, setPasswordState] = useState('')
  const [passwordError, setPasswordlErrorState] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    SocialSignin.configGG()
  }, [])

  useEffect(() => {
    if (errorData && errorData.code === 'phone_need_verify') {
      navigation.navigate(Routes.PhoneNumberVerification, {
        userId: errorData.user_id,
        phone: errorData.phone,
        title: t('text_verification'),
      })
    }
  }, [errorData, navigation])

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    }
  }, [isLoggedIn, navigation])

  const validate = () => {
    Keyboard.dismiss()
    let hasError = false
    if (!phone) {
      setPhoneErrorState(t('please_enter_your_phone_number'))
      hasError = true
    } else {
      setPhoneErrorState('')
    }
    if (!password) {
      setPasswordlErrorState(t('please_enter_your_password'))
      hasError = true
    } else {
      setPasswordlErrorState('')
    }
    if (!hasError) {
      loginEmail({ username: phone, password })
    }
  }

  return (
    <SafeAreaView style={styles.wrap}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollView, styles.hwrap]}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={styles.wrapLogo}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.center]}>
          <Text bold style={styles.loginText} testID={TESTID.LOGIN_TITLE}>
            {t('text_login_ad')}
          </Text>
          <TextInput
            placeholder={t('phone_number')}
            onChange={setPhoneState}
            errorText={phoneError}
            value={phone}
            keyboardType={'numeric'}
            textInputStyle={styles.paddingVertical}
            testID={TESTID.LOGIN_INPUT_PHONE_NUMBER}
            accessibilityLabel={TESTID.LOGIN_INPUT_PHONE_NUMBER}
            accessibilityLabelError={TESTID.LOGIN_INPUT_PHONE_NUMBER_ERROR}
          />
          <TextInputPassword
            secureTextEntry
            placeholder={t('text_password')}
            onChange={setPasswordState}
            value={password}
            errorText={passwordError}
            testID={TESTID.LOGIN_INPUT_PASSWORD}
            textInputStyle={styles.paddingVertical}
            returnKeyType={'done'}
            onSubmitEditing={validate}
            accessibilityLabel={TESTID.LOGIN_INPUT_PASSWORD}
            accessibilityLabelError={TESTID.LOGIN_INPUT_PASSWORD_ERROR}
          />
          <TouchableOpacity
            style={styles.forgotWrap}
            testID={TESTID.LOGIN_INPUT_FORGOT_PASSWORD}
          >
            <Text
              onPress={() => {
                navigation.navigate(Routes.ForgotPassword)
              }}
              style={styles.forgotText}
            >
              {t('forgot_password')}
            </Text>
          </TouchableOpacity>

          <View style={[styles.buttonWrap]}>
            <Button
              type="auth"
              title={t('text_login_ad')}
              onPress={validate}
              testID={TESTID.LOGIN_INPUT_SUBMIT_BUTTON}
              accessibilityLabel={TESTID.LOGIN_INPUT_SUBMIT_BUTTON}
            />
          </View>
        </View>

        <View style={styles.separatorWrap}>
          <View style={styles.separator} />
          {Platform.OS === 'ios' && (
            <Text style={styles.separatorText}>{t('text_or_login_with')}</Text>
          )}
          <View style={styles.separator} />
        </View>
        <View style={styles.socialWrap}>
          <SocialButton
            icon={Images.imgGoogle}
            wrapStyle={styles.googleLoginButton}
            onPress={loginGoogle}
            testID={TESTID.GOOGLE_LOGIN_BUTTON}
          />
          <SocialButton
            icon={Images.imgFacebook}
            wrapStyle={styles.facebookLoginButton}
            onPress={loginFacebook}
            testID={TESTID.FACEBOOK_LOGIN_BUTTON}
          />
          {Platform.OS === 'ios' && (
            <SocialButton
              icon={'apple'}
              onPress={loginApple}
              testID={TESTID.APPLE_LOGIN_BUTTON}
            />
          )}
        </View>

        <View style={styles.touWrap}>
          <Text style={[styles.touText]}>{t('don_t_have_an_account')}</Text>
          <Text
            bold
            style={styles.signUpText}
            onPress={() => navigation.navigate(Routes.SignUp)}
            testID={TESTID.LOGIN_INPUT_SIGN_UP}
          >
            {' ' + t('text_sign_up_capitalize')}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn,
  account: state.auth.account,
  errorData: state.auth.errorData,
})
const mapDispatchToProps = {
  loginEmail,
  loginSocial,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
