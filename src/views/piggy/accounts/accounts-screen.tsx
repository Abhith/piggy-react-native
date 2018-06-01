import React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Header, ListItem } from "react-native-elements"
import { AccountStore } from "../../../models/account-store/account-store"
import { SectionList } from "react-native"
import { AccountCell } from "../account-cell"
import { ViewStyle } from "react-native"
import { spacing } from "../../../theme"

export interface AccountsScreenProps extends NavigationScreenProps<{}> {
  accountStore: AccountStore
}

const ACCOUNT_HEADER: ViewStyle = { marginTop: spacing[2] }

@observer
export class Accounts extends React.Component<AccountsScreenProps, {}> {
  componentDidMount() {
    this.refresh()
  }
  refresh() {
    this.props.accountStore.getTenantAccountsAsync()
  }
  renderRow = ({ item }) => {
    return <AccountCell account={item} />
  }
  renderSectionHeader = headerItem => {
    return (
      <ListItem bottomDivider containerStyle={ACCOUNT_HEADER} title={headerItem.section.title} />
    )
  }
  render() {
    return (
      <Screen preset="scrollStack">
        <Header centerComponent={{ text: "Accounts", style: { color: "#fff" } }} />
        <SectionList
          renderItem={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.props.accountStore.accounts}
          onRefresh={() => this.refresh()}
          refreshing={this.props.accountStore.isLoading}
          keyExtractor={item => item.id}
        />
      </Screen>
    )
  }
}
