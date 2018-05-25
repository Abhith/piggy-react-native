import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import moment from "moment"
import { SectionList } from "react-native"
import { View } from "react-native"
import { ViewStyle } from "react-native"
import { Header } from "react-native-elements"
import { TransactionStore } from "../../../models/tranasction-store/transaction-store"
import { TransactionGroupHeader } from "../../shared/transaction-group-header"
import { TransactionListItem } from "../../shared/transaction-list-item"
export interface RecentTransactionsScreenProps extends NavigationScreenProps<{}> {
  transactionStore: TransactionStore
}

const FULL: ViewStyle = { flex: 1 }

@observer
export class RecentTransactions extends React.Component<RecentTransactionsScreenProps, {}> {
  componentDidMount() {
    console.log("RecentTransactions componentDidMount")
    this.refresh(this.props)
  }
  refresh(props: RecentTransactionsScreenProps) {
    props.transactionStore.getTransactionsAsync(
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
  renderRow = ({ item }) => {
    return (
      <TransactionListItem
        transaction={item}
        hideAccountDetails={false}
        // navigation={this.props.navigation}
        // refresh={this.refresh.bind(this)}
      />
    )
  }

  renderSectionHeader = headerItem => {
    const totalAmount = Math.round(
      headerItem.section.data.reduce((sum, x) => sum + x.amountInDefaultCurrency, 0),
    )
    return <TransactionGroupHeader title={headerItem.section.title} totalAmount={totalAmount} />
  }

  render() {
    return (
      <View style={FULL}>
        <Header
          // leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "Recent Transactions", style: { color: "#fff" } }}
          // rightComponent={{ icon: "home", color: "#fff" }}
          placement="left"
        />
        {/* <SearchBar
          showLoading={this.props.transactionStore.isLoading}
          platform="android"
          placeholder="Recent Transactions"
        /> */}
        <SectionList
          renderItem={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.props.transactionStore.groupedRecentTransactions}
          onRefresh={() => this.refresh(this.props)}
          refreshing={this.props.transactionStore.isLoading}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
