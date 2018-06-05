import React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import moment from "moment"
import { View } from "react-native"
import { ViewStyle } from "react-native"
import { Header } from "react-native-elements"
import { TransactionStore } from "../../../models/tranasction-store/transaction-store"
import { TransactionList } from "../transaction-list"
export interface RecentTransactionsScreenProps extends NavigationScreenProps<{}> {
  transactionStore: TransactionStore
}

const FULL: ViewStyle = { flex: 1 }

@observer
export class RecentTransactions extends React.Component<RecentTransactionsScreenProps, {}> {

  refresh() {
    this.props.transactionStore.getTransactionsAsync(
      "tenant",
      moment
        .utc()
        .subtract(2, "month")
        .toISOString(),
      moment
        .utc()
        .endOf("month")
        .toISOString(),
      undefined,
    )
  }
  render() {
    return (
      <View style={FULL}>
        <Header centerComponent={{ text: "Recent Transactions", style: { color: "#fff" } }} />
        <TransactionList
          onRefresh={this.refresh.bind(this)}
          groupedTransactions={this.props.transactionStore.groupedRecentTransactions}
          loading={this.props.transactionStore.isLoading}
        />
      </View>
    )
  }
}
