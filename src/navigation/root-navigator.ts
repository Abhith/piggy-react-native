import { StackNavigator } from "react-navigation"
import { Login } from "../views/account/login/login-screen"
import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = StackNavigator(
  {
    LoginNavigator: { screen: Login },
    exampleStack: { screen: ExampleNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
