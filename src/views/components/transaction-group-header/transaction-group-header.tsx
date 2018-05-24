import * as React from "react"
import { viewPresets, textPresets } from "./transaction-group-header.presets"
import { TransactionGroupHeaderProps } from "./transaction-group-header.props"
import { ListItem } from "react-native-elements"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function TransactionGroupHeader(props: TransactionGroupHeaderProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse

  return (
    <ListItem
      bottomDivider
      title={props.title}
      rightTitle={props.totalAmount.toString() + " INR"}
    />

    //     // style={{ color: this.props.totalAmount > 0 ? variable.brandPrimary : variable.brandInfo, alignSelf: "flex-end" }}
  )
}
