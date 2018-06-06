import React from "react"
import { TransactionListItemProps } from "./transaction-list-item.props"
import { ListItem } from "react-native-elements"
import { View, Text } from "react-native"
import { TextStyle } from "react-native"
import { color } from "../../../theme"
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function TransactionListItem(props: TransactionListItemProps) {
  const CATEGORY: TextStyle = { color: color.palette.primaryText }
  const INCOME: TextStyle = { color: color.palette.primary }
  const EXPENSE: TextStyle = { color: color.palette.lightGrey }

  const renderTransactionAccountDetails = (transaction: any) => {
    if (!props.hideAccountDetails) {
      return <Text>{`${transaction.creatorUserName}'s ${transaction.account.name}`}</Text>
    }
    return null
  }

  return (
    <ListItem
      onPress={() => props.navigation.navigate("transactionDetails", { transaction: props.transaction, transactionStore: props.transactionStore  })}
      title={props.transaction.category.name}
      titleStyle={CATEGORY}
      rightTitle={props.transaction.amount + " " + props.transaction.account.currency.symbol}
      rightTitleStyle={props.transaction.amount > 0 ? INCOME : EXPENSE}
      subtitle={
        <View>
          <Text numberOfLines={2}>{props.transaction.description}</Text>
          {renderTransactionAccountDetails(props.transaction)}
        </View>
      }
      leftIcon={{
        name: props.transaction.category.icon.replace("icon-", ""),
        type: "simple-line-icon",
        iconStyle: props.transaction.amount > 0 ? INCOME : EXPENSE,
      }}
    />
  )
}
