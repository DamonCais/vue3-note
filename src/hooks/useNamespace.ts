const statePrefix = 'is-';
export const useNameSpace = (block:string) => {
  const b = () => `nc-${block}`;
  const bs = (blockSuffix: string) => `${b()}-${blockSuffix}`;
  const be = (element: string) => `${b()}__${element}`;
  const bm = (modifier: string | number) => `${b()}--${modifier}`;
  const bem = (element: string, modifier: string | number) => `${b()}__${element}--${modifier}`;
  const is: {
        (name: string, state: boolean | undefined): string
        (name: string): string
      } = (name: string, ...args: [boolean | undefined] | []) => {
        const state = args.length >= 1 ? args[0]! : true;
        return name && state ? `${statePrefix}${name}` : '';
      };
  return {
    b,
    bs,
    be,
    bm,
    bem,
    is
  };
};
