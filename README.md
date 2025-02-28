# AgroTalk

AgroTalk é uma interface conversacional para análise de dados agrícolas e financeiros, permitindo que produtores rurais e gestores agrícolas interajam com dados complexos através de conversas naturais, seja por texto ou voz.

## Funcionalidades

- Interface responsiva para smartphones, tablets e desktops
- Interação por texto e voz com IA
- Visualização dinâmica de dados agrícolas/financeiros
- Geração de artefatos (gráficos, tabelas) a partir da interação com a IA
- Experiência agradável, fluída e intuitiva

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Chart.js
- Framer Motion
- React Speech Recognition

## Estrutura do Projeto

O projeto segue uma arquitetura de componentes modular:

- `src/components`: Componentes React reutilizáveis
- `src/data`: Dados mockados para demonstração
- `src/types`: Definições de tipos TypeScript

## Design System

O design system do AgroTalk foi criado com foco em:

- Acessibilidade
- Responsividade
- Consistência visual
- Experiência do usuário intuitiva

### Cores

- **Primária**: Verde (#16a34a) - Representa agricultura, crescimento e sustentabilidade
- **Secundária**: Roxo (#7c3aed) - Adiciona contraste e representa inovação tecnológica
- **Neutras**: Tons de cinza para textos e fundos

### Tipografia

- **Inter**: Fonte moderna, legível e otimizada para interfaces digitais

### Componentes

- Botões
- Cards
- Inputs
- Mensagens
- Gráficos
- Tabelas

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Deployment

Este projeto pode ser facilmente implantado no GitHub Pages ou Vercel.

## Considerações sobre Acessibilidade

- Contraste adequado entre texto e fundo
- Tamanhos de fonte responsivos
- Suporte a navegação por teclado
- Alternativas textuais para elementos visuais
- Suporte a entrada por voz

## Decisões de Design

- **Mobile First**: Design pensado primeiramente para dispositivos móveis
- **Interface Conversacional**: Interação natural e intuitiva
- **Visualização Dinâmica**: Geração de gráficos e tabelas contextuais
- **Feedback Visual**: Indicadores claros de estado e ações
- **Navegação Simplificada**: Estrutura clara e intuitiva

## Licença

MIT