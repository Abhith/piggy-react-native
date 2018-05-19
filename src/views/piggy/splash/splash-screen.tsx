import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { observer, inject } from "mobx-react"
import { SplashScreen } from "../../components/splash-screen"
export interface SplashScreenProps extends NavigationScreenProps<{}> {
  userStore: any
}

@inject("userStore")
@observer
export class Splash extends React.Component<SplashScreenProps, {}> {
  componentDidMount() {
    let props = this.props
    props.userStore.initialize().then(() => {
      if (props.userStore.isAuthenticated) {
        props.navigation.navigate("HomeNavigator")
      } else {
        props.navigation.navigate("LoginNavigator")
      }
    })
  }
  render() {
    return <SplashScreen />
  }
}
