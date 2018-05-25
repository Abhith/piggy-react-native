import React from "react"
import { viewPresets, textPresets } from "./transaction-list-item.presets"
import { TransactionListItemProps } from "./transaction-list-item.props"
import { ListItem } from "react-native-elements"
import { View, Text } from "react-native"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function TransactionListItem(props: TransactionListItemProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse

  const renderTransactionAccountDetails = (transaction: any) => {
    if (!props.hideAccountDetails) {
      return <Text>{`${transaction.creatorUserName}'s ${transaction.account.name}`}</Text>
    }
    return null
  }

  return (
    // // onPress={() =>
    // //   this.props.navigation.navigate("TransactionDetails", {
    // //     transaction: this.props.transaction,
    // //     refresh: this.props.refresh,
    // //   })
    // // }
    // >
    //   // style={{
    //   //   color: this.props.transaction.amount > 0 ? variable.brandPrimary : variable.brandInfo,
    //   // }}

    <ListItem
      title={props.transaction.category.name}
      rightTitle={props.transaction.amount + " " + props.transaction.account.currency.symbol}
      // subtitle={props.transaction.description}
      subtitle={
        <View>
          <Text numberOfLines={2}>{props.transaction.description}</Text>
          {renderTransactionAccountDetails(props.transaction)}
        </View>
      }
      leftIcon={{
        name: props.transaction.category.icon.replace("icon-", ""),
        type: "simple-line-icon",
      }}
    />
  )
}
