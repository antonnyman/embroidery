import { Embroidery } from '../dist/embroidery'

import { clipboard } from './controllers/clipboard'
import { hello } from './controllers/hello'
import { slideshow } from './controllers/slideshow'
import { dynamic } from './controllers/dynamic'

const application = Embroidery.start()
application.register({ clipboard, hello, slideshow, dynamic })
