const Breakpoints = {
  XLarge: {
    min: 1200,
    max: Infinity,
  },
  Large: {
    min: 992,
    max: 1199,
  },
  Medium: {
    min: 768,
    max: 991,
  },
  Small: {
    min: 0,
    max: 767,
  },
  Mobile: {
    min: 0,
    max: 464,
  },
  // For server side rendering
  DefaultValues: {
    width: 1200,
  },
};

export default Breakpoints;
