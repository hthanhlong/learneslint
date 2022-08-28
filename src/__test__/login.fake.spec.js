/* eslint-disable no-undef */
import renderer, { act } from 'react-test-renderer'
import { TESTID } from 'configs/Constants'
import Login from '../Login'
import appleAuth from '@invertase/react-native-apple-authentication'
import MockAdapter from 'axios-mock-adapter'
import api from 'utils/Apis/axios'
import API from 'configs/API'

const mock = new MockAdapter(api.axiosInstance)

jest.mock('@invertase/react-native-apple-authentication')

const mockDispatch = jest.fn()
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: () => 'vi',
    connect: () => {
      return component => component
    },
  }
})

jest.mock('@eohjsc/react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }) => children
  return { KeyboardAwareScrollView }
})
const mockReset = jest.fn()
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      reset: mockReset,
    }),
    useIsFocused: () => true,
  }
})

describe('Test Login', () => {
  let tree
  let Platform
  beforeEach(() => {
    Platform = require('react-native').Platform
    mockNavigate.mockClear()
    mockReset.mockClear()
  })

  const getElement = instance => {
    const loginTitle = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_TITLE,
    )
    const inputPhone = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_INPUT_PHONE_NUMBER,
    )
    const inputPassword = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_INPUT_PASSWORD,
    )
    const loginButton = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_INPUT_SUBMIT_BUTTON,
    )
    const facebookButton = instance.findAll(
      item => item.props.testID === TESTID.FACEBOOK_LOGIN_BUTTON,
    )
    const appleButton = instance.findAll(
      item => item.props.testID === TESTID.APPLE_LOGIN_BUTTON,
    )
    const googleButton = instance.findAll(
      item => item.props.testID === TESTID.GOOGLE_LOGIN_BUTTON,
    )
    const forgotPassword = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_INPUT_FORGOT_PASSWORD,
    )
    const signUp = instance.findAll(
      item => item.props.testID === TESTID.LOGIN_INPUT_SIGN_UP,
    )
    return {
      loginTitle,
      inputPhone,
      inputPassword,
      loginButton,
      facebookButton,
      appleButton,
      googleButton,
      forgotPassword,
      signUp,
    }
  }

  test('render Login screen android', () => {
    Platform.OS = 'android'
    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const {
      loginTitle,
      inputPhone,
      inputPassword,
      loginButton,
      facebookButton,
      appleButton,
    } = getElement(instance)
    expect(loginTitle[0].props.children).toBe('Đăng nhập')
    expect(inputPhone[0]).toBeDefined()
    expect(inputPassword[0]).toBeDefined()
    expect(loginButton[0]).toBeDefined()
    expect(facebookButton[0]).toBeDefined()
    expect(appleButton[0]).not.toBeDefined()
  })

  test('render Login screen ios', async () => {
    Platform.OS = 'ios'
    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const {
      loginTitle,
      inputPhone,
      inputPassword,
      loginButton,
      facebookButton,
      appleButton,
    } = getElement(instance)
    expect(loginTitle[0].props.children).toBe('Đăng nhập')
    expect(inputPhone[0]).toBeDefined()
    expect(inputPassword[0]).toBeDefined()
    expect(loginButton[0]).toBeDefined()
    expect(facebookButton[0]).toBeDefined()
    expect(appleButton[0]).toBeDefined()
  })

  test('render Login screen press forgor passowrd', async () => {
    await act(async () => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { forgotPassword } = getElement(instance)
    await act(async () => {
      forgotPassword[0].props.children.props.onPress()
    })
    expect(mockNavigate).toBeCalled()
  })

  test('login with not verified phone number', async () => {
    await act(async () => {
      tree = renderer.create(
        <Login errorData={{ code: 'phone_need_verify' }} />,
      )
    })
    expect(mockNavigate).toBeCalled()
  })

  test('render Login screen press signup', async () => {
    await act(async () => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { signUp } = getElement(instance)
    await act(async () => {
      signUp[0].props.onPress()
    })
    expect(mockNavigate).toBeCalled()
  })

  test('render Login screen is login', async () => {
    act(() => {
      tree = renderer.create(<Login />)
    })

    act(() => {
      tree.update(<Login isLoggedIn={true} />)
    })

    expect(mockReset).toBeCalled()
  })

  test('render Login screen press validate', async () => {
    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { inputPhone, inputPassword, loginButton } = getElement(instance)

    act(() => {
      loginButton[0].props.onPress()
    })

    expect(inputPhone[0].props.errorText).toBe('Vui lòng nhập số điện thoại')
    expect(inputPassword[0].props.errorText).toBe('Vui lòng nhập mật khẩu')
  })

  test('render Login screen press validate with wrong phone and pass', async () => {
    const mockedSignIn = jest.fn()
    await act(async () => {
      tree = renderer.create(<Login loginEmail={mockedSignIn} />)
    })

    const instance = tree.root

    const { inputPhone, inputPassword, loginButton } = getElement(instance)

    await act(async () => {
      inputPhone[0].props.onChange('113456789')
      inputPassword[0].props.onChange('conganday')
    })

    await act(async () => {
      loginButton[0].props.onPress()
    })

    expect(inputPhone[0].props.errorText).toBe('')
    expect(inputPassword[0].props.errorText).toBe('')
    expect(mockedSignIn).toBeCalled()
  })

  test('render Login screen press apple login', async () => {
    Platform.OS = 'ios'
    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { appleButton } = getElement(instance)

    act(() => {
      appleButton[0].props.onPress()
    })

    expect(appleAuth.performRequest).toBeCalled()
  })

  test('render Login screen press facebook login', async () => {
    mock.onPost(API.AUTH.LOGIN_FACEBOOK).reply(200, {})

    Platform.OS = 'ios'
    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { facebookButton } = getElement(instance)

    await act(async () => {
      await facebookButton[0].props.onPress()
    })
    expect(mockDispatch).not.toBeCalled()
  })

  test('render Login screen press google login', async () => {
    mock.onPost(API.AUTH.LOGIN_SOCIAL_GG).reply(200, {})

    act(() => {
      tree = renderer.create(<Login />)
    })

    const instance = tree.root

    const { googleButton } = getElement(instance)

    await act(async () => {
      await googleButton[0].props.onPress()
    })
    expect(mockDispatch).not.toBeCalled()
  })
})
