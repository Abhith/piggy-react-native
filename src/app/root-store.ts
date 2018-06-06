import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation/navigation-store"
import { LoginStoreModel } from "../login-store"
import { UserStoreModel } from "../user-store"
import { TransactionStoreModel } from "../tranasction-store"
import { AccountStoreModel } from "../account-store/account-store"
/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  loginStore: types.optional(LoginStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  transactionStore: types.optional(TransactionStoreModel, {
    recentTransactions: [],
    accountTransactions: [],
    summary: {
      accountExpense: 0,
      accountIncome: 0,
      accountSaved: 0,
      currencySymbol: "₹",
      expensePercentage: "100%",
      incomePercentage: "100%",
      netWorthPercentage: "100%",
      savedPercentage: "100%",
      tenantExpense: 0,
      tenantIncome: 0,
      tenantNetWorth: 0,
      tenantSaved: 0,
      userExprense: 0,
      userIncome: 0,
      userNetWorth: 0,
      userSaved: 0,
    },
  }),
  accountStore: types.optional(AccountStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
