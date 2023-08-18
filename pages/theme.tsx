import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints} from '@chakra-ui/theme-tools'
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })
const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})
export default theme


