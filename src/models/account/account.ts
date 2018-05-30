import { types } from "mobx-state-tree"

/**
 * A TODO list item
 */
export const AccountModel = types
  .model("Account")
  .props({
      /**
     * A unique identifier for this todo
     */
    id: types.identifier(types.string),
    name: types.string,
    currency: types.frozen,
    accountType: types.string,
    creatorUserName: types.string,
    currentBalance: types.number,
    ownAccount: types.boolean,
    
  })
  // setters
  .actions(self => ({
  }))

type AccountType = typeof AccountModel.Type
export interface Account extends AccountType {}
type AccountSnapshotType = typeof AccountModel.SnapshotType
export interface AccountSnapshot extends AccountSnapshotType {}
