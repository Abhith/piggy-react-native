import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { observer } from "mobx-react"
import { SplashScreen } from "../../components/splash-screen"
export interface SplashScreenProps extends NavigationScreenProps<{}> {}

// @inject("mobxstuff")
@observer
export class Splash extends React.Component<SplashScreenProps, {}> {
  render() {
    return <SplashScreen />
  }
}
