import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { loadString } from "../../lib/storage"
import { TransactionSnapshot } from "../../models/transaction/transaction"
import { AccountSnapshot } from "../../models/account/account"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  async setup() {
    // construct the apisauce instance
    try {
      const authToken = await loadString("authToken")
      this.apisauce = create({
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: "application/json",
        },
      })
      if (authToken) {
        this.apisauce.setHeader("Authorization", `Bearer ${authToken}`)
      }
    } catch (e) {
      console.tron.log(e.message)
    }
  }

  async authenticate(credentials: Types.Credentials): Promise<Types.AuthenticateResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `/Account/Authenticate`,
      credentials,
    )
    // console.log("authenticate", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", token: response.data.result }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getTransactions(
    getTransactionsInput: Types.GetTransactionsInput,
  ): Promise<Types.GetTransactionsResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `services/app/transaction/GetTransactionsAsync`,
      getTransactionsInput,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const transactions: TransactionSnapshot[] = response.data.result.items
      return { kind: "ok", transactions }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getTransactionSummary(
    duration: string,
  ): Promise<Types.GetTransactionSummaryResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `services/app/tenantDashboard/GetTransactionSummary`,
      {
        duration: duration,
      },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {         
      return { kind: "ok", data:  response.data.result }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getTenantAccounts(): Promise<Types.GetTenantAccountsResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `services/app/account/GetTenantAccountsAsync`,
      {},
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const userAccounts: AccountSnapshot[] = response.data.result.userAccounts.items
      const otherMembersAccounts = response.data.result.otherMembersAccounts.items

      return { kind: "ok", userAccounts, otherMembersAccounts }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
