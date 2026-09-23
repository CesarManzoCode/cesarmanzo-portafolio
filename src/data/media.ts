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
import studymationPipeline from '../assets/work/studymation-pipeline.svg';
import indiceCycle from '../assets/work/indice-cycle.svg';
import acreditaAreas from '../assets/work/acredita-areas.webp';
import acreditaSimulation from '../assets/work/acredita-simulation.webp';
import riceSignal from '../assets/work/rice-signal.webp';

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
  'studymation-pipeline': studymationPipeline,
  'indice-cycle': indiceCycle,
  'acredita-areas': acreditaAreas,
  'acredita-simulation': acreditaSimulation,
  'rice-signal': riceSignal,
};

/** Intrinsic sizes, so every capture reserves its box before it loads. */
export const MEDIA_SIZE: Record<MediaKey, [number, number]> = {
  'thalyx-authorisation': [758, 406],
  'thalyx-architecture': [920, 560],
  'thalyx-atomic': [633, 563],
  'orux-flow': [920, 430],
  'orux-tentative': [1600, 1003],
  'orux-impact': [1600, 1003],
  'orux-review': [1600, 1003],
  'ferrol-home': [1440, 820],
  'ferrol-category': [1440, 900],
  'ferrol-mobile': [390, 844],
  'indice-lesson': [1805, 1731],
  'indice-challenge': [1805, 1525],
  'acredita-today': [2200, 1488],
  'acredita-lesson': [1440, 1100],
  'acredita-item': [1440, 1660],
  'studymation-brief': [2200, 1803],
  'studymation-run': [1550, 1420],
  'studymation-document': [2200, 714],
  'studymation-pipeline': [1280, 470],
  'indice-cycle': [1240, 486],
  'acredita-areas': [1800, 1376],
  'acredita-simulation': [1800, 883],
  'rice-signal': [1600, 900],
};
