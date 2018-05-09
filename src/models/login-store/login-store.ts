import { types, flow } from "mobx-state-tree"
import axios from "axios"
import { Api } from "../../services/api"
import { save } from "../../lib/storage"

export const LoginStoreModel = types
  .model("LoginStoreModel", {
    tenantName: types.optional(types.string, ""),
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    loginError: types.optional(types.string, ""),
    isValid: types.optional(types.boolean, false),
    isAuthenticated: types.optional(types.boolean, false),
    isBusy: types.optional(types.boolean, false),
  })
  .actions(self => {
    function tenantNameOnChange(id) {
      self.tenantName = id
    }
    function usernameOnChange(name) {
      self.username = name
    }
    function passwordOnChange(pwd) {
      self.password = pwd
    }

    function validateForm() {
      if (
        self.loginError === "" &&
        self.username !== "" &&
        self.password !== "" &&
        self.tenantName !== ""
      ) {
        self.isValid = true
      }
    }
    function clearStore() {
      self.username = ""
      self.tenantName = ""
      self.isValid = false
      self.loginError = ""
      self.password = ""
      self.isBusy = false
    }
    const authenticate = flow(function*() {
      self.isBusy = true
      const api = new Api()
      api.setup()
      const authResult = yield api.authenticate({
        tenancyName: self.tenantName,
        usernameOrEmailAddress: self.username,
        password: self.password,
      })

      if (authResult.kind === "ok") {
        yield save("authToken", authResult.token)
        axios.defaults.headers.common.Authorization = `Bearer ${authResult.token}`
        self.isAuthenticated = true
      } else {
        self.loginError = authResult.kind
      }
      self.isBusy = false
    })

    return {
      tenantNameOnChange,
      usernameOnChange,
      passwordOnChange,
      validateForm,
      clearStore,
      authenticate,
    }
  })

export const LoginStore = LoginStoreModel.create({
  username: "",
  password: "",
  loginError: "",
  tenantName: "",
  isValid: false,
  isAuthenticated: false,
  isBusy: false,
})
