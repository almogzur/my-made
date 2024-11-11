function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { LuX } from 'react-icons/lu'

export const CloseButton = forwardRef(function CloseButton(props, ref) {
          const porpsVariant = props.variant
  return (
    <ChakraIconButton variant={porpsVariant??'ghost'} aria-label='Close' ref={ref} {...props}>
      {_nullishCoalesce(props.children, () => (
        <LuX />
      ))}
    </ChakraIconButton>
  )
})
