import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { BetPosition } from 'state/types'
import { MultiplierDown, MultiplierUp } from '../../icons/MultiplierIcon'
import EnteredTag from './EnteredTag'

interface MultiplierArrowProps {
  multiplier?: number
  hasEntered?: boolean
  betPosition?: BetPosition
  isDisabled?: boolean
  isActive?: boolean
}

const ArrowWrapper = styled.div`
  height: 65px;
  margin: 0 auto;
  width: 240px;
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`

const EnteredTagWrapper = styled.div`
  position: absolute;
  z-index: 10;
`

const getTextColor = (fallback = 'textSubtle') => (isActive: boolean, isDisabled: boolean) => {
  if (isDisabled) {
    return 'textDisabled'
  }

  if (isActive) {
    return 'white'
  }

  return fallback
}

const MultiplierArrow: React.FC<MultiplierArrowProps> = ({
  multiplier,
  hasEntered = false,
  betPosition = BetPosition.BULL,
  isDisabled = false,
  isActive = false,
}) => {
  const TranslateString = useI18n()
  const upColor = getTextColor('success')(isActive, isDisabled)
  const downColor = getTextColor('failure')(isActive, isDisabled)
  const textColor = getTextColor()(isActive, isDisabled)
  const multiplierText = (
    <Flex>
      <Text color={textColor} bold lineHeight="21px">
        {multiplier !== undefined ? `${multiplier}x` : '-'}
      </Text>
      <Text color={textColor} lineHeight="21px" ml="4px">
        {TranslateString(999, 'Payout')}
      </Text>
    </Flex>
  )

  if (betPosition === BetPosition.BEAR) {
    return (
      <Box position="relative">
        <ArrowWrapper>
          <MultiplierDown isActive={isActive} />
          {hasEntered && (
            <EnteredTagWrapper style={{ right: 0, bottom: 0 }}>
              <EnteredTag />
            </EnteredTagWrapper>
          )}
          <Content>
            {multiplierText}
            <Text bold fontSize="24px" lineHeight="26px" mb="8px" color={downColor} textTransform="uppercase">
              {TranslateString(999, 'Down')}
            </Text>
          </Content>
        </ArrowWrapper>
      </Box>
    )
  }

  return (
    <Box position="relative">
      <ArrowWrapper>
        <MultiplierUp isActive={isActive} />
        {hasEntered && (
          <EnteredTagWrapper style={{ left: 0, top: 0 }}>
            <EnteredTag />
          </EnteredTagWrapper>
        )}
        <Content>
          <Text bold fontSize="24px" lineHeight="26px" color={upColor} textTransform="uppercase">
            {TranslateString(999, 'Up')}
          </Text>
          {multiplierText}
        </Content>
      </ArrowWrapper>
    </Box>
  )
}

export default MultiplierArrow