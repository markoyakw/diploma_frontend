import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import StyledInput from '../ui/StyledInput';
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import StyledButton from '../ui/StyledButton';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks';
import StyledPopupMessage from '../ui/StyledPopupMessage';
import { registrationAction } from '@/store/userSlice';
import { IRegistrationRequest } from '@/ts/request/AuthRequest';
import classes from "../../styles/auth.module.css"

const RegistrationForm: React.FC = () => {

    const [firstSubmissionHappened, setFirstSubmissionHappened] = useState(false);
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const initialValues = {
        username: "",
        login: "",
        password: "",
        repeatedPassword: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Заповніть поле"')
            .min(4, 'Мінімальна довжина поля - 4 символи')
            .max(15, 'Максимальна довжина поля - 30 символів'),
        login: Yup.string()
            .required('Заповніть поле "логін"')
            .min(4, 'Мінімальна довжина поля - 4 символи')
            .max(15, 'Максимальна довжина поля - 15 символів'),
        password: Yup.string()
            .required('Заповніть поле "пароль"')
            .min(4, 'Мінімальна довжина поля - 8 символи')
            .max(30, 'Максимальна довжина поля - 30 символів'),
        repeatedPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Паролі повинні співпадати')
            .required('Будь ласка повторіть пароль'),
    });

    const handleSubmit = ({ username, login, password }: IRegistrationRequest) => {
        dispatch(registrationAction({ username, login, password }))
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => {
                    const { values, errors, handleChange, handleBlur } = formikProps;
                    console.log(errors)
                    return (
                        <Form>
                            <div className={classes.input}>
                                <Field
                                    id="username"
                                    component={StyledInput}
                                    label="Ім'я та фамілія"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    messageText={(formikProps.touched.username || firstSubmissionHappened) && errors.username}
                                    messageType={StyledMessageComponentTypes.error}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    id="login"
                                    component={StyledInput}
                                    label="Логін"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    messageText={(formikProps.touched.login || firstSubmissionHappened) && errors.login}
                                    messageType={StyledMessageComponentTypes.error}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    type="password"
                                    id="password"
                                    component={StyledInput}
                                    label="Пароль"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    messageText={(formikProps.touched.password || firstSubmissionHappened) && errors.password}
                                    messageType={StyledMessageComponentTypes.error}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    type="password"
                                    id="repeatedPassword"
                                    component={StyledInput}
                                    label="Повторіть пароль"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    messageText={(formikProps.touched.repeatedPassword || firstSubmissionHappened) && errors.repeatedPassword}
                                    messageType={StyledMessageComponentTypes.error}
                                />
                            </div>

                            <br />

                            <StyledButton color="orange" type="submit" onClick={() => setFirstSubmissionHappened(true)} disabled={firstSubmissionHappened && !formikProps.isValid}>
                                Зареєструватись
                            </StyledButton>
                        </Form>
                    );
                }}
            </Formik>

            {user.interfaceData.error && <StyledPopupMessage disappearTime={3000}
                text={user.interfaceData.error} type={StyledMessageComponentTypes.error} />}
        </div>
    );
};

export default RegistrationForm;