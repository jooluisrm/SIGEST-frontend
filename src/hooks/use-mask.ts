export type MaskType = 'cpf' | 'telefone' | 'celular' | 'rg';

const maskCpf = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};


const maskTelefone = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 10)
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2'); 
};

const maskCelular = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2'); 
};

const maskRg = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 9)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export const useMask = (maskType?: MaskType) => {
  const applyMask = (value: string): string => {
    if (!maskType) return value;

    switch (maskType) {
      case 'cpf':
        return maskCpf(value);
      case 'telefone':
        return maskTelefone(value);
      case 'celular':
        return maskCelular(value);
      case 'rg':
        return maskRg(value);
      default:
        return value;
    }
  };

  return { applyMask };
};