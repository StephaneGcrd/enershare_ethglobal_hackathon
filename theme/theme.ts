import { extendTheme } from '@chakra-ui/react';

const colors = {
  lightGreen: '#cddfa0',
  darkGreen: '#00272b',
  darkGreenHover: '#004949',
  centralGrey: '#b9c0da',
  electricYellow: '#ffe180',
};

const textStyles = {
  h1: {
    // you can also use responsive styles
    fontSize: [28, 28, 40],
    fontWeight: [700],
    color: 'darkGreen',
    lineHeight: [10],
  },
  h2: {
    fontSize: [16],
    fontWeight: [700],
    color: 'darkGreen',
  },
  h3: {
    fontSize: [20, 24],
    fontWeight: [800],
    color: 'darkGreen',
    lineHeight: [10],
  },
  h4: {
    fontSize: [18, 20, 20],
    fontWeight: [800],
    color: 'darkGreen',
    lineHeight: [6],
  },
  p: {
    fontSize: [18, 20],
    fontWeight: [500],
  },
  small: {
    fontSize: [14],
    fontWeight: [500],
  },
  logo: {
    fontSize: [16, 20, 24],
    fontWeight: [800],
  },
};

const styles = {
  global: {
    'html,body': {
      bg: 'white',
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      bg: 'darkGreen',
      color: 'white',
      borderRadius: 20,
    },
    variants: {
      // Make a variant, we'll call it `base` here and leave it empty
      base: {},
      primary: {
        bg: 'darkGreen',
        color: 'white',
        borderRadius: 20,
        _hover: {
          bg: 'darkGreenHover',
        },
      },
      secondary: {
        //...define other variants
        bg: 'transparent',
        color: 'darkGreen',
      },
      outlined: {
        bg: 'transparent',
        color: 'darkGreen',
        border: '2px solid',
        borderRadius: 20,
        _hover: {
          bg: 'rgba(0,0,0,0.1)',
        },
      },
    },
    defaultProps: {
      // Then here we set the base variant as the default
      variant: 'base',
    },
  },
};
export const theme = extendTheme({ colors, textStyles, styles, components });
