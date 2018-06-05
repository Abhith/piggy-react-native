import * as React from "react"
import { viewPresets, textPresets } from "./transaction-list.presets"
import { TransactionListProps } from "./transaction-list.props"
import { SectionList } from "react-native"
import { observer } from "mobx-react"
import { TransactionListItem } from "../../shared/transaction-list-item"
import { TransactionGroupHeader } from "../../shared/transaction-group-header"

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
@observer
export class TransactionList extends React.Component<TransactionListProps, null> {
  componentDidMount() {
    this.props.onRefresh()
  }

  renderRow = ({ item }) => {
    return (
      <TransactionListItem
        transaction={item}
        hideAccountDetails={this.props.hideAccountDetails}
      />
    )
  }

  renderSectionHeader = headerItem => {
    const totalAmount = Math.round(
      headerItem.section.data.reduce((sum, x) => sum + x.amountInDefaultCurrency, 0),
    )
    return <TransactionGroupHeader title={headerItem.section.title} totalAmount={totalAmount} />
  }

  render() {
    // grab the props
    const { preset = "primary", tx, text, style: styleOverride, ...rest } = this.props

    // assemble the style
    const viewPresetToUse = viewPresets[preset] || viewPresets.primary
    const textPresetToUse = textPresets[preset] || textPresets.primary

    const viewStyle = { ...viewPresetToUse, ...styleOverride }
    const textStyle = textPresetToUse
    return (
      <SectionList
        renderItem={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.props.groupedTransactions}
        onRefresh={() => this.props.onRefresh()}
        refreshing={this.props.loading}
        keyExtractor={item => item.id}
      />
    )
  }
}
