import { log } from "../src/index"
import { errHandler } from "../src/index"

describe("log.info Tests", () => {
  log.child({ service: "Info Testing ***" }) // has no effect on the log output
  log.info("This is an info message")
  const error = new Error("Where did that `service` object property go?")
  const err = errHandler(error)
  log.info(err)

  //* 1. Test using the error handler
  log.info("Hello, Universe!")
  it("should log an info message using the error handler", () => {
    log.info = jest.fn()
    const error = new Error("Hello, Universe!")
    const err = errHandler(error)
    log.info(err)
    expect(log.info).toHaveBeenCalledWith(Error("Hello, Universe!"))
  })

  //* 2. Test using the error handler with optional parameters
  log.info("Hello, Universe 2!", { service: "Info Test 2" })
  it("should log an info message using the error handler with the optional parameters to pass in", () => {
    log.info = jest.fn()
    const error = new Error("Hello, Universe 2!")
    const err = errHandler(error)
    log.info({ error: err, service: "Info Test 2" })
    expect(log.info).toHaveBeenCalledWith({
      error: Error("Hello, Universe 2!"),
      service: "Info Test 2",
    })
  })

  //* 3. Test logging with optional parameters
  log.info("Hello, Universe 3!", { service: "Info Test 3" })
  it("should log an info message with the optional parameters to pass in", () => {
    log.info = jest.fn()
    log.info("Hello, Universe 3!", { service: "Info Test 3" })
    expect(log.info).toHaveBeenCalledWith("Hello, Universe 3!", {
      service: "Info Test 3",
    })
  })
})
