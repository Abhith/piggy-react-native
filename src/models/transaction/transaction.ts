import { types } from "mobx-state-tree"

/**
 * A TODO list item
 */
export const TransactionModel = types
  .model("Transaction")
  .props({
    account: types.frozen,
    amount: types.number,
    amountInDefaultCurrency: types.number,
    balance: types.number,
    category: types.frozen,
    creatorUserName: types.string,
    description: types.string,
    transactionTime: types.string,
    /**
     * A unique identifier for this todo
     */
    id: types.identifier(types.string),
  })
  // setters
  .actions(self => ({
    // setId(value: number) {
    //   self.id = value
    // },
    // setTitle(value: string) {
    //   self.title = value
    // },
    // toggleIsComplete() {
    //   self.isComplete = !self.isComplete
    // },
  }))

type TransactionType = typeof TransactionModel.Type
export interface Transaction extends TransactionType {}
type TransactionSnapshotType = typeof TransactionModel.SnapshotType
export interface TransactionSnapshot extends TransactionSnapshotType {}
