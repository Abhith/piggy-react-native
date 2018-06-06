import { createStackNavigator  } from "react-navigation"
import { TransactionComments } from "../views/piggy/transaction-comments/transaction-comments-screen"
import { TransactionDetailsSummaryTab } from "../views/piggy/transaction-details-summary-tab/transaction-details-summary-tab-screen"
import { TransactionDetails } from "../views/piggy/transaction-details/transaction-details-screen"
import { AccountDetails } from "../views/piggy/account-details/account-details-screen"
import { Summary } from "../views/piggy/summary/summary-screen"
import { Accounts } from "../views/piggy/accounts/accounts-screen"
import { Home } from "../views/piggy/home/home-screen"
import { Login } from "../views/account/login/login-screen"

export const RootNavigator = createStackNavigator (
  {
    transactionComments: { screen: TransactionComments },
    transactionDetailsSummary: { screen: TransactionDetailsSummaryTab },
    transactionDetails: { screen: TransactionDetails },
    accountDetails: { screen: AccountDetails },
    summary: { screen: Summary },
    accounts: { screen: Accounts },
    home: { screen: Home },
    login: { screen: Login },
    // exampleStack: { screen: ExampleNavigator },
  },
  {
    initialRouteName: "home",
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
