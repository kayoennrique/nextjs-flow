import React from 'react';``
import styled from 'styled-components';
import NextLink from 'next/link';
import { theme } from './theme';
export { theme } from './theme';

const StyledBox = styled.div`
  ${parseCSS}
`;


export const Box = React.forwardRef(({ tag, ...props }, ref) => {
  return (
    <StyledBox ref={ref} as={tag} {...props} />
  )
});
Box.defaultProps = {
  styleSheet: {},
}

export function Link({ href, ...props }) {

  const finalProps = {
    ...props,
    styleSheet: {
      textDecoration: 'none',
      color: theme.colors.primary.x500,
      hover: {
        color: theme.colors.primary.x200,
      },
      ...props.styleSheet,
    }
  };

  if(href.startsWith('http')) {
    return <Box as={'a'} {...finalProps} />
  }
  
  return (
    <NextLink passHref href={href}>
      <Box as={'a'} {...finalProps} />
    </NextLink>
  )
}

export function Text({ tag, variant, styleSheet, ...props }) {
  const defaultTag = 'p';
  const typographyVariantStyles = theme.typography.variants?.[variant] || theme.typography.variants.body2;

  return (
    <Box {...{
      as: tag || defaultTag,
      styleSheet: {
        display: 'flex',
        ...typographyVariantStyles,
        ...styleSheet,
      },
      ...props,
    }} />
  );
}

export function Button({ href, size, colorVariant, ...props }) {
  // [Theme] ============================================================
  const buttonSizes = {
    xs: (theme) => ({
      textVariant: 'body4',
      paddingHorizontal: theme.space?.x2,
      paddingVertical: theme.space?.x2,
    }),
    sm: (theme) => ({
      textVariant: 'body3',
      paddingHorizontal: theme.space?.x4,
      paddingVertical: theme.space?.x3,
    }),
    md: (theme) => ({
      textVariant: 'body3',
      paddingHorizontal: theme.space?.x4,
      paddingVertical: theme.space?.x3,
    }),
    lg: (theme) => ({
      textVariant: 'body2',
      paddingHorizontal: theme.space?.x5,
      paddingVertical: theme.space?.x3,
    }),
    xl: (theme) => ({
      textVariant: 'body2',
      paddingHorizontal: theme.space?.x6,
      paddingVertical: theme.space?.x4,
    }),
  };
  const buttonStyles = {
    filled: ({
      mainColor,
      contrastColor,
      mainColorStrong,
    }) => ({
      backgroundColor: mainColor,
      borderColor: mainColor,
      color: contrastColor,
      hover: {
        backgroundColor: mainColorStrong,
      },
      focus: {
        backgroundColor: mainColorStrong,
      },
    }),
  };
  // ============================================================
  const hasLink = Boolean(href);
  const as = hasLink ? Link : 'button';
  const buttonSizeStyles = buttonSizes[size](theme);

  return (
    <Box
      as={as}
      {...{
        href,
        styleSheet: {
          display: 'inline-flex',
          textDecoration: 'none',
          borderRadius: theme.borderRadius.md,
          ...buttonSizeStyles,
          ...buttonStyles.filled({
            mainColor: theme.colors[colorVariant || 'primary'].x800,
            mainColorLight: theme.colors[colorVariant || 'primary'].x700,
            mainColorStrong: theme.colors[colorVariant || 'primary'].x900,
            contrastColor: theme.colors.neutral.x000,
          }),
          ...theme.typography.variants[buttonSizeStyles.textVariant],
          ...props.styleSheet,
        },
        ...props,
      }}
    />
  );
}
Button.defaultProps = {
  // TODO; Isos aqui

  textVariant: 'body2',
  size: 'md'
}

export function Image({ ...props }) {
  return (
    <Box as={'img'} {...{
      styleSheet: {
        maxWidth: '100%',
        ...props.styleSheet,
      },
      ...props
    }} />
  );
}



// ========================================================================================

function parseCSS({ styleSheet }) {
  const statesSet = new Set([
    'hover',
    'focus',
    'disabled',
  ]);

  function parseRule(styleKeyFormated, styleValue) {
    if(styleKeyFormated.includes('horizontal')) {
      return `
        ${styleKeyFormated.replace('horizontal', 'left')}: ${styleValue};
        ${styleKeyFormated.replace('horizontal', 'right')}: ${styleValue};
      `;
    }
    if(styleKeyFormated.includes('vertical')) {
      return `
        ${styleKeyFormated.replace('vertical', 'top')}: ${styleValue};
        ${styleKeyFormated.replace('vertical', 'bottom')}: ${styleValue};
      `;
    }
    return `${styleKeyFormated}: ${styleValue};`;
  }

  function parser(styleSheet) {
    return (acc, styleKey) => {
      const styleKeyFormated = styleKey.split(/(?=[A-Z])/).join('-').toLowerCase();
      const styleValue = styleSheet[styleKey];

      // [Handle States](:focus, :hover, :disabled )
      if (statesSet.has(styleKey)) {
        const stateValue = styleSheet[styleKey];
        if (!stateValue) return acc;
        return `
          ${acc}
          &:${styleKey},
          &[disabled] {
            ${styleKey === 'disabled' ? 'cursor: not-allowed;' : ''}
            ${Object.keys(stateValue).reduce(parser(stateValue), '')}
          }
        `;
      }

      // [Handle Responsivity]
      if (typeof styleValue === 'object') {
        const styleValueBreakpoints = Object.keys(styleValue);
        return `
          ${acc}
          ${styleValueBreakpoints.map((breakpointName) => {
          const themeBreakpoints = theme.breakpoints;
          const breakpointValue = themeBreakpoints[breakpointName];

          // const cssRule = `${styleKeyFormated}: ${styleValue[breakpointName]};`;
          const cssRule = parseRule(styleKeyFormated, styleValue[breakpointName]);

          if (breakpointValue === 0) return cssRule;

          return `
              @media (min-width: ${breakpointValue}px) {
                ${cssRule}
              }
            `;
        }).join('')}
          `;
      }
      return `
        ${acc}
        ${parseRule(styleKeyFormated, styleValue)}
      `;
    }
  }

  return Object.keys(styleSheet).reduce(parser(styleSheet), '');
}
