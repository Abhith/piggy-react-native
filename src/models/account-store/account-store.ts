import { types, flow, getEnv } from "mobx-state-tree"
import { Environment } from "../environment"
import { AccountModel, AccountSnapshot } from "../account/account"

export const AccountStoreModel = types
  .model("AccountStore")
  .props({
    userAccounts: types.optional(types.array(AccountModel), []),
    othersAccounts: types.optional(types.array(AccountModel), []),
    status: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
  }) // Setters
  .actions(self => ({
    setStatus(value?: "idle" | "pending" | "done" | "error") {
      self.status = value
    },
  }))
  .views(self => ({
    get environment() {
      return getEnv(self) as Environment
    },
    get isLoading() {
      return self.status === "pending"
    },
    get accounts() {
      let accounts =[]
      accounts.push({
        data: self.userAccounts.peek() as AccountSnapshot[], title:"My Accounts",
      })
      accounts.push({
        data: self.othersAccounts.peek() as AccountSnapshot[], title:"Family Accounts",
      })
      // console.log("accounts", accounts)
      return accounts
    },
  }))
  .actions(self => ({
    getTenantAccountsAsync: flow(function*() {
      self.setStatus("pending")
      try {
        const result = yield self.environment.api.getTenantAccounts()
        if (result.kind === "ok") {
          self.userAccounts = result.userAccounts
          self.othersAccounts = result.otherMembersAccounts
          self.setStatus("done")
        } else {
          self.setStatus("error")
        }
      } catch (error) {
        self.setStatus("error")
      }
    }),
  }))
  .views(self => ({}))

type AccountStoreType = typeof AccountStoreModel.Type
export interface AccountStore extends AccountStoreType {}
