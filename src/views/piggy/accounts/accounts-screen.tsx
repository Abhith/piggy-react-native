import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"

export interface AccountsScreenProps extends NavigationScreenProps<{}> {
}

// @inject("mobxstuff")
@observer
export class Accounts extends React.Component<AccountsScreenProps, {}> {
  render () {
    return (
      <Screen preset="fixedCenter">
        <Text preset="header" tx="Accounts.header" />
      </Screen>
    )
  }
}
