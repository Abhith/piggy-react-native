import * as React from "react"
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { Button, Input } from "react-native-elements"
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons"
// const TabSelector = ({ selected }) => {
//   return (
//     <View style={styles.selectorContainer}>
//       <View style={selected && styles.selected}/>
//     </View>
//   )
// }
// TabSelector.propTypes = {
//   selected: PropTypes.bool.isRequired,
// }

import { NavigationScreenProps } from "react-navigation"
import { bg_screen } from "./"
import { observer, inject } from "mobx-react"

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

export interface LoginScreenProps extends NavigationScreenProps<{}> {
  loginStore: any
}

@inject("loginStore")
@observer
export class Login extends React.Component<LoginScreenProps, {}> {
  tenantNameInput: any
  usernameInput: any
  pwdinput: any

  componentDidMount() {
    this.props.loginStore.clearStore()
  }

  login() {
    this.props.loginStore.validateForm()
    let props = this.props
    if (this.props.loginStore.isValid) {
      this.props.loginStore.authenticate().then(() => {
        console.log("props", props)
        if (props.loginStore.isAuthenticated) {
          this.props.navigation.navigate("secondExample")
          // props.userStore.getCurrentLoginInformations().then(() => {
          //   if (props.userStore.isAuthenticated) {
          //     props.navigation.navigate("Drawer");
          //   } else {
          //     Toast.show({
          //       text: "Login failed",
          //       duration: 2000,
          //       position: "top",
          //       textStyle: { textAlign: "center" },
          //     });
          //   }
          // });
        } else {
          // Toast.show({
          //   text: props.loginForm.loginError,
          //   duration: 2000,
          //   position: "top",
          //   textStyle: { textAlign: "center" },
          // });
        }
      })
      // this.props.loginForm.clearStore();
      // this.props.navigation.navigate("Drawer");
    } else {
      // Toast.show({
      //   text: "Enter Valid Family name, Username & password!",
      //   duration: 2000,
      //   position: "top",
      //   textStyle: { textAlign: "center" },
      // });
    }
  }

  render() {
    const form = this.props.loginStore
    return (
      <View style={styles.container}>
        <ImageBackground source={bg_screen} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior="position">
              <View style={styles.titleContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.titleText}>PIGGY</Text>
                </View>
                <View style={{ marginTop: -10, marginLeft: 10 }}>
                  <Text style={styles.titleText}>VAULT</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button
                  // disabled={isLoading}
                  clear
                  // activeOpacity={0.7}
                  // onPress={() => this.selectCategory(0)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[styles.categoryText, styles.selectedCategoryText]}
                  title={"Login"}
                />
                {/* <Button
                  // disabled={isLoading}
                  clear
                  // activeOpacity={0.7}
                  // onPress={() => this.selectCategory(1)}
                  containerStyle={{ flex: 1 }}
                  // titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                  title={"Sign up"}
                /> */}
              </View>
              <View style={styles.rowSelector}>
                {/* <TabSelector selected={isLoginPage}/>
                  <TabSelector selected={isSignUpPage}/> */}
              </View>
              <View style={styles.formContainer}>
                <Input
                  leftIcon={
                    <SimpleIcon
                      name="home"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                  value={form.tenantName}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  // keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Family name"}
                  containerStyle={{ borderBottomColor: "rgba(0, 0, 0, 0.38)" }}
                  ref={input => (this.tenantNameInput = input)}
                  // onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={tenantName => form.tenantNameOnChange(tenantName)}
                  // errorMessage={isEmailValid ? null : "Please enter a valid email address"}
                />
                <Input
                  leftIcon={
                    <SimpleIcon
                      name="user"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                  value={form.username}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  // keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Username or email"}
                  containerStyle={{ borderBottomColor: "rgba(0, 0, 0, 0.38)" }}
                  ref={input => (this.usernameInput = input)}
                  // onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => form.usernameOnChange(email)}
                  // errorMessage={isEmailValid ? null : "Please enter a valid email address"}
                />
                <Input
                  leftIcon={
                    <SimpleIcon
                      name="lock"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                  // value={password}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  // returnKeyType={isSignUpPage ? "next" : "done"}
                  blurOnSubmit={true}
                  containerStyle={{ marginTop: 16, borderBottomColor: "rgba(0, 0, 0, 0.38)" }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Password"}
                  ref={input => (this.pwdinput = input)}
                  // onSubmitEditing={() =>
                  //   isSignUpPage ? this.confirmationInput.focus() : this.login()
                  // }
                  onChangeText={password => form.passwordOnChange(password)}
                  // errorMessage={isPasswordValid ? null : "Please enter at least 8 characters"}
                />

                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  title="LOGIN"
                  loading={form.isBusy}
                  onPress={() => this.login()}
                  titleStyle={styles.loginTextButton}
                  disabled={form.isBusy}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
              {/* <Button
                title={"Need help ?"}
                titleStyle={{ color: "white" }}
                buttonStyle={{ backgroundColor: "transparent" }}
                onPress={() => console.log("Account created")}
              /> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center",
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white",
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular",
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
})
