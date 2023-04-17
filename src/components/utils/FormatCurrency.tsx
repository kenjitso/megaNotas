// Função formatCurrency para formatar valores numéricos como moeda
export const formatCurrency = (
    value: number, // Valor numérico a ser formatado
    options?: Intl.NumberFormatOptions // Opções opcionais de formatação
  ): string => {
    // Opções padrão de formatação de moeda
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'decimal', // Estilo de formatação como moeda   "currency" > com cifrao "decimal" > sem cifrao
      currency: 'BRL', // A moeda a ser utilizada (Real brasileiro)
      minimumFractionDigits: 2, // Número mínimo de casas decimais
      maximumFractionDigits: 2, // Número máximo de casas decimais
    };
  
    // Mesclar as opções padrão com as opções fornecidas pelo usuário
    const mergedOptions = { ...defaultOptions, ...options };
  
    // Retornar o valor formatado como moeda utilizando o objeto Intl.NumberFormat
    return new Intl.NumberFormat('pt-BR', mergedOptions).format(value);
  };
  