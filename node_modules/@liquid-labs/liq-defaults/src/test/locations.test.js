/* global describe expect test */
import * as fsPath from 'node:path'

import * as locations from '../locations'

describe('LIQ_HOME', () => {
  test("defaults to '.liq' in users home dir", () =>
    expect(locations.LIQ_HOME()).toBe(fsPath.join(process.env.HOME, '.liq')))

  test('can be overridden by setting environment var LIQ_HOME', () => {
    const newHome = fsPath.sep + 'foo'
    process.env.LIQ_HOME = newHome
    try {
      expect(locations.LIQ_HOME()).toBe(newHome)
    }
    finally {
      delete process.env.LIQ_HOME
    }
  })
})

describe('LIQ_PLAYGROUND', () => {
  test("defaults to '<LIQ_HOME>/playground' in users home dir", () =>
    expect(locations.LIQ_PLAYGROUND()).toBe(fsPath.join(locations.LIQ_HOME(), 'playground')))

  test('can be overridden by setting environment var LIQ_PLAYGROUND', () => {
    const newPlayground = fsPath.sep + 'foo'
    process.env.LIQ_PLAYGROUND = newPlayground
    try {
      expect(locations.LIQ_PLAYGROUND()).toBe(newPlayground)
    }
    finally {
      delete process.env.LIQ_PLAYGROUND
    }
  })
})

describe('LIQ_WORKING_DIR_ROOT', () => {
  test("defaults to '<LIQ_HOME>/tmp' in users home dir", () =>
    expect(locations.LIQ_WORKING_DIR_ROOT()).toBe(fsPath.join(locations.LIQ_HOME(), 'tmp')))

  test('can be overridden by setting environment var LIQ_PLAYGROUND', () => {
    const newWorkingDir = fsPath.sep + 'foo'
    process.env.LIQ_WORKING_DIR_ROOT = newWorkingDir
    try {
      expect(locations.LIQ_WORKING_DIR_ROOT()).toBe(newWorkingDir)
    }
    finally {
      delete process.env.LIQ_WORKING_DIR_ROOT
    }
  })
})
