import {header} from './documents/header'
import {footer} from './documents/footer'
import {homepage} from './documents/homepage'
import {contactForm} from './documents/contactForm'
import {page} from './documents/page'
import {bookingSettings} from './documents/bookingSettings'

import {navigationLink} from './objects/navigationLink'
import {navigationSubLink} from './objects/navigationSubLink'
import {socialLink} from './objects/socialLink'
import {photoItem} from './objects/photoItem'
import {testimonialCard} from './objects/testimonialCard'
import {videoItem} from './objects/videoItem'

import {heroSection} from './sections/heroSection'
import {textSection} from './sections/textSection'
import {mediaTextSection} from './sections/mediaTextSection'
import {imageSection} from './sections/imageSection'
import {ctaSection} from './sections/ctaSection'
import {splitHeroSection} from './sections/splitHeroSection'
import {mediaRowSection} from './sections/mediaRowSection'
import {videoShowcaseSection} from './sections/videoShowcaseSection'
import {testimonialSection} from './sections/testimonialSection'
import {blockContent} from './objects/blockContent'
import {photoMosaicSection} from './sections/photoMosaicSection'

export const schemaTypes = [
  header,
  footer,
  homepage,
  contactForm,
  page,
  bookingSettings,

  navigationLink,
  navigationSubLink,
  socialLink,
  photoItem,
  videoItem,
  testimonialCard,

  heroSection,
  textSection,
  mediaTextSection,
  // TODO check if needed
  imageSection,
  ctaSection,
  splitHeroSection,
  mediaRowSection,
  videoShowcaseSection,
  testimonialSection,
  photoMosaicSection,

  blockContent,
]
