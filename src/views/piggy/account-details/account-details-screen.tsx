import * as React from "react"
import { observer, inject } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Header } from "react-native-elements"
import { AccountSnapshot } from "../../../models/account/account"
import moment from "moment"
import { StyleSheet } from "react-native"
import { TabView, TabBar } from "react-native-tab-view"
import { TransactionList } from "../transaction-list"
import { TransactionStore } from "../../../models/tranasction-store"
import { Dimensions } from "react-native"
import { View } from "react-native"

export interface AccountDetailsScreenProps
  extends NavigationScreenProps<{ account: AccountSnapshot }> {
  transactionStore: TransactionStore
  style
}

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width,
}

@inject("transactionStore")
@observer
export class AccountDetails extends React.Component<
  AccountDetailsScreenProps,
  {
    monthlyTransactions
    index: number
    routes
  }
> {
  static backgroundColor = "#fff"
  static tintColor = "#222"
  static appbarElevation = 0

  state = {
    monthlyTransactions: [
      {
        isLoading: false,
        transactions: [],
      },
      {
        isLoading: false,
        transactions: [],
      },
      {
        isLoading: false,
        transactions: [],
      },
      {
        isLoading: false,
        transactions: [],
      },
      {
        isLoading: false,
        transactions: [],
      },
      {
        isLoading: false,
        transactions: [],
      },
    ],
    index: 5,
    routes: [{ key: "1", title: "Last Month" }, { key: "0", title: "This Month" }],
  }

  generateTabs = () => {
    let tabs = this.state.routes
    for (let i = 2; i < 6; i++) {
      tabs.unshift({
        title: moment
          .utc()
          .subtract(i, "month")
          .format("MM/YYYY"),
        key: i.toString(),
      })
    }

    this.setState({
      ...this.state,
      routes: tabs,
    })
  }
  componentDidMount() {
    this.generateTabs()
  }

  _handleIndexChange = index =>
    this.setState({
      index,
    })

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  )

  _renderScene = ({ route }) => {
    return (
      <TransactionList
        onRefresh={() => {
          this.refresh(route.key)
        }}
        groupedTransactions={this.state.monthlyTransactions[route.key].transactions}
        loading={this.state.monthlyTransactions[route.key].isLoading}
        // style={[styles.page, { backgroundColor: "#E3F4DD" }]}
        // hideAccountDetails
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{
            text: this.props.navigation.state.params.account.name,
            style: { color: "#fff" },
          }}
        />
        <TabView
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          // initialLayout={initialLayout}
        />
      </View>
    )
  }

  refresh(monthDeviationIndex: number) {
    console.log("refresh", monthDeviationIndex, this.state)
    let monthlyTransactions = this.state.monthlyTransactions
    monthlyTransactions[monthDeviationIndex].isLoading = true
    this.setState({
      ...this.state,
      monthlyTransactions,
    })
    this.props.transactionStore
      .getAccountTransactions(this.props.navigation.state.params.account.id, monthDeviationIndex)
      .then(result => {
        monthlyTransactions[monthDeviationIndex].isLoading = false
        monthlyTransactions[
          monthDeviationIndex
        ].transactions = this.props.transactionStore.groupTransactions(result)
        this.setState({
          ...this.state,
          monthlyTransactions,
        })
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: "#3f51b5",
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: "#ffeb3b",
  },
  label: {
    color: "#fff",
    fontWeight: "400",
  },
})
