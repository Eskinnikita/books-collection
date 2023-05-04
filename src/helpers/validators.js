const validatePassLength = (rule, value) => {
  if (value.trim().length) {
    return value.length >= 5 && value.length <= 10;
  }
  return true;
};

const validateEmailFormat = (rule, value) => {
  const emailRegExp = /^(?![^\w"])("(.*?)"|[\w.,_%+\-/!;]+)(\.[\w.,_%+\-/!;]+)*@[a-zA-Z0-9.[\]\-:]+$/;
  if (value.trim().length) {
    return emailRegExp.test(value);
  }
  return true;
};

export {
  validatePassLength,
  validateEmailFormat,
};
