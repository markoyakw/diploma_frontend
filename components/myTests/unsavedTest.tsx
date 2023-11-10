import React from 'react'
import StyledDropDown from '../ui/StyledDropDown'
import { ITest } from '@/ts/test';
import { useAppDispatch } from '@/hooks/reduxTypedHooks';
import StyledButton from '../ui/StyledButton';
import MyTestButton from './MyTestButton';
import { setTest } from '@/store/testSlice';
import { useNewTestBackup } from '@/hooks/useNewTestBackup';
import { useRouter } from 'next/router';

const UnsavedTest: React.FC<{ test: ITest }> = ({ test }) => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const { deleteTest } = useNewTestBackup()

    const handleTestDeleting = (id: number) => {
        deleteTest(id)
    }
    const editTest = (test: ITest) => {
        dispatch(setTest(test))
        router.push(`/newTest`);
    }

    return (
        <>
            <StyledDropDown big buttonText={<MyTestButton test={test} />}>
                <StyledButton symbol='trash' onClick={() => handleTestDeleting(test._id)}>
                    Видалити
                </StyledButton>
                <StyledButton onClick={() => editTest(test)} symbol="edit">
                    Редагувати
                </StyledButton>
            </StyledDropDown>
        </>

    )
}

export default UnsavedTest