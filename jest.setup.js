import '@testing-library/jest-dom'
import { fetch, Request, Response, Headers } from 'undici'
import { TextDecoder, TextEncoder } from 'util'

global.fetch = fetch
global.Request = Request
global.Response = Response
global.Headers = Headers
global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder
