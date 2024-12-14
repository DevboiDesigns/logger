import { log } from "../src/index"
import { errHandler } from "../src/index"

describe("log.error Tests", () => {
  log.child({ service: "Error Testing ***" }) // has no effect on the log output
  log.error("This is an info message")
  const error = new Error("Where did that `service` object property go?")
  const err = errHandler(error)
  log.error(err)

  //* 1. Test using the error handler
  log.error("Hello, Universe!")
  it("should log an error message using the error handler", () => {
    log.error = jest.fn()
    const error = new Error("Hello, Universe!")
    const err = errHandler(error)
    log.error(err)
    expect(log.error).toHaveBeenCalledWith(Error("Hello, Universe!"))
  })

  //* 2. Test using the error handler with optional parameters
  log.error("Hello, Universe 2!", { service: "Error Test 2" })
  it("should log an error message using the error handler with the optional parameters to pass in", () => {
    log.error = jest.fn()
    const error = new Error("Hello, Universe 2!")
    const err = errHandler(error)
    log.error({ error: err, service: "Error Test 2" })
    expect(log.error).toHaveBeenCalledWith({
      error: Error("Hello, Universe 2!"),
      service: "Error Test 2",
    })
  })

  //* 3. Test logging with optional parameters
  log.error("Hello, Universe 3!", { service: "Error Test 3" })
  it("should log an error message with the optional parameters to pass in", () => {
    log.error = jest.fn()
    log.error("Hello, Universe 3!", { service: "Error Test 3" })
    expect(log.error).toHaveBeenCalledWith("Hello, Universe 3!", {
      service: "Error Test 3",
    })
  })
})