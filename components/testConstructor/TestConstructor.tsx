import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks';
import { ITest } from '@/ts/test';
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import QuestionsContainer from '@/components/testConstructor/Questions/QuestionsContainer';
import StyledButton from '@/components/ui/StyledButton';
import { useValidation } from '@/hooks/useValidation';
import NewQuestionTypeChooseMenu from '@/components/testConstructor/Questions/NewQuestionTypeChooseMenu';
import StyledPopupMessage from '@/components/ui/StyledPopupMessage';
import { editTestAction, postTestAction } from '@/store/userSlice';
import TestInformation from './TestInformation';
import { useRouter } from 'next/router';
import { resetTest } from '@/store/testSlice';

const TestConstructor: React.FC = () => {

  const dispatch = useAppDispatch()
  const test = useAppSelector(state => state.test)
  const { validateAllFields, areAllFieldsValid, unsubscribeAllRules } = useValidation()
  const router = useRouter();
  const firstURLSegment = router.asPath.split('/')[1];

  const handleSubmit = (test: ITest, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateAllFields()) {
      if (firstURLSegment === "editTest") {
        dispatch(editTestAction({ test }))
      }
      else {
        dispatch(postTestAction({ test }))
      }
      router.push("/myTests")
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetTest())
      unsubscribeAllRules()
    }
  }, [])

  return (
    <form onSubmit={(e) => handleSubmit(test, e)}>
      <TestInformation name={test.name} description={test.description} theoreticalPart={test.theoreticalPart} questionGenerationLoading={test.interfaceData.questionGenerationLoading} />
      <QuestionsContainer questions={test.questions} />
      <NewQuestionTypeChooseMenu />
      <StyledButton color='orange' disabled={!areAllFieldsValid() || test.interfaceData.questionGenerationLoading} type='submit' size='big'>Зберегти 💾</StyledButton>
      {test.interfaceData.questionGenerationLoading && <StyledPopupMessage type={StyledMessageComponentTypes.loading} />}
    </form >
  );
};

export default TestConstructor;
