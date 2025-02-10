import type { Locale, VarRefType, VarType } from './enums';

export type VariableContent = {
  refId: string;
  refType: VarRefType;
  type: VarType;
  title: string;
  locale?: Locale;
  value: string;
};
