import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import React, { ObjectHTMLAttributes } from 'react'
import classes from "../../styles/styledMessage.module.css"

type StyledMessageComponentProps = {
  text: string,
  type: StyledMessageComponentTypes,
} & ObjectHTMLAttributes<HTMLDivElement>

const StyledMessage: React.FC<StyledMessageComponentProps> = ({ text, type, ...props }) => {

  return (
    <div className={classes[type]} {...props}>{text} </div>
  )
}

export default StyledMessage