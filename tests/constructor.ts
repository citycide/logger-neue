import test from "ava"
import { createLogger, LoggerNeue } from "../src"

test("creates a new instance", t => {
  const log = new LoggerNeue()
  t.true(log != null)
  t.is(typeof log.log, "function")
})

test("constructor throws if `options` is not an object", t => {
  t.notThrows(() => new LoggerNeue())
  t.notThrows(() => new LoggerNeue({}))
  t.notThrows(() => createLogger())
  t.notThrows(() => createLogger({}))

  // @ts-expect-error
  t.throws(() => new LoggerNeue("failure"))

  // @ts-expect-error
  t.throws(() => createLogger("failure"))
})

test("`options.levels.style` throws on invalid styles", t => {
  t.throws(() =>
    createLogger({
      levels: {
        // @ts-expect-error
        YELL: [0, "loud"]
      }
    })
  )
})

test("`options.levels` overrides default levels", t => {
  const log = createLogger({
    levels: {
      lone: [0, "cyan"]
    }
  })

  t.deepEqual(log.getLevelNames(), ["lone"])
})

test("`options.levels` allows both array & object definitions", t => {
  const log = createLogger({
    levels: {
      first: [0, "cyan"],
      second: {
        level: 1,
        colors: ["red", "bold", "underline"]
      }
    }
  })

  t.deepEqual(log.getLevelNames(), ["first", "second"])
})
