# Raasch — site institucional e catálogo

Novo site da **Raasch** (Porto Alegre / RS), reunindo as três linhas da casa —
**jóias, iluminação e decoração** — em um catálogo navegável com fechamento de
venda pelo WhatsApp, como a loja já faz hoje.

Todo o conteúdo (institucional, categorias, produtos, referências, fotos e
contatos) foi migrado do site legado `raasch.com.br`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (tokens de tema em `app/globals.css`)
- Fontes: Cormorant Garamond (display) + Jost (texto), via `next/font`

## Rodando localmente

```bash
npm install
npm run dev
```

O site fica em [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run lint    # eslint
```

## Estrutura

```
app/
  layout.tsx              fontes, metadados, header/footer, cesto
  page.tsx                home
  globals.css             paleta, tipografia, animações
  empresa/                história da empresa desde 1989
  contato/                dados da loja, formulário e mapa
  revista-digital/        edições em PDF
  busca/                  busca sobre todo o catálogo
  joias/                  índice da linha
    [...slug]/            listagem por categoria (aceita subcategorias)
  iluminacao/             idem
  decoracao/              idem
  produto/[id]/           ficha do produto
  data/
    catalog.ts            tipos e consultas sobre o catálogo
    site.ts               endereço, telefones, marcos institucionais
    products.json         7.380 produtos migrados
    categories.json       60 categorias
  components/             header, cesto, grades, cards, seções da home
public/
  logo-full.png           logotipo completo (marca + wordmark)
  logo-wordmark.png       só o lettering — usado no header
  logo-mark.png           só o monograma
  video/hero.mp4          vídeo animado da hero
  images/
    card-*.jpg            capas das três linhas (peça do catálogo sobre fundo escuro)
    editorial-*.jpg       fotografia editorial usada nas seções e mastheads
```

## Catálogo

`app/data/products.json` guarda nome, referência, descrição técnica e fotos de
cada peça — o catálogo inteiro do site legado (jóias 1.153, iluminação 1.849,
decoração 4.378). As **fotos são servidas pelo host legado**
(`www.raasch.com.br/admin/conteudos/produtos/…`), liberado em
`next.config.ts` → `images.remotePatterns`, e otimizado pelo `next/image`.

> Para desligar essa dependência, basta baixar as imagens para `public/` e
> trocar as URLs no JSON — nada mais no código muda.

## Venda pelo WhatsApp

A loja fecha as vendas no WhatsApp, e o site respeita isso:

- **Comprar pelo WhatsApp** na ficha do produto, já com nome e referência.
- **Cesto** (`app/components/cartStore.ts`), guardado em `localStorage`, que
  monta uma mensagem única de orçamento com todos os itens.
- Formulário de contato e botão flutuante apontam para o mesmo número.

## Foco em jóias

A home é ordenada como uma joalheria, não como um catálogo de três linhas
iguais. Jóias é a linha principal e a que o visitante chega pronto para comprar.

1. **Hero** — vídeo, com texto e CTA de jóias.
2. **Jóias** (`JoiasSpotlight.tsx`) — trilho horizontal de categorias
   (Alianças primeiro, a maior e a de maior intenção de compra) mais peças em
   destaque. O trilho é rolagem nativa no celular e vira grade em `lg`.
3. **Como comprar** (`HowToBuy.tsx`) — os três passos do WhatsApp. Sem preço
   na tela, esta seção responde à dúvida que trava a compra.
4. **Iluminação e decoração** (`OtherLines.tsx`) — as outras linhas, presentes
   e deliberadamente mais discretas.
5. Empresa, Instagram, Revista, Contato e mapa.

Na ficha do produto, uma **barra fixa de compra** (`StickyBuyBar.tsx`) aparece
no celular quando os botões principais saem da tela. O botão flutuante do
WhatsApp se retira enquanto ela está visível, via `body[data-buybar]`.

## Instagram e mapa

- Seção dedicada ao **@raasch_joias** (`app/components/Instagram.tsx`): perfil em
  destaque, CTA de seguir, e uma galeria de peças reais do catálogo. O Instagram
  não expõe o feed sem token de API, então a galeria é rotulada como catálogo —
  não se passa por posts do perfil.
- `@raasch.decor` aparece logo abaixo, como perfil secundário.
- Ícone do Instagram no header e no menu mobile.
- **Mapa da loja** (`app/components/StoreMap.tsx`), na home e em `/contato`,
  com o endereço sobreposto no desktop. Usa o embed sem chave do Google Maps.

## Mobile

O celular é tratado como o caso principal, não como uma redução do desktop.

- **Hero em vídeo com autoplay real.** React renderiza `muted` como propriedade,
  mas as políticas de autoplay do mobile leem o *atributo* — sem ele o telefone
  espera um toque. O atributo é escrito no `useEffect`, e há retry em
  `visibilitychange`/`touchstart` para Low Power Mode. Se ainda assim o
  autoplay for negado, o poster assume a animação Ken Burns: o hero nunca fica
  parado.
- **Escala tipográfica com piso de celular** (`.display-1/2/3` em
  `globals.css`). Um `clamp(2.2rem, 4.5vw, …)` trava no piso em 375px, o que
  deixava títulos grandes demais — "disposição" chegava a ser cortada.
- **Alvos de toque de 44px** no header, chips de categoria e breadcrumbs. O
  botão de menu tinha 13px de altura.
- O botão "adicionar ao cesto" da grade só aparece no hover — como toque não
  dispara hover, abaixo de `lg` ele vira um botão **+ Cesto** sob o nome.
- Cards das três linhas viram quadrados abaixo de `lg`; cards da grade têm
  altura igual para os botões não desalinharem.
- Ritmo vertical menor no celular, aviso do topo encurtado, e os links de seção
  ganham borda até `md` para parecerem tocáveis.

## Pendências

- O formulário de contato abre o WhatsApp; não há envio por e-mail (o site
  legado usava um mailer que não veio junto).
- Preços não são exibidos — o catálogo legado também não os publica, os valores
  variam com ouro, pedras e acabamento e são passados no atendimento.
- A busca cobre nome, categoria, referência e descrição, com tratamento de
  plural em português (`cristais` encontra `cristal`).
