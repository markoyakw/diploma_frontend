import { ITest } from "@/ts/test"
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface NewTestBackupContextValue {
    unsavedTests: Array<ITest> | null;
    addBackup: (test: ITest) => void;
    deleteTest: (deletingId: number) => void;
}

interface NewTestBackupContextProps {
    children: ReactNode;
}

const NewTestBackupContext = createContext<NewTestBackupContextValue | undefined>(undefined);

export const NewTestBackupProvider: React.FC<NewTestBackupContextProps> = ({ children }) => {
    const [unsavedTests, setUnsavedTests] = useState<Array<ITest> | null>(null);

    useEffect(() => {
        let unsavedTestsJson = localStorage.getItem("unsavedTests")
        //Якщо немає автоматично збережених тестів, створити в localhost.unsavedTests пустий масив
        if (!unsavedTestsJson) {
            const emptyJsonArr = JSON.stringify([])
            localStorage.setItem("unsavedTests", emptyJsonArr)
            unsavedTestsJson = emptyJsonArr
        }
        //парсинг автоматично збережених тестів з JSON в JS об'єкт
        setUnsavedTests(JSON.parse(unsavedTestsJson))
    }, [])

    const addBackup = (test: ITest) => {
        //Якщо немає автоматично збереженого теста з цим ID, зберегти новий та видалити найстаріший якщо вже є більше 3х
        let newUnsavedTests
        if (!unsavedTests) return
        const unsavedTestWithSameId = unsavedTests.some(unsavedTest => unsavedTest._id === test._id)

        if (!unsavedTestWithSameId) {
            if (!test.interfaceData.fieldsWereEdited) return
            setUnsavedTests(oldTests => {
                if (oldTests) {

                    const shiftOldTests = (oldTests: ITest[]): ITest[] => {
                        const shiftedOldTests = oldTests
                        if (oldTests.length >= 3) {
                            shiftedOldTests.shift()
                        }
                        return shiftedOldTests
                    }
                    
                    newUnsavedTests = [...shiftOldTests(oldTests), test]
                    return [...oldTests, test]
                }
                else return oldTests
            })
        }
        //Якщо є тест з цим ID в localhost, змінити його на об'єкт test з стейт менеджера
        else {
            newUnsavedTests = unsavedTests.map(unsavedTest => {
                if (unsavedTest._id === test._id) return test
                else return unsavedTest
            })
            setUnsavedTests(newUnsavedTests)
        }

        localStorage.setItem('unsavedTests', JSON.stringify(newUnsavedTests))
    }

    const deleteTest = (deletingId: number) => {
        if (!unsavedTests) return
        const newUnsavedTests = unsavedTests.filter(test => {
            if (test._id === deletingId) return false
            else return true
        })
        setUnsavedTests(newUnsavedTests)
        localStorage.setItem('unsavedTests', JSON.stringify(newUnsavedTests))
    }

    const contextValue: NewTestBackupContextValue = {
        unsavedTests, addBackup, deleteTest
    };


    return (
        <NewTestBackupContext.Provider value={contextValue}>
            {children}
        </NewTestBackupContext.Provider>
    );
};


export const useNewTestBackup = (): NewTestBackupContextValue => {
    const context = useContext(NewTestBackupContext);
    if (context === undefined) {
        throw new Error("useNewTestBackup повинен бути використаний в середені NewTestBackupProvider компоненту");
    }
    return context;
};