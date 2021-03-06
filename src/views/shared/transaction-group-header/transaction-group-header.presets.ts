import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../../theme"

/**
 * The component will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  marginTop: spacing[2],
}

/**
 * All text will start off looking like this.
 */
const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondary information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.white } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 9, color: color.palette.white } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TransactionGroupHeaderPresetNames = keyof typeof viewPresets
