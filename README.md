
# 🎂 Dakingo — Decadent Cravings Delivered

O **Dakingo** é uma plataforma moderna e responsiva de e-commerce e catálogo gourmet focada na entrega de bolos artesanais, sobremesas e presentes especiais. O projeto simula uma experiência de usuário premium, oferecendo customização dinâmica de produtos (como peso e sabor), cálculo de preço proporcional em tempo real, fluxo de carrinho de compras e um assistente de lembretes para datas comemorativas.

🌐 **Acesse o projeto online:** [dakingo.vercel.app](https://dakingo.vercel.app/)

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando o ecossistema moderno do JavaScript/TypeScript focado em performance, componentização e tipagem estática:

*   **[React](https://react.dev/)** — Biblioteca base para construção das interfaces baseadas em componentes.
*   **[TypeScript](https://www.typescriptlang.org/)** — Adição de tipagem estática para garantir segurança, autocompletes robustos e evitar erros em tempo de desenvolvimento.
*   **[Tailwind CSS](https://tailwindcss.com/)** — Framework utilitário para estilização rápida, responsiva e altamente customizável.
*   **[Framer Motion](https://www.framer.com/motion/)** — Biblioteca utilizada para animações fluidas de interface (como a expansão dos drawers de configuração e feedback visual do carrinho).
*   **[Lucide React](https://lucide.dev/)** — Conjunto de ícones minimalistas e consistentes em toda a aplicação.

---

## 🎯 Funcionalidades Principais

*   **Navegação Inteligente por Âncoras:** Menu de categorias com rolagem suave (`scroll-behavior: smooth`) e margens adaptadas para não cobrir os títulos com o cabeçalho fixo.
*   **Customização Avançada por Item:** Permite que o usuário configure o sabor e o peso específico de cada bolo diretamente do card antes de adicioná-lo ao carrinho.
*   **Cálculo Dinâmico de Preço:** Multiplicador lógico que calcula e atualiza o preço original e o promocional com base na variação do peso selecionado (tendo 1.0kg como peso base).
*   **Fluxo de Carrinho Reverso e Estado Global:** Controle de estado global centralizado via React Context (`AppContext`), gerenciando a quantidade total de itens do carrinho, dados de usuário conectado e controle de sessões como convidado (*Guest*).
*   **Painel de Lembretes (*Reminders*):** Área dedicada no cabeçalho para gerenciar datas e notificações para que o usuário não esqueça de encomendar em aniversários ou ocasiões especiais.
*   **Design Responsivo Premium:** Layout adaptável de 1 a 4 colunas (Mobile até Desktop) usando a grade semântica do Tailwind CSS.

---

## 🧠 Aprendizados e Desafios Técnicos

Desenvolver o Dakingo trouxe desafios práticos importantes para a minha evolução como desenvolvedor Full Stack:

1.  **Manipulação Complexa de Estados por ID:** No componente de listagem, foi necessário gerenciar estados de interface (como abertura do painel de sabores) e dados (como peso escolhido) de forma individualizada para cada card. Resolvi isso utilizando estruturas de mapas de chaves/valores do TypeScript (`Record<string, boolean>` e `Record<string, string>`), garantindo que a alteração de um bolo não interferisse no comportamento dos outros.
2.  **Transições de Interface com AnimatePresence:** Integrar animações de montagem e desmontagem de componentes no ecossistema do React pode ser complexo. O uso do Framer Motion em conjunto com componentes condicionais permitiu criar drawers que deslizam de forma natural sem quebrar o fluxo do layout.
3.  **Clean Code e Separação de Conceitos:** Manter o cabeçalho sincronizado com as compras exigiu um fluxo limpo de passagem de funções via Props (`onOpenCart`, `onOpenAuth`) e consumo direto de ganchos (*Hooks*) customizados, mantendo o código fácil de dar manutenção.

---

## 💻 Como Rodar o Projeto Localmente

Siga os passos abaixo para clonar o repositório e executar o servidor de desenvolvimento na sua máquina (certifique-se de ter o [Node.js](https://nodejs.org/) instalado):

### 1. Clonar o repositório
```bash
git clone [https://github.com/GUILHERMEDEV-FRONT/Dakingo.git](https://github.com/GUILHERMEDEV-FRONT/Dakingo.git)
