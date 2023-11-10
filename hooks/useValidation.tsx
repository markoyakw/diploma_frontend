import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Rule =
  { type: "minLength", value: number, message: string } |
  { type: "required", value: boolean, message: string } |
  { type: "maxLength", value: number, message: string }

interface ValidationContextType {
  addRules: (field: string, value: any, rule: Rule[]) => void;
  validateField: (field: string, value: any) => void;
  validateAllFields: () => boolean;
  validationErrors: { [field: string]: IvalidationError };
  unsubscribeRule: (field: string) => void;
  areAllFieldsValid: () => boolean,
  unsubscribeAllRules: () => void
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

interface ValidationProviderProps {
  children: ReactNode;
}

type IvalidationError = string | undefined;

export const ValidationProvider: React.FC<ValidationProviderProps> = ({ children }) => {
  const [valueByField, setValueByField] = useState<{ [field: string]: any }>({});
  const [rulesByField, setRulesByField] = useState<{ [field: string]: Rule[] }>({});
  const [validationErrors, setValidationErrors] = useState<{ [field: string]: IvalidationError }>({});

  const getValidatorErrors = (subject: string, rules: Array<Rule>): Array<string> => {
    const errors = rules.map(({ type, message, value }) => {
      switch (type) {
        case "required":
          if (!subject) return message;
          break;
        case "minLength":
          if (!subject) break
          if (subject.length === 0) break;
          if (subject.length < Number(value)) return message;
          break;
        case "maxLength":
          if (!subject) break
          if (subject.length > Number(value)) return message;
          break;
        default:
          break;
      }
      return undefined as string | undefined;
    });

    const filteredErrors = errors.filter((error): error is string => error !== undefined);

    return filteredErrors;
  };

  const addRules = (field: string, value: string, rules: Array<Rule>) => {
    setValueByField(prevValue => ({
      ...prevValue,
      [field]: value
      // [field]: prevValues[field] || value, заменить выше на это
    }));

    setRulesByField(prevRules => {
      return {
        ...prevRules,
        [field]: rules,
      };
    });
  };

  const unsubscribeRule = (field: string) => {
    setRulesByField(prevRules => {
      const { [field]: deletedField, ...rest } = prevRules;
      return rest;
    });
    setValueByField(prevRules => {
      const { [field]: deletedField, ...rest } = prevRules;
      return rest;
    });
    setValidationErrors(prevErrors => {
      const { [field]: deletedField, ...rest } = prevErrors;
      return rest;
    })
  };

  const unsubscribeAllRules = () => {
    setValueByField({})
    setRulesByField({})
  }

  const validateField = (field: string, value: string) => {
    const errors = getValidatorErrors(value, rulesByField[field]);
    const lastOccuredError = errors[errors.length - 1]

    if (lastOccuredError) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [field]: lastOccuredError,
      }));
    }

    else {
      setValidationErrors(oldState => {
        const newErrorsState = { ...oldState }
        delete newErrorsState[field];
        return newErrorsState
      })
    }

    setValueByField(prevValue => ({
      ...prevValue,
      [field]: value,
    }));

    return errors.length === 0
  };

  const validateAllFields = () => {
    const fieldsWithErrors = []
    for (const field in valueByField) {
      if (!validateField(field, valueByField[field])) {
        fieldsWithErrors.push(true)
      }
    }
    if (fieldsWithErrors.length === 0) {
      return true
    }
    else return false
  };

  const areAllFieldsValid = () => {
    return (Object.keys(validationErrors).length === 0)
  }

  const contextValue: ValidationContextType = {
    addRules,
    validateField,
    validateAllFields,
    validationErrors,
    unsubscribeRule,
    areAllFieldsValid,
    unsubscribeAllRules
  };

  return (
    <ValidationContext.Provider value={contextValue}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};


