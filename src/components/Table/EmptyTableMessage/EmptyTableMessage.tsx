import { Flex, Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

export const EmptyTableMessage = ({ children }: PropsWithChildren) => (
  <Flex my="9" justify="center" align="center">
    <Text size="8" weight="light" color="gray">
      {children}
    </Text>
  </Flex>
)
