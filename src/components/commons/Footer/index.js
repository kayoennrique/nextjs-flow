import { Box, Text, theme } from '../../../theme/components';

export function Footer({ description }) {
  return (
    <Box
      tag="footer"
      styleSheet={{
        backgroundColor: theme.colors.neutral.x800,
      }}
    >
      <Box
        styleSheet={{
          overflow: "hidden",
          maxWidth: theme.space.xcontainer_xl,
          marginLeft: "auto",
          marginRight: "auto",
          paddingVertical: theme.space.x8,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Text
          styleSheet={{
            justifyContent: 'center',
            color: theme.colors.neutral.x000
          }}
        >
          &copy; {new Date().getFullYear()} {description}
        </Text>
      </Box>
    </Box>
  )
}
