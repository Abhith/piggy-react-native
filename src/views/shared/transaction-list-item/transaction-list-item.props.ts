import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { TransactionListItemPresetNames } from "./transaction-list-item.presets"
import { NavigationScreenProp } from "react-navigation"
import { TransactionStore } from "../../../models/tranasction-store";

export interface TransactionListItemProps extends TouchableOpacityProperties {
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
  preset?: TransactionListItemPresetNames

  transaction: any
  hideAccountDetails: boolean
  navigation: NavigationScreenProp<any, any>
  transactionStore: TransactionStore
}
