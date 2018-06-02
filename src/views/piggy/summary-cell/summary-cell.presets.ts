import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../../theme"

/**
 * The component will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  flexDirection: "row",
  // justifyContent: "space-around",
  // alignItems: "center",
  // // marginTop: 10,
  // height: 80,
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
  primary: { ...BASE_VIEW } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 20, color: color.palette.primaryText } as TextStyle,
}

/**
 * A list of preset names.
 */
export type SummaryCellPresetNames = keyof typeof viewPresets
