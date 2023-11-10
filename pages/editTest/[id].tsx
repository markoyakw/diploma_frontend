import TestConstructor from '@/components/testConstructor/TestConstructor'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks';
import { setTest } from '@/store/testSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const EditTest: React.FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter();
    const { id } = router.query;
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        const editingTest = user.tests.find(test => String(test._id) === String(id))
        if (editingTest) {
            dispatch(setTest(editingTest))
        }
    }, [])

    return (
        <TestConstructor />
    )
}

export default EditTest