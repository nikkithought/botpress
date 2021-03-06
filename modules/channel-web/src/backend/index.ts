import 'bluebird-global'
import * as sdk from 'botpress/sdk'

import api from './api'
import WebchatDatabase from './db'
import socket from './socket'

const onServerStarted = async (bp: typeof sdk) => {
  const db = new WebchatDatabase(bp)
  await db.initialize()

  await api(bp, db)
  await socket(bp, db)
}

const onServerReady = async (bp: typeof sdk) => {}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  definition: {
    name: 'channel-web',
    menuIcon: 'chrome_reader_mode',
    fullName: 'Web Chat',
    homepage: 'https://botpress.io',
    noInterface: true,
    plugins: [{ entry: 'WebBotpressUIInjection', position: 'overlay' }]
  }
}

export default entryPoint
