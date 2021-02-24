import useTranslation from 'hooks/useTranslation';
import {useState} from 'react';
import {isEmpty} from 'shared/utils/functions';
import Validator from './Validator';
import {useSession} from 'hooks/index';

/**
 * This hook allows to handle form values and validations
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param initialValues
 * @param options
 * @returns {{form: *, onChange: *, isValid: *, formErrors: *, setFormValues: function}}
 */
const useForm = (initialValues = {}, options = {}) => {
  const {_t} = useTranslation();
  const {
    stack: {region},
  } = useSession();
  const validator = new Validator(_t, region);
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const {rules = {}, required = []} = options;

  const onChange = ({target: {name, value}}) => {
    const newFormValues = {...form, [name]: value};
    setForm({...form, [name]: value});
    const requiredValidation = validator.isRequired(
      name,
      newFormValues[name],
      required,
    );
    let fieldError = false;
    if (requiredValidation) {
      fieldError = requiredValidation;
    } else {
      fieldError = !isEmpty(value)
        ? validator.applyRules(value, rules[name], form)
        : false;
    }

    const newErrors = {...errors, [name]: fieldError};
    setErrors(newErrors);
    checkIsValid(newFormValues, newErrors, required);
  };

  const checkIsValid = (newFormValues, newErrors) =>
    setIsValid(validator.isValidForm(newFormValues, newErrors, required));

  const runValidations = (formValues) => {
    const formToCheck = formValues ? formValues : form;
    const formKeys = Object.keys(formToCheck);
    const foundErrors = {};
    formKeys.forEach((name) => {
      let isRequired = validator.isRequired(name, formToCheck[name], required);
      if (isRequired !== false) {
        foundErrors[name] = isRequired;
      }
    });
    setErrors({...errors, ...foundErrors});
    setIsValid(validator.isValidForm(formToCheck, foundErrors, required));
  };
  const setFormValues = (newFormValues) => {
    setForm({...newFormValues});
  };

  return {
    form,
    setForm,
    setFormValues,
    formErrors: errors,
    isValid,
    onChange,
    runValidations,
    checkIsValid,
  };
};

export default useForm;
