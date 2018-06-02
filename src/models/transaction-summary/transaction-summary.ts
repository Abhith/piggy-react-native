import { types } from "mobx-state-tree"

export const TransactionSummaryModel = types.model("TransactionSummary").props({
  accountExpense: types.number,
  accountIncome: types.number,
  accountSaved: types.number,
  currencySymbol: types.string,
  expensePercentage: types.string,
  incomePercentage: types.string,
  netWorthPercentage: types.string,
  savedPercentage: types.string,
  tenantExpense: types.number,
  tenantIncome: types.number,
  tenantNetWorth: types.number,
  tenantSaved: types.number,
  userExprense: types.number,
  userIncome: types.number,
  userNetWorth: types.number,
  userSaved: types.number,
  list: types.optional(types.array(types.frozen), []),
})

type TransactionSummaryType = typeof TransactionSummaryModel.Type
export interface TransactionSummary extends TransactionSummaryType {}
