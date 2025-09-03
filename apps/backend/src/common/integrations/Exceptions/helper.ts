export const getCallerInfo = () => {
  const re = /at (\w+)\.(<?\w+>?) (.*)\/((\w|\.)+):(\d+):(\d+)/g;

  const { stack } = new Error();

  re.exec(stack || '');
  const matches = re.exec(stack || '') || [];

  const caller = matches[1] || '';
  const fn = matches[2] || '';

  return {
    caller: `${caller}.${fn}`,
  };
};
