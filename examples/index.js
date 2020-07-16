import { Embroidery } from '../dist/embroidery'
import Turbolinks from 'turbolinks'

import { clipboard } from './controllers/clipboard_controller'
import { hello } from './controllers/hello_controller'
import { slideshow } from './controllers/slideshow_controller'

Turbolinks.start()

const application = Embroidery.start()
application.register({ clipboard })
application.register({ hello })
application.register({ slideshow })
