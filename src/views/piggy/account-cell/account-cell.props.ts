import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { AccountCellPresetNames } from "./account-cell.presets"
import { NavigationScreenProp } from "react-navigation";

export interface AccountCellProps extends TouchableOpacityProperties {
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
  preset?: AccountCellPresetNames
  account: any
  navigation: NavigationScreenProp<any, any>
}
