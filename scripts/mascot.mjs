// npm run mascot: copies the mascot's stylesheet from duotyping-specs, where the mascot is defined
// once for every client (its specs/mascot.md). The copy is never edited here: its first line names
// the commit and the hash, and npm test fails if the rest no longer matches.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

const SPECS = process.env.DUOTYPING_SPECS ?? '../duotyping-specs'
const FROM = 'ui-design/mascot/mark/mark.css'
const TO = 'src/styles/mark.css'

const git = (...args) => execFileSync('git', ['-C', SPECS, ...args], { encoding: 'utf8' }).trim()
// Only a committed definition, so the commit named is the one copied.
if (git('status', '--porcelain', '--', FROM)) throw new Error(`${SPECS}/${FROM} has uncommitted changes`)
const css = readFileSync(`${SPECS}/${FROM}`, 'utf8')
const hash = createHash('sha256').update(css).digest('hex').slice(0, 16)
writeFileSync(TO, `/* Copied from duotyping-specs ${FROM} at ${git('log', '-1', '--format=%h', '--', FROM)}, sha256 ${hash}, by npm run mascot: never edit it here. */\n${css}`)
console.log(`${TO}: ${hash}`)
