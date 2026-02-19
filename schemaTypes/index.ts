import { header } from './documents/header'
import { footer } from './documents/footer'
import { homepage } from './documents/homepage'
import { page } from './documents/page'

import { navigationLink } from './objects/navigationLink'

import { heroSection } from './objects/sections/heroSection'
import { textSection } from './objects/sections/textSection'
import { imageSection } from './objects/sections/imageSection'
import { ctaSection } from './objects/sections/ctaSection'
import { splitHeroSection } from './objects/sections/splitHeroSection'

export const schemaTypes = [
  header,
  footer,
  homepage,
  page,

  navigationLink,

  heroSection,
  textSection,
  imageSection,
  ctaSection,
  splitHeroSection,
]
