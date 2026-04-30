# DNA Conecta

Uma aplicação React + Vite para cadastro de corretores via formulário em múltiplas etapas.

## Visão geral

O projeto contém um fluxo de onboarding/registro de corretor com etapas de:
- Landing
- Registro CRECI
- Endereço
- Dados PIX / Banco
- Upload de foto
- Loja
- Termos
- Sucesso

O objetivo é criar um cadastro completo de corretor com validações, suporte a APIs externas e navegação por etapas.

## Tecnologias

- React 19
- TypeScript 6
- Vite 7
- Zustand
- React Hook Form
- Zod
- Material UI
- Framer Motion
- Sonner
- React Webcam
- React Window
- Sass

## Estrutura principal

- `src/app/App.tsx` — entry point do app
- `src/routes/AppRouter.tsx` — roteamento do app atualmente direcionado para `CadastroCorretorPage`
- `src/features/cadastro-corretor/components/CadastroCorretorPage.tsx` — container do fluxo de cadastro
- `src/features/cadastro-corretor/steps/` — passos do formulário
- `src/features/cadastro-corretor/schemas/cadastroSchema.ts` — validações de formulário com Zod
- `src/features/cadastro-corretor/store/useCadastroStore.ts` — estado do fluxo de cadastro
- `src/services/` — chamadas a APIs e integrações de serviço
- `src/components/form/` — componentes de formulário reutilizáveis
- `src/styles/` — estilos do projeto

## APIs e serviços existentes

- `src/services/banks.ts` — busca lista de bancos via `https://brasilapi.com.br/api/banks/v1`
- `src/services/viacep.ts` — consulta de CEP via `https://viacep.com.br/ws/{cep}/json/`
- `src/services/creci.ts` — stub de consulta CRECI (atualmente fake/mock)

## Como rodar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Para build de produção:
   ```bash
   npm run build
   ```
4. Para visualizar a build localmente:
   ```bash
   npm run preview
   ```

## Andamento atual

O fluxo está desenvolvido até o `Step4`.

### Passos implementados

- `LandingStep` (passo inicial)
- `Step1Creci` (dados CRECI)
- `Step2Endereco` (dados de endereço)
- `Step3Pix` (PIX / banco)
- `Step4Foto` (upload / captura de foto)

### Itens existentes mas ainda não finalizados

- `Step5Loja` (presente no código, mas precisa ser desenvolvido/completado)
- `Step6Termos` (presente no código, precisa ser desenvolvido/completado)
- `StepSuccess` (passo final)

## Roadmap pendente

- Conferir estilos do `Step4` e garantir que o upload / salvamento da foto funcione corretamente
- Desenvolver `Step5` completo
- Desenvolver `Step6` completo
- Desenvolver `Step7` (ainda não existe como arquivo de passo definido, deve ser adicionado se for parte do fluxo)
- Integrar APIs do Genoma
- Integrar APIs de verificação CRECI reais
- Substituir serviços mock por chamadas reais de API
- Ajustar responsividade e usabilidade no Desktop

## Observações

- O cadastro usa estado global via `zustand` para navegar entre etapas e armazenar dados parciais.
- O seletor de banco foi implementado com consumo de `https://brasilapi.com.br/api/banks/v1`.
- O serviço de CRECI ainda é um mock e precisa ser substituído por uma integração real.


