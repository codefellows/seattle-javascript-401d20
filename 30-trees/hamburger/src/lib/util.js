export const classToggler = (options) => 
  Object.keys(options).filter(key => options[key]).join(' ')

export const renderIf = (test, template) => test ? template : undefined
