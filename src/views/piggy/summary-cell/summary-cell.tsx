import * as React from "react"
import { viewPresets, textPresets } from "./summary-cell.presets"
import { SummaryCellProps } from "./summary-cell.props"
import { Card, Text } from "react-native-elements"
import { ProgressCircle } from "react-native-svg-charts"
import { color } from "../../../theme"
import { View } from "react-native"
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function SummaryCell(props: SummaryCellProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse

  return (
    <Card title={props.item.title}>
      <View style={viewStyle}>
        <ProgressCircle
          style={{ height: 70, width: 70 }}
          progress={props.item.user / props.item.tenant}
          strokeWidth={10}
          progressColor={color.palette.primary}
        />
        <View>
          <Text style={textStyle}> Your: {props.item.user} {props.currencySymbol}</Text>
          <Text style={textStyle}> Family: {props.item.tenant} {props.currencySymbol}</Text>
        </View>
      </View>
    </Card>
  )
}
