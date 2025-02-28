export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'chart' | 'table' | 'image';
  data: any;
  title?: string;
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface Crop {
  id: string;
  name: string;
  area: number;
  unit: string;
  plantingDate: string;
  harvestDate: string;
  expectedYield: number;
  actualYield?: number;
  costs: {
    seeds: number;
    fertilizers: number;
    pesticides: number;
    labor: number;
    machinery: number;
    other: number;
  };
  revenue?: number;
}

export interface FinancialData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  investments: number;
  loans: number;
}

export interface WeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  precipitation: number;
  humidity: number;
  windSpeed: number;
}