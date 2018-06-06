import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Card, ListItem } from "react-native-elements"
import { TransactionSnapshot } from "../../../models/transaction/transaction"

export interface TransactionDetailsSummaryTabScreenProps extends NavigationScreenProps<{}> {
  transaction: TransactionSnapshot
}

@observer
export class TransactionDetailsSummaryTab extends React.Component<
  TransactionDetailsSummaryTabScreenProps,
  {}
> {
  render() {
    return (
      <Screen preset="fixedStack">
        <Card>
          <ListItem
            title={this.props.transaction.category.name}
            leftIcon={{
              name: this.props.transaction.category.icon.replace("icon-", ""),
              type: "simple-line-icon",
              // iconStyle: props.account.currentBalance > 0 ? INCOME : EXPENSE,
            }}
          />
          <ListItem
            title={this.props.transaction.amount.toString()}
            leftIcon={{
              name: "attach-money",
            }}
          />
          <ListItem
            title={this.props.transaction.description}
            leftIcon={{
              name: "event-note",
            }}
          />
          <ListItem
            title={this.props.transaction.transactionTime}
            leftIcon={{
              name: "access-time",
            }}
          />
          <ListItem
            title={this.props.transaction.account.name}
            leftIcon={{
              name: "account-balance-wallet",
            }}
          />
          <ListItem
            title={this.props.transaction.creatorUserName}
            leftIcon={{
              name: "account-circle",
            }}
          />
        </Card>
      </Screen>
    )
  }
}
