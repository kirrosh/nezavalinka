import React from "react"
import icons from "assets/icons"
import styled, { css } from "styled-components/macro"

type ISize = "xs" | "md" | "lg"
type IState = "primary" | "secondary" | "danger" | "info" | "success"

export type IIconElementProps = {
  size?: ISize
  // state?: IState
  name: keyof typeof icons
  onClick?: (event: React.MouseEvent) => void
}
const styles = {
  lg: css`
    width: 32px;
    height: 32px;
  `,
  md: css`
    width: 16px;
    height: 16px;
  `,
  xs: css`
    width: 8px;
    height: 8px;
  `,
}

const StyledIcon = styled.div<{ size: ISize }>`
  ${({ size }) => styles[size]}
  & > path {
    fill: currentColor;
  }
`

const IconElement = ({ name, size = "lg", onClick }: IIconElementProps) => {
  const Icon = icons[name]
  return <StyledIcon size={size} as={Icon} onClick={onClick} />
}

export default IconElement
