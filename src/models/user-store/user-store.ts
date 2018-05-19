import { types, flow } from "mobx-state-tree"
import axios from "axios"
import { Api } from "../../services/api"
import { save, loadString } from "../../lib/storage"

export const UserStoreModel = types
  .model("UserStoreModel", {
    emailAddress: types.optional(types.string, ""),
    id: types.optional(types.number, 0),
    tenantId: types.optional(types.number, 0),
    name: types.optional(types.string, ""),
    profilePictureId: types.optional(types.string, ""),
    surname: types.optional(types.string, ""),
    userName: types.optional(types.string, ""),
    isAuthenticated: types.optional(types.boolean, false),
    authToken: types.optional(types.string, ""),
    editionDisplayName: types.optional(types.string, ""),
    tenantName: types.optional(types.string, ""),
    tenantUniqueName: types.optional(types.string, ""),
    isBusy: types.optional(types.boolean, false),
  })
  .actions(self => {
    const initialize = flow(function*() {
      self.isBusy = true
      try {
        const authToken = yield loadString("authToken")
        if (authToken) {
          self.authToken = authToken
          axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
          self.isAuthenticated = true
        } else {
          self.isAuthenticated = false
        }
        self.isBusy = false
      } catch {
        self.isAuthenticated = false
        self.isBusy = false
      }
    })
    return {
      initialize,
    }
  })

export const UserStore = UserStoreModel.create({})
