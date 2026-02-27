import {textImageSection} from './sections/textImageSection'
import {header} from './documents/header'
import {footer} from './documents/footer'
import {homepage} from './documents/homepage'
import {page} from './documents/page'

import {navigationLink} from './objects/navigationLink'
import {navigationSubLink} from './objects/navigationSubLink'
import {socialLink} from './objects/socialLink'

import {heroSection} from './sections/heroSection'
import {textSection} from './sections/textSection'
import {imageSection} from './sections/imageSection'
import {ctaSection} from './sections/ctaSection'
import {splitHeroSection} from './sections/splitHeroSection'
import {blockContent} from './objects/blockContent'

export const schemaTypes = [
  header,
  footer,
  homepage,
  page,

  navigationLink,
  navigationSubLink,
  socialLink,

  heroSection,
  textSection,
  imageSection,
  ctaSection,
  splitHeroSection,
  textImageSection,

  blockContent,
]
