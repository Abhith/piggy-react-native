import * as React from "react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { observer } from "mobx-react"

export interface HomeScreenProps extends NavigationScreenProps<{}> {}

// @inject("mobxstuff")
@observer
export class Home extends React.Component<HomeScreenProps, {}> {
  render() {
    return (
      <Screen preset="fixedCenter">
        <Text preset="header" tx="Home.header" />
      </Screen>
    )
  }
}
