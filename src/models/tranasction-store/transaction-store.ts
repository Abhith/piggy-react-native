import { types, flow } from "mobx-state-tree"
// import { AsyncStorage } from "react-native";
import moment from "moment"
import _ from "lodash"
import { Api } from "../../services/api"
import * as Types from "../../services/api"
// // declaring the shape of a node with the type `Todo`
// const Account = types.model({
//     title: types.string
// })

// const Transaction = types.model("Transaction", {
//     account: types.frozen,
//     amount: types.number,
//     amountInDefaultCurrency: types.number,
//     balance: types.number,
//     category: types.frozen,
//     creatorUserName: types.string,
//     description: types.string,
//     id: types.string,
//     transactionTime: types.Date,
// });

// export const TransactionSummary = types.model("TransactionSummary", {
//   accountExpense: types.number,
//   accountIncome: types.number,
//   accountSaved: types.number,
//   currencySymbol: types.string,
//   expensePercentage: types.string,
//   incomePercentage: types.string,
//   netWorthPercentage: types.string,
//   savedPercentage: types.string,
//   tenantExpense: types.number,
//   tenantIncome: types.number,
//   tenantNetWorth: types.number,
//   tenantSaved: types.number,
//   userExprense: types.number,
//   userIncome: types.number,
//   userNetWorth: types.number,
//   userSaved: types.number,
// })

export const TransactionStoreModel = types
  .model("TransactionStoreModel", {
    recentTransactions: types.optional(types.array(types.frozen), []),
    isLoadingTranasctions: types.optional(types.boolean, false),
    accountTransactions: types.optional(types.array(types.frozen), []),
    // summary: TransactionSummary,
  })
  .actions(self => {
    const getTransactionsAsync = flow(function*(
      type: string,
      startDate: string,
      endDate: string,
      accountId: string,
    ) {
      const api = new Api()
      api.setup()

      self.isLoadingTranasctions = true
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

        const transactionsResponse = yield api.getTransactions(input)

        if (type === "tenant") {
          self.recentTransactions = transactionsResponse.items
        } else {
          if (monthlyTransactionsOfAccount) {
            self.accountTransactions[
              self.accountTransactions.indexOf(monthlyTransactionsOfAccount)
            ].transactions =
              transactionsResponse.items
          } else {
            self.accountTransactions.push({
              monthIndex: monthIndex,
              accountId: accountId,
              transactions: transactionsResponse.items,
            })
          }
          // self.selectedAccountTransactions = transactionsResponse.data.result.items;
        }
        console.log("transactionsResponse", transactionsResponse, self)
        self.isLoadingTranasctions = false
        return transactionsResponse
      } catch (error) {
        console.error(error)
        self.isLoadingTranasctions = false
      }
    })

    function groupTransactions(transactions: Array<any>) {
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
    }

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

    // const getTransactionSummary = flow(function*(duration: string) {
    //   try {
    //     const response = yield axios.post(
    //       `${API_ENDPOINT}services/app/tenantDashboard/GetTransactionSummary`,
    //       {
    //         duration: duration,
    //       },
    //     )

    //     if (response.data.success) {
    //       self.summary.tenantNetWorth = response.data.result.tenantNetWorth
    //       self.summary.userNetWorth = response.data.result.userNetWorth
    //       self.summary.tenantExpense = response.data.result.tenantExpense
    //       self.summary.userExprense = response.data.result.userExprense
    //       self.summary.tenantIncome = response.data.result.tenantIncome
    //       self.summary.userIncome = response.data.result.userIncome
    //       self.summary.tenantSaved = response.data.result.tenantSaved
    //       self.summary.userSaved = response.data.result.userSaved
    //       // console.log(response.data.result);
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // })

    return {
      getTransactionsAsync,
      groupTransactions,
      //   getAccountTransactions,
      //   saveTransactionComment,
      //   getTransactionComments,
      //   getTransactionSummary,
    }
  })
  .views(self => {
    return {
      get groupedRecentTransactions() {
        console.log("groupedRecentTransactions", self)
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

          return groupedData
        }

        return []
      },
    }
  })

// export const TransactionStore = TransactionStoreModel.create({
//   isLoadingTranasctions: false,
//   recentTransactions: [],
//   accountTransactions: [],
//   //   summary: {
//   //     accountExpense: 0,
//   //     accountIncome: 0,
//   //     accountSaved: 0,
//   //     currencySymbol: "₹",
//   //     expensePercentage: "100%",
//   //     incomePercentage: "100%",
//   //     netWorthPercentage: "100%",
//   //     savedPercentage: "100%",
//   //     tenantExpense: 0,
//   //     tenantIncome: 0,
//   //     tenantNetWorth: 0,
//   //     tenantSaved: 0,
//   //     userExprense: 0,
//   //     userIncome: 0,
//   //     userNetWorth: 0,
//   //     userSaved: 0,
//   //   },
// })