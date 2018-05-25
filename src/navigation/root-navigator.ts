import { StackNavigator } from "react-navigation"
// import { Splash } from "../views/piggy/splash/splash-screen"
import { Home } from "../views/piggy/home/home-screen"
import { Login } from "../views/account/login/login-screen"
// import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = StackNavigator(
  {
    // Splash: { screen: Splash },
    home: { screen: Home },
    login: { screen: Login },
    // exampleStack: { screen: ExampleNavigator },
  },
  {
    initialRouteName: "home",
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
