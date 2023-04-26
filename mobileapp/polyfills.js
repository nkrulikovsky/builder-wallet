import { decode, encode } from 'base-64'
import '@ethersproject/shims'

if (typeof BigInt === 'undefined') {
    global.BigInt = require('big-integer')
}

if (typeof Buffer === 'undefined') {
    global.Buffer = require('buffer').Buffer
}

global.btoa = global.btoa || encode
global.atob = global.atob || decode

process.version = 'v9.40'
process.browser = false

// eslint-disable-next-line no-undef
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env.NODE_ENV = isDev ? 'development' : 'production'
