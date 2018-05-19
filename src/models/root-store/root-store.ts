import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation-store"
import { LoginStoreModel } from "../login-store"
import { UserStoreModel } from "../user-store"
/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  loginStore: types.optional(LoginStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
