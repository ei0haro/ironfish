/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function fromString(graffiti: string): Buffer {
  const result = Buffer.alloc(32)
  result.write(graffiti)
  return result
}

function toHuman(graffiti: Buffer): string {
  return graffiti.toString('utf8').replace(/\0/g, '').trim()
}

export const GraffitiUtils = {
  fromString,
  toHuman,
}
