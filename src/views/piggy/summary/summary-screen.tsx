import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Header } from "react-native-elements"
import { FlatList } from "react-native"
import { TransactionStore } from "../../../models/tranasction-store"
import { SummaryCell } from "../summary-cell"

export interface SummaryScreenProps extends NavigationScreenProps<{}> {
  transactionStore: TransactionStore
}

@observer
export class Summary extends React.Component<SummaryScreenProps, {}> {
  componentDidMount() {
    this.refresh()
  }
  refresh() {
    this.props.transactionStore.getTransactionSummary("month")
  }
  render() {
    return (
      <Screen preset="scrollStack">
        <Header centerComponent={{ text: "Summary", style: { color: "#fff" } }} />
        <FlatList
          data={this.props.transactionStore.summary.list.slice()}
          renderItem={({ item }: { item: any }) => <SummaryCell preset="primary" item={item} currencySymbol={this.props.transactionStore.summary.currencySymbol} />}
          onRefresh={this.refresh}
          refreshing={this.props.transactionStore.isLoading}
          keyExtractor={item => item.title}
          extraData={{ extra: this.props.transactionStore.summary.list }}
        />
      </Screen>
    )
  }
}
