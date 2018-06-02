import { types, flow, getEnv } from "mobx-state-tree"
import moment from "moment"
import _ from "lodash"
import * as Types from "../../services/api"
import { TransactionModel } from "../transaction/transaction"
import { Environment } from "../environment"
import { TransactionSummaryModel } from "../transaction-summary/transaction-summary"

export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    recentTransactions: types.optional(types.array(TransactionModel), []),
    /**
     * The status of the API request
     */
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    accountTransactions: types.optional(types.array(types.frozen), []),
    summary: TransactionSummaryModel,
  })
  // Setters
  .actions(self => ({
    setStatus(value?: "idle" | "pending" | "done" | "error") {
      self.status = value
    },
    //  setToDos(value: ToDo[] | ToDoSnapshot[]) {
    //    if (self.todos) {
    //      if (value) {
    //        self.todos.replace(value as any)
    //      } else {
    //        self.todos.clear()
    //      }
    //    } else {
    //      self.todos = value as any
    //    }
    //  },
  }))
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment
    },
    get isLoading() {
      return self.status === "pending"
    },
  }))
  .actions(self => ({
    getTransactionsAsync: flow(function*(
      type: string,
      startDate: string,
      endDate: string,
      accountId: string,
    ) {
      self.setStatus("pending")
      try {
        const input: Types.GetTransactionsInput = {
          type: type,
          accountId: accountId,
          startDate: startDate,
          endDate: endDate,
        }
        let monthlyTransactionsOfAccount: any
        let monthIndex: string
        if (type === "account") {
          monthIndex = moment(startDate).format("YYYYMM")
          monthlyTransactionsOfAccount = self.accountTransactions.find(function(obj) {
            return obj.accountId === accountId && obj.monthIndex === monthIndex
          })
          // if (monthlyTransactionsOfAccount && monthlyTransactionsOfAccount.transactions) {
          //     self.selectedAccountTransactions = monthlyTransactionsOfAccount.transactions;
          // } else {
          //     self.selectedAccountTransactions = [];
          // }
        }
        const result = yield self.environment.api.getTransactions(input)
        if (result.kind === "ok") {
          if (type === "tenant") {
            self.recentTransactions = result.transactions
          } else {
            if (monthlyTransactionsOfAccount) {
              self.accountTransactions[
                self.accountTransactions.indexOf(monthlyTransactionsOfAccount)
              ].transactions =
                result.transactions
            } else {
              self.accountTransactions.push({
                monthIndex: monthIndex,
                accountId: accountId,
                transactions: result.transactions,
              })
            }
            // self.selectedAccountTransactions = transactionsResponse.data.result.items;
          }

          self.setStatus("done")
        } else {
          self.setStatus("error")
        }
      } catch (error) {
        self.setStatus("error")
      }
    }),

    getTransactionSummary: flow(function*(duration: string) {
      try {
        const response = yield self.environment.api.getTransactionSummary(duration)

        if (response.kind === "ok") {
          self.summary.tenantNetWorth = response.data.tenantNetWorth
          self.summary.userNetWorth = response.data.userNetWorth
          self.summary.tenantExpense = response.data.tenantExpense
          self.summary.userExprense = response.data.userExprense
          self.summary.tenantIncome = response.data.tenantIncome
          self.summary.userIncome = response.data.userIncome
          self.summary.tenantSaved = response.data.tenantSaved
          self.summary.userSaved = response.data.userSaved
          self.summary.list.push({
            title: "Net Worth",
            user: self.summary.userNetWorth,
            tenant: self.summary.tenantNetWorth,
          })
          self.summary.list.push({
            title: "Income",
            user: self.summary.userIncome,
            tenant: self.summary.tenantIncome,
          })
          self.summary.list.push({
            title: "Expense",
            user: self.summary.userExprense,
            tenant: self.summary.tenantExpense,
          })
          self.summary.list.push({
            title: "Saved",
            user: self.summary.userSaved,
            tenant: self.summary.tenantSaved,
          })
          self.setStatus("done")
        } else {
          self.setStatus("error")
        }
      } catch (error) {
        self.setStatus("error")
      }
    }),
    groupTransactions(transactions: Array<any>) {
      if (transactions && transactions.length > 0) {
        let groupedData = _.groupBy(transactions, result =>
          moment.utc(result.transactionTime).format("ddd, DD MMM, YYYY"),
        )
        // console.log('transactions', groupedData);
        groupedData = _.reduce(
          groupedData,
          (acc, next, index) => {
            acc.push({
              data: next,
              title: index,
            })
            return acc
          },
          [],
        )

        return groupedData
      }

      return []
    },

    // const getAccountTransactions = flow(function*(accountId: string, monthDeviationIndex: number) {
    //   let startDate = moment
    //     .utc()
    //     .subtract(monthDeviationIndex, "month")
    //     .startOf("month")
    //     .toISOString()
    //   let endDate = moment
    //     .utc()
    //     .subtract(monthDeviationIndex, "month")
    //     .endOf("month")
    //     .toISOString()
    //   let monthlyTransactionsOfAccount: any
    //   let monthIndex: string

    //   monthIndex = moment(startDate).format("YYYYMM")
    //   return yield getTransactionsAsync("account", startDate, endDate, accountId).then(() => {
    //     monthlyTransactionsOfAccount = self.accountTransactions.find(function(obj) {
    //       return obj.accountId === accountId && obj.monthIndex === monthIndex
    //     })

    //     console.log("monthlyTransactionsOfAccount", monthlyTransactionsOfAccount)

    //     if (monthlyTransactionsOfAccount && monthlyTransactionsOfAccount.transactions) {
    //       return monthlyTransactionsOfAccount.transactions
    //     } else {
    //       return []
    //     }
    //   })
    // })
    // const saveTransactionComment = flow(function*(transactionId: string, content: string) {
    //   return yield axios.post(
    //     `${API_ENDPOINT}services/app/transaction/CreateOrUpdateTransactionCommentAsync`,
    //     { transactionId: transactionId, content: content },
    //   )
    // })

    // const getTransactionComments = flow(function*(transactionId: string) {
    //   return yield axios.post(`${API_ENDPOINT}services/app/transaction/GetTransactionComments`, {
    //     id: transactionId,
    //   })
    // })
  }))
  .views(self => ({
    get groupedRecentTransactions() {
      if (self.recentTransactions && self.recentTransactions.length > 0) {
        let groupedData = _.groupBy(self.recentTransactions, result =>
          moment.utc(result.transactionTime).format("ddd, DD MMM, YYYY"),
        )

        groupedData = _.reduce(
          groupedData,
          (acc, next, index) => {
            acc.push({
              data: next,
              title: index,
            })
            return acc
          },
          [],
        )
        // console.log("groupedRecentTransactions", groupedData)
        return groupedData
      }

      return []
    },
  }))

type TransactionStoreType = typeof TransactionStoreModel.Type
export interface TransactionStore extends TransactionStoreType {}
