import { PlaidError } from "plaid"

export const errHandler = (value: any): Error => {
  // PLAID ERROR type
  const plaidError = value?.response?.data as PlaidError
  if (
    typeof plaidError === "object" &&
    plaidError !== null &&
    "error_code" in plaidError &&
    "error_message" in plaidError
  ) {
    const error = new Error(
      ` *** PlaidError: ${plaidError.error_code} - ${plaidError.error_message} *** `
    )
    return error
  }

  // Error type
  if (value instanceof Error) return value
  let stringified = "[Unable to stringify the thrown value]"
  try {
    stringified = JSON.stringify(value)
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  )
  return error
}
