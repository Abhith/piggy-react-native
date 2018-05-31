import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Header } from "react-native-elements"
import { AccountStore } from "../../../models/account-store/account-store"
import { AccountList } from "../../shared/account-list"

export interface AccountsScreenProps extends NavigationScreenProps<{}> {
  accountStore: AccountStore
}

@observer
export class Accounts extends React.Component<AccountsScreenProps, {}> {
  componentDidMount() {
    this.refresh()
  }
  refresh(){
    this.props.accountStore.getTenantAccountsAsync()
  }
  render() {
    return (
      <Screen preset="scrollStack">
        <Header centerComponent={{ text: "Accounts", style: { color: "#fff" } }} />
        <AccountList title="My Accounts" accounts={this.props.accountStore.userAccounts} isLoading={this.props.accountStore.isLoading} onRefresh={this.refresh}/>
        <AccountList title="Family Accounts" accounts={this.props.accountStore.userAccounts} isLoading={this.props.accountStore.isLoading} onRefresh={this.refresh}/>
      </Screen>
    )
  }
}
