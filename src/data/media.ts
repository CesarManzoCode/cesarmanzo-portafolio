/* Resolves media keys to bundled assets. Every file here is a real capture
   or diagram from the project it illustrates — see README.md. */
import type { MediaKey } from './projects';

import thalyxAuthorisation from '../assets/work/thalyx-authorisation.svg';
import thalyxArchitecture from '../assets/work/thalyx-architecture.svg';
import thalyxAtomic from '../assets/work/thalyx-atomic-commit.svg';
import oruxFlow from '../assets/work/orux-flow.svg';
import oruxTentative from '../assets/work/orux-tentative.webp';
import oruxImpact from '../assets/work/orux-impact.webp';
import oruxReview from '../assets/work/orux-review.webp';
import ferrolHome from '../assets/work/ferrol-home.webp';
import ferrolCategory from '../assets/work/ferrol-category.webp';
import ferrolMobile from '../assets/work/ferrol-mobile.webp';
import indiceLesson from '../assets/work/indice-cero-lesson.webp';
import indiceChallenge from '../assets/work/indice-cero-challenge.webp';
import acreditaToday from '../assets/work/acredita-today.webp';
import acreditaLesson from '../assets/work/acredita-lesson.webp';
import acreditaItem from '../assets/work/acredita-item.webp';
import studymationBrief from '../assets/work/studymation-brief.webp';
import studymationRun from '../assets/work/studymation-run.webp';
import studymationDocument from '../assets/work/studymation-document.webp';

export const MEDIA: Record<MediaKey, string> = {
  'thalyx-authorisation': thalyxAuthorisation,
  'thalyx-architecture': thalyxArchitecture,
  'thalyx-atomic': thalyxAtomic,
  'orux-flow': oruxFlow,
  'orux-tentative': oruxTentative,
  'orux-impact': oruxImpact,
  'orux-review': oruxReview,
  'ferrol-home': ferrolHome,
  'ferrol-category': ferrolCategory,
  'ferrol-mobile': ferrolMobile,
  'indice-lesson': indiceLesson,
  'indice-challenge': indiceChallenge,
  'acredita-today': acreditaToday,
  'acredita-lesson': acreditaLesson,
  'acredita-item': acreditaItem,
  'studymation-brief': studymationBrief,
  'studymation-run': studymationRun,
  'studymation-document': studymationDocument,
};
