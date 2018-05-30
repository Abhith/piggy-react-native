import React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../../shared/text"
import { viewPresets, textPresets } from "./account-cell.presets"
import { AccountCellProps } from "./account-cell.props"
import { ListItem } from "react-native-elements"
import { TextStyle } from "react-native"
import { color } from "../../../theme"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AccountCell(props: AccountCellProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse
  const INCOME: TextStyle = { color: color.palette.primary }
  const EXPENSE: TextStyle = { color: color.palette.lightGrey }

  return (
    <ListItem
      title={props.account.name}
      rightTitle={props.account.currentBalance + " " + props.account.currency.symbol}
      rightTitleStyle={props.account.currentBalance > 0 ? INCOME : EXPENSE}
      leftIcon={{
        name: "bookmark",
        // type: "simple-line-icon",
        iconStyle: props.account.currentBalance > 0 ? INCOME : EXPENSE,
      }}
    />
  )
}
