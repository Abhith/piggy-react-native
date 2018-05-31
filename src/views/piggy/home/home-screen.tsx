import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { observer, inject } from "mobx-react"
import { Animated, View, Text, StyleSheet } from "react-native"
import { TabViewAnimated, TabBar } from "react-native-tab-view"
import { Icon } from "react-native-elements"
import { RecentTransactions } from "../recent-transactions"
import { Accounts } from "../accounts";
import { AccountStore } from "../../../models/account-store/account-store";
import { TransactionStore } from "../../../models/tranasction-store";
export interface HomeScreenProps extends NavigationScreenProps<{}> {
  style: any
  transactionStore: TransactionStore
  navigationStore: any
  userStore: any
  accountStore: AccountStore
}

@inject("transactionStore")
@inject("navigationStore")
@inject("userStore")
@inject("accountStore")
@observer
export class Home extends React.Component<HomeScreenProps, {}> {
  constructor(props: HomeScreenProps) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        {
          key: "recent",
          icon: "assignment",
          color: "#F44336",
        },
        {
          key: "accounts",
          icon: "account-balance",
          color: "#3F51B5",
        },
        {
          key: "albums",
          icon: "assessment",
          color: "#4CAF50",
        },
      ],
    }
  }

  componentDidMount() {
    // console.log("componentDidMount Home")
    let props = this.props
    props.userStore.initialize().then(() => {
      if (!props.userStore.isAuthenticated) {
        props.navigation.navigate("login")
      }
    })
  }

  _handleIndexChange = index =>
    this.setState({
      index,
    })

  _renderIndicator = props => {
    const { width, position } = props
    const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2]

    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
    })
    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => {
        const d = x - Math.trunc(x)
        return d === 0.49 || d === 0.51 ? 0 : 1
      }),
    })
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map(x => Math.round(x) * width),
    })
    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => props.navigationState.routes[Math.round(x)].color),
    })

    return (
      <Animated.View style={[styles.container, { width, transform: [{ translateX }] }]}>
        <Animated.View
          style={[styles.indicator, { backgroundColor, opacity, transform: [{ scale }] }]}
        />
      </Animated.View>
    )
  }

  _renderIcon = ({ route }) => <Icon name={route.icon} color="white" />
  _renderBadge = ({ route }) => {
    if (route.key === "2") {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>42</Text>
        </View>
      )
    }
    return undefined
  }
  _renderFooter = props => (
    <TabBar
      {...props}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
      renderIndicator={this._renderIndicator}
      style={styles.tabbar}
    />
  )

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "recent":
        return (
          <RecentTransactions
            navigation={this.props.navigation}
            transactionStore={this.props.transactionStore}
          />
        )
      case "accounts":
        return (
          <Accounts navigation={this.props.navigation} 
          accountStore={this.props.accountStore} 
          />
        )
      default:
        return (
          // <DashboardPage
          //   navigation={this.props.navigation}
          //   transactionStore={this.props.transactionStore}
          // />
          <Text>Default</Text>
        )
    }
  }

  render() {
    return (
      <TabViewAnimated
        style={this.props.style}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "#263238",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0084ff",
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: "#f44336",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  count: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -2,
  },
})
