import { GeneralApiProblem } from "./api-problem"
import { TransactionSnapshot } from "../../models/transaction/transaction"
import { AccountSnapshot } from "../../models/account/account"

export interface Repo {
  id: number
  name: string
  owner: string
}

export interface Credentials {
  tenancyName: string
  usernameOrEmailAddress: string
  password: string
}

export interface GetTransactionsInput {
  type: string
  accountId: string
  startDate: string
  endDate: string
}

export interface TransactionComment {
  id: string
  content: string
  creationTime: string
  creatorUserId: string
  creatorUserName: string
}

export type GetRepoResult = { kind: "ok"; repo: Repo } | GeneralApiProblem

export type AuthenticateResult =
  | {
      kind: "ok"
      token: string
    }
  | GeneralApiProblem

export type GetTransactionsResult =
  | { kind: "ok"; transactions: TransactionSnapshot[] }
  | GeneralApiProblem

export type GetTenantAccountsResult =
  | {
      kind: "ok"
      userAccounts: AccountSnapshot[]
      otherMembersAccounts: AccountSnapshot[]
    }
  | GeneralApiProblem

export type GetTransactionSummaryResult =
  | {
      kind: "ok"
      data: any
    }
  | GeneralApiProblem

export type getTransactionCommentsResult =
  | {
      kind: "ok"
      comments: TransactionComment[]
    }
  | GeneralApiProblem

export type SaveTransactionCommentResult =
  | {
      kind: "ok"
    }
  | GeneralApiProblem
