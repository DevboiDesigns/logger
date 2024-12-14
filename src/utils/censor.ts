/**
 * * resolves issue with circular references in JSON.stringify
 * @param censor
 * @returns
 */
export const censor = (censor: any) => {
  var i = 0
  return function (key: any, value: any) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor == value
    )
      return "[Circular]"
    if (i >= 29)
      // seems to be a harded maximum of 30 serialized objects?
      return "[Unknown]"
    ++i // so we know we aren't using the original object anymore
    return value
  }
}
