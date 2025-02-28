import { Crop, FinancialData, WeatherData } from '../types';

export const crops: Crop[] = [
  {
    id: '1',
    name: 'Soja',
    area: 500,
    unit: 'hectares',
    plantingDate: '2023-10-15',
    harvestDate: '2024-03-20',
    expectedYield: 3.5,
    actualYield: 3.2,
    costs: {
      seeds: 125000,
      fertilizers: 200000,
      pesticides: 150000,
      labor: 100000,
      machinery: 75000,
      other: 50000,
    },
    revenue: 1600000,
  },
  {
    id: '2',
    name: 'Milho',
    area: 300,
    unit: 'hectares',
    plantingDate: '2023-11-10',
    harvestDate: '2024-04-15',
    expectedYield: 8.5,
    costs: {
      seeds: 90000,
      fertilizers: 120000,
      pesticides: 80000,
      labor: 60000,
      machinery: 45000,
      other: 30000,
    },
  },
  {
    id: '3',
    name: 'Algodão',
    area: 200,
    unit: 'hectares',
    plantingDate: '2023-12-05',
    harvestDate: '2024-05-25',
    expectedYield: 4.2,
    costs: {
      seeds: 80000,
      fertilizers: 100000,
      pesticides: 120000,
      labor: 90000,
      machinery: 60000,
      other: 40000,
    },
  },
];

export const financialData: FinancialData[] = [
  {
    period: 'Jan 2024',
    revenue: 120000,
    expenses: 80000,
    profit: 40000,
    cashFlow: 35000,
    investments: 20000,
    loans: 100000,
  },
  {
    period: 'Fev 2024',
    revenue: 110000,
    expenses: 75000,
    profit: 35000,
    cashFlow: 30000,
    investments: 15000,
    loans: 95000,
  },
  {
    period: 'Mar 2024',
    revenue: 180000,
    expenses: 90000,
    profit: 90000,
    cashFlow: 85000,
    investments: 40000,
    loans: 90000,
  },
  {
    period: 'Abr 2024',
    revenue: 200000,
    expenses: 95000,
    profit: 105000,
    cashFlow: 100000,
    investments: 50000,
    loans: 85000,
  },
  {
    period: 'Mai 2024',
    revenue: 220000,
    expenses: 100000,
    profit: 120000,
    cashFlow: 115000,
    investments: 60000,
    loans: 80000,
  },
  {
    period: 'Jun 2024',
    revenue: 190000,
    expenses: 105000,
    profit: 85000,
    cashFlow: 80000,
    investments: 30000,
    loans: 75000,
  },
];

export const weatherData: WeatherData[] = [
  {
    date: '2024-01-01',
    temperature: {
      min: 18,
      max: 32,
      avg: 25,
    },
    precipitation: 0,
    humidity: 65,
    windSpeed: 12,
  },
  {
    date: '2024-01-02',
    temperature: {
      min: 19,
      max: 33,
      avg: 26,
    },
    precipitation: 0,
    humidity: 60,
    windSpeed: 10,
  },
  {
    date: '2024-01-03',
    temperature: {
      min: 20,
      max: 34,
      avg: 27,
    },
    precipitation: 5,
    humidity: 70,
    windSpeed: 8,
  },
  {
    date: '2024-01-04',
    temperature: {
      min: 21,
      max: 30,
      avg: 25.5,
    },
    precipitation: 15,
    humidity: 80,
    windSpeed: 15,
  },
  {
    date: '2024-01-05',
    temperature: {
      min: 19,
      max: 28,
      avg: 23.5,
    },
    precipitation: 20,
    humidity: 85,
    windSpeed: 18,
  },
  {
    date: '2024-01-06',
    temperature: {
      min: 17,
      max: 27,
      avg: 22,
    },
    precipitation: 10,
    humidity: 75,
    windSpeed: 14,
  },
  {
    date: '2024-01-07',
    temperature: {
      min: 16,
      max: 29,
      avg: 22.5,
    },
    precipitation: 0,
    humidity: 65,
    windSpeed: 12,
  },
];

