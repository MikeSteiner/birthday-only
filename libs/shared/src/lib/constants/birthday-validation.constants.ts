export const NAME_VALIDATION = {
  minLength: 1,
  maxLength: 70,
} as const;

export const DAYS_VALIDATION = {
  min: 1,
  max: 31,
} as const;

export const MONTHS_INDEX = {
  min: 0,
  max: 11,
} as const;

const CURRENT_YEAR = new Date().getFullYear();
export const YEAR_VALIDATION = {
  min: 1900,
  max: CURRENT_YEAR,
} as const;

export const PHONE_VALIDATION = {
  minLength: 1,
  maxLength: 20,
} as const;

export const GREETING_MESSAGE_VALIDATION = {
  minLength: 1,
  maxLength: 500,
} as const;

export const NAME_ERRORS = {
  required: 'Name is required',
  maxlength: `Name must be at most ${NAME_VALIDATION.maxLength} characters`,
} as const;

export const BIRTH_DAY_ERRORS = {
  required: 'Day is required',
  min: `Day must be between ${DAYS_VALIDATION.min} and ${DAYS_VALIDATION.max}`,
  max: `Day must be between ${DAYS_VALIDATION.min} and ${DAYS_VALIDATION.max}`,
} as const;

export const BIRTH_MONTH_ERRORS = {
  required: 'Month is required',
  min: 'Please select a valid month',
  max: 'Please select a valid month',
} as const;

export const BIRTH_YEAR_ERRORS = {
  min: `Year must be ${YEAR_VALIDATION.min} or later`,
  max: `Year cannot be later than ${YEAR_VALIDATION.max}`,
} as const;

export const PHONE_NUMBER_ERRORS = {
  minlength: 'Phone number is too short',
  maxlength: `Phone number must be at most ${PHONE_VALIDATION.maxLength} characters`,
} as const;

export const GREETING_MESSAGE_ERRORS = {
  minlength: 'Greeting message cannot be empty',
  maxlength: `Greeting must be at most ${GREETING_MESSAGE_VALIDATION.maxLength} characters`,
} as const;
