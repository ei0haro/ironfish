/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import type { Side } from '../merkletree/merkletree'
import { Identity, PrivateIdentity } from '../network'

/**
 * Request and response message types used for communication
 * between the worker pool and workers.
 */

export type CreateMinersFeeRequest = {
  type: 'createMinersFee'
  spendKey: string
  amount: bigint
  memo: string
}

export type CreateMinersFeeResponse = {
  type: 'createMinersFee'
  serializedTransactionPosted: Uint8Array
}

export type CreateTransactionRequest = {
  type: 'createTransaction'
  spendKey: string
  transactionFee: bigint
  spends: {
    note: Buffer
    treeSize: number
    rootHash: Buffer
    authPath: {
      side: Side
      hashOfSibling: Buffer
    }[]
  }[]
  receives: { publicAddress: string; amount: bigint; memo: string }[]
}

export type CreateTransactionResponse = {
  type: 'createTransaction'
  serializedTransactionPosted: Uint8Array
}

export type TransactionFeeRequest = {
  type: 'transactionFee'
  serializedTransactionPosted: Buffer
}

export type TransactionFeeResponse = {
  type: 'transactionFee'
  transactionFee: bigint
}

export type VerifyTransactionRequest = {
  type: 'verify'
  serializedTransactionPosted: Buffer
}

export type VerifyTransactionResponse = {
  type: 'verify'
  verified: boolean
}

export type BoxMessageRequest = {
  type: 'boxMessage'
  message: string
  sender: PrivateIdentity
  recipient: Identity
}

export type BoxMessageResponse = {
  type: 'boxMessage'
  nonce: string
  boxedMessage: string
}

export type UnboxMessageRequest = {
  type: 'unboxMessage'
  boxedMessage: string
  nonce: string
  sender: Identity
  recipient: PrivateIdentity
}

export type UnboxMessageResponse = {
  type: 'unboxMessage'
  message: string | null
}

export type MineHeaderRequest = {
  type: 'mineHeader'
  batchSize: number
  headerBytesWithoutRandomness: Uint8Array
  initialRandomness: number
  miningRequestId: number
  targetValue: string
}

export type MineHeaderResponse = {
  type: 'mineHeader'
  initialRandomness: number
  miningRequestId?: number
  randomness?: number
}

export type OmitRequestId<T> = Omit<T, 'requestId'>

export type WorkerRequestMessage = {
  requestId: number
  body: WorkerRequest
}

export type WorkerResponseMessage = {
  requestId: number
  body: WorkerResponse
}

export type WorkerRequest =
  | CreateMinersFeeRequest
  | CreateTransactionRequest
  | TransactionFeeRequest
  | VerifyTransactionRequest
  | BoxMessageRequest
  | UnboxMessageRequest
  | MineHeaderRequest

export type WorkerResponse =
  | CreateMinersFeeResponse
  | CreateTransactionResponse
  | TransactionFeeResponse
  | VerifyTransactionResponse
  | BoxMessageResponse
  | UnboxMessageResponse
  | MineHeaderResponse
