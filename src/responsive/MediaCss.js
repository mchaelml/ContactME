import { css } from 'styled-components';

import Breakpoints from './Breakpoints';

const Media = {
  Mobile: {
    max: (...args) => css`
      @media (max-width: ${Breakpoints.Mobile.max}px) {
        ${css(...args)}
      }
    `,
    min: (...args) => css`
      @media (min-width: ${Breakpoints.Mobile.min}px) {
        ${css(...args)}
      }
    `,
  },
  Small: {
    max: (...args) => css`
      @media (max-width: ${Breakpoints.Small.max}px) {
        ${css(...args)}
      }
    `,
    min: (...args) => css`
      @media (min-width: ${Breakpoints.Small.min}px) {
        ${css(...args)}
      }
    `,
  },
  Medium: {
    max: (...args) => css`
      @media (max-width: ${Breakpoints.Medium.max}px) {
        ${css(...args)}
      }
    `,
    min: (...args) => css`
      @media (min-width: ${Breakpoints.Medium.min}px) {
        ${css(...args)}
      }
    `,
  },
  Large: {
    max: (...args) => css`
      @media (max-width: ${Breakpoints.Large.max}px) {
        ${css(...args)}
      }
    `,
    min: (...args) => css`
      @media (min-width: ${Breakpoints.Large.min}px) {
        ${css(...args)}
      }
    `,
  },
  Xlarge: {
    max: (...args) => css`
      @media (max-width: ${Breakpoints.XLarge.max}px) {
        ${css(...args)}
      }
    `,
    min: (...args) => css`
      @media (min-width: ${Breakpoints.XLarge.min}px) {
        ${css(...args)}
      }
    `,
  },
};

export default Media;
