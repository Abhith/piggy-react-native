import * as React from "react"
import { observer } from "mobx-react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Dimensions, StyleSheet } from "react-native"
import * as GestureHandler from "react-native-gesture-handler"
import { TabView, TabBar } from "react-native-tab-view"
import { View } from "react-native"
import { ViewStyle } from "react-native"
import { Header } from "react-native-elements"
import { TransactionDetailsSummaryTab } from "../transaction-details-summary-tab"
import { TransactionSnapshot } from "../../../models/transaction/transaction"

export interface TransactionDetailsScreenProps
  extends NavigationScreenProps<{
      transaction: TransactionSnapshot
    }> {
  style: any
}
const FULL: ViewStyle = { flex: 1 }
const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width,
}

// @inject("mobxstuff")
@observer
export class TransactionDetails extends React.Component<
  TransactionDetailsScreenProps,
  {
    index: number
    routes: any
  }
> {
  constructor(props: TransactionDetailsScreenProps) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: "transaction", icon: "md-cash", title: "Overview" },
        { key: "chat", icon: "md-chatbubbles", title: "Comments" },
      ],
    }
  }
  _handleIndexChange = index =>
    this.setState({
      index,
    })

  _renderTabBar = props => <TabBar {...props} style={styles.tabbar} labelStyle={styles.label} />

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "transaction":
        return (
          <TransactionDetailsSummaryTab
            transaction={this.props.navigation.state.params.transaction}
            navigation={this.props.navigation}
          />
        )
      // case "chat":
      //   return (
      //     <TransactionChat
      //       transaction={this.props.navigation.state.params.transaction}
      //       navigation={this.props.navigation}
      //       transactionStore={this.props.transactionStore}
      //     />
      //   )
      default:
        return <Text>200</Text>
    }
  }

  render() {
    return (
      <View style={FULL}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack(),
          }}
          // centerComponent={{ text: "Recent Transactions", style: { color: "#fff" } }}
        />
        <TabView
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: "#f44336",
  },
  label: {
    color: "#fff",
    fontWeight: "400",
  },
})
