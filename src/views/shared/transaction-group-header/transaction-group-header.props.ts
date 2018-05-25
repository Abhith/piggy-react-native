import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { TransactionGroupHeaderPresetNames } from "./transaction-group-header.presets"

export interface TransactionGroupHeaderProps extends TouchableOpacityProperties {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * One of the different types of text presets.
   */
  preset?: TransactionGroupHeaderPresetNames

  title: any
  totalAmount: number
}
