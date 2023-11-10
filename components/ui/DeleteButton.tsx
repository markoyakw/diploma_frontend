import classes from "../../styles/styledButton.module.css"
import { deleteSingleMultipleQuestion } from '@/store/testSlice'
import React, { ButtonHTMLAttributes } from 'react'

type DeleteButtonProps = {
    additionalClass?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const DeleteButton: React.FC<DeleteButtonProps> = ({ additionalClass, ...props }) => {

    return (
        <button {...props} className={classes.delete_button + " " + additionalClass}>
            &#215;
        </button>
    )
}

export default DeleteButton