export const generateMockResponse = (query: string): any => {
  // Simple keyword matching to generate responses
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('soja') || lowerQuery.includes('soy')) {
    return {
      text: 'Aqui estão os dados da sua plantação de soja. A produtividade está 8.5% abaixo do esperado, mas ainda assim é lucrativa considerando os preços atuais do mercado.',
      attachments: [
        {
          type: 'chart',
          chartType: 'bar',
          title: 'Análise de Custos - Soja',
          data: {
            labels: ['Sementes', 'Fertilizantes', 'Pesticidas', 'Mão de obra', 'Maquinário', 'Outros'],
            datasets: [
              {
                label: 'Custos (R$)',
                data: [125000, 200000, 150000, 100000, 75000, 50000],
              }
            ]
          }
        }
      ]
    };
  }
  
  if (lowerQuery.includes('financeiro') || lowerQuery.includes('financial') || lowerQuery.includes('lucro') || lowerQuery.includes('profit')) {
    return {
      text: 'Aqui está um resumo dos seus dados financeiros dos últimos 6 meses. Observamos um crescimento constante na receita e no lucro, com uma redução gradual nos empréstimos.',
      attachments: [
        {
          type: 'chart',
          chartType: 'line',
          title: 'Desempenho Financeiro',
          data: {
            labels: financialData.map(d => d.period),
            datasets: [
              {
                label: 'Receita',
                data: financialData.map(d => d.revenue),
              },
              {
                label: 'Despesas',
                data: financialData.map(d => d.expenses),
              },
              {
                label: 'Lucro',
                data: financialData.map(d => d.profit),
              }
            ]
          }
        }
      ]
    };
  }
  
  if (lowerQuery.includes('clima') || lowerQuery.includes('weather') || lowerQuery.includes('chuva') || lowerQuery.includes('rain')) {
    return {
      text: 'Aqui está a previsão do tempo para os próximos dias. Observe que há previsão de chuva significativa nos dias 4 e 5, o que pode ser benéfico para suas plantações.',
      attachments: [
        {
          type: 'chart',
          chartType: 'line',
          title: 'Previsão do Tempo',
          data: {
            labels: weatherData.map(d => d.date.split('-')[2]),
            datasets: [
              {
                label: 'Temperatura Máx. (°C)',
                data: weatherData.map(d => d.temperature.max),
              },
              {
                label: 'Temperatura Mín. (°C)',
                data: weatherData.map(d => d.temperature.min),
              },
              {
                label: 'Precipitação (mm)',
                data: weatherData.map(d => d.precipitation),
              }
            ]
          }
        }
      ]
    };
  }
  
  if (lowerQuery.includes('comparação') || lowerQuery.includes('compare') || lowerQuery.includes('culturas') || lowerQuery.includes('crops')) {
    return {
      text: 'Aqui está uma comparação entre suas principais culturas. A soja apresenta o maior retorno financeiro, enquanto o algodão tem os maiores custos com pesticidas.',
      attachments: [
        {
          type: 'chart',
          chartType: 'bar',
          title: 'Comparação de Culturas',
          data: {
            labels: ['Soja', 'Milho', 'Algodão'],
            datasets: [
              {
                label: 'Área (hectares)',
                data: [500, 300, 200],
              },
              {
                label: 'Produtividade Esperada (ton/ha)',
                data: [3.5, 8.5, 4.2],
              }
            ]
          }
        },
        {
          type: 'table',
          title: 'Análise Financeira por Cultura',
          data: {
            headers: ['Cultura', 'Área (ha)', 'Custo Total (R$)', 'Custo/ha (R$)'],
            rows: [
              ['Soja', 500, 700000, 1400],
              ['Milho', 300, 425000, 1417],
              ['Algodão', 200, 490000, 2450]
            ]
          }
        }
      ]
    };
  }
  
  // Default response
  return {
    text: 'Posso ajudar com informações sobre suas culturas (soja, milho, algodão), dados financeiros, previsão do tempo ou fazer comparações entre culturas. O que você gostaria de saber?',
    attachments: []
  };
};