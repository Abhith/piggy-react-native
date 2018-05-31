import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation-store"
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
