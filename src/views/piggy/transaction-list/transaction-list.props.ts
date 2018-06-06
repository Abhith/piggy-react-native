import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { TransactionListPresetNames } from "./transaction-list.presets"
import { NavigationScreenProp } from "react-navigation"

export interface TransactionListProps extends TouchableOpacityProperties {
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
  preset?: TransactionListPresetNames

  onRefresh(): void
  groupedTransactions: any
  loading: boolean
  hideAccountDetails?: boolean
  navigation: NavigationScreenProp<any, any>
}
