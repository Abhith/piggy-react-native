import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../../shared/text"
import { viewPresets, textPresets } from "./account-list.presets"
import { AccountListProps } from "./account-list.props"
import { View } from "react-native"
import { ListItem } from "react-native-elements"
import { FlatList } from "react-native"
import { AccountCell } from "../../piggy/account-cell"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AccountList(props: AccountListProps) {
  // grab the props
  const { preset = "primary", tx, text, style: styleOverride, ...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }
  const textStyle = textPresetToUse

  return (
    // <View style={viewStyle} {...rest}> 
    <View> 
      <ListItem containerStyle={viewStyle} bottomDivider title={props.title} />
      <FlatList
        data={props.accounts}
        renderItem={({ item }: { item: any }) => <AccountCell account={item} />}
        onRefresh={props.onRefresh}
        refreshing={props.isLoading}
        keyExtractor={item => item.id.toString()}
        //  extraData={{ extra: this.props.toDoStore.todos }
      />
    </View>
  )
}
