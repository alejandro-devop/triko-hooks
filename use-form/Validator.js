import moment from 'moment';
import {ID_VALIDATIONS} from 'config/constants';
import {isEmpty} from 'shared/utils/functions';

/**
 * This class contains the form validations
 * ToDo: Translate this class to it's own file
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 */
class Validator {
  translate = null;
  appRegion = null;
  constructor(translate, appRegion) {
    this.translate = translate;
    this.appRegion = appRegion;
  }

  /**
   * this object contains the available validations.
   * @type {{length: (function(*, *=): boolean), equalsTo: Validator.validations.equalsTo}}
   */
  validations = {
    /**
     * this validation allows to check the field length
     * @param value
     * @param options
     * @returns {boolean}
     */
    length: (value, options = {}) => {
      const {min, max, message} = options;
      console.log('Value: ', value);
      let error = false;
      if (min && max === undefined && value.length < min) {
        error = this.translate(message ? message : 'validations_length', {
          min,
        });
      }
      return error;
    },

    age: (value, options) => {
      const {greaterOrEqualsTo, greaterThen, message} = options;
      let error = false;
      const date = moment(value, 'YYYY-MM-DD');
      const currentDate = moment();
      const difference = Math.abs(date.diff(currentDate, 'years'));
      if (greaterOrEqualsTo) {
        error = difference < greaterOrEqualsTo;
      } else if (greaterThen) {
        error = difference <= greaterThen;
      }
      return error
        ? this.translate(message ? message : 'Field with error')
        : false;
    },

    email: (value, options = {}) => {
      const {message} = options;
      let error = false;
      const regExp = new RegExp(
        '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
        'g',
      );
      if (!value.match(regExp)) {
        error = this.translate(message ? message : 'validations_invalid_email');
      }
      return error;
    },

    /**
     * This validation allows to check if one field value is equals to another.
     * @param value
     * @param options
     * @param form
     * @returns {string|boolean}
     */
    equalsTo: (value, options = {}, form = {}) => {
      const {field, message} = options;
      let error = false;
      if (field && value !== form[field]) {
        error = this.translate(message ? message : 'No match');
      }
      return error;
    },

    ID: (value, options = {}, form = {}) => {
      const {dependsOn, message} = options;
      let error = false;
      try {
        if (dependsOn && this.appRegion === 'es-CO') {
          const idType = form[dependsOn];
          const expressions = ID_VALIDATIONS[this.appRegion];
          const exprToApply = expressions[idType];
          const regExp = new RegExp(exprToApply, 'g');
          if (!value.match(regExp)) {
            error = this.translate(message ? message : 'validations_ID');
          }
        }
        return error;
      } catch (e) {
        console.log('error validating the id');
        return false;
      }
    },
    letters: (value, options = {}) => {
      const {message} = options;
      const regExp = new RegExp('^[a-z A-Z]+$', 'g');
      if (!value.match(regExp)) {
        return this.translate(message || 'validations_letters');
      }
      return false;
    },
  };
  /**
   * This function allows to apply all rules to one field.
   * @param value
   * @param rules
   * @param form
   * @returns {boolean}
   */
  applyRules = (value, rules = {}, form) => {
    const ruleKeys = Object.keys(rules);
    let error = false;
    for (let i = 0; i < ruleKeys.length; i++) {
      const ruleName = ruleKeys[i];
      const ruleToApply = this.validations[ruleName];
      if (!isEmpty(value) && !ruleToApply) {
        continue;
      }
      const ruleConfig = rules[ruleName];
      error = ruleToApply(value, ruleConfig, form);
      if (error) {
        break;
      }
    }
    return error;
  };

  validateRequiredFields = (form, formErrors, required) => {
    const errors = {};
    required.forEach((fieldKey) => {
      if (isEmpty(form[fieldKey]) || formErrors[fieldKey]) {
        errors[fieldKey] = this.translate('validations_required_field');
      }
    });
    return errors;
  };

  isRequired = (name, value, required = []) =>
    required.includes(name) && isEmpty(value) ? true : false;

  /**
   * This function allows to check if all required fields have value and none fields with error.
   * @param form
   * @param formErrors
   * @param required
   * @returns {boolean}
   */
  isValidForm = (form, formErrors = {}, required = []) => {
    let valid = true;
    required.forEach((fieldKey) => {
      if (isEmpty(form[fieldKey]) || formErrors[fieldKey]) {
        valid = false;
      }
    });
    return valid;
  };
}

export default Validator;
