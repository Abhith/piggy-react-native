import { StackNavigator } from "react-navigation"
import { Accounts } from "../views/piggy/accounts/accounts-screen"
import { Home } from "../views/piggy/home/home-screen"
import { Login } from "../views/account/login/login-screen"
// import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = StackNavigator(
  {
    accounts: { screen: Accounts },
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
