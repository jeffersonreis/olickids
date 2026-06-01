# Olic Kids — Landing Page

Site da **Olic Kids** construído com [Astro 6](https://astro.build) + [Keystatic](https://keystatic.com) como CMS git-based.

Todo o conteúdo (textos, imagens, cores, preço, contatos) é editável pelo painel `/keystatic`. Os valores atuais ficam como **seed** no repositório — o site já funciona na primeira execução.

---

## Pré-requisitos

- Node.js 22+
- npm 10+

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Site em `http://localhost:4321`
Painel CMS em `http://localhost:4321/keystatic`

Em desenvolvimento, o Keystatic usa **armazenamento local** (lê e grava os arquivos YAML em `src/content/`).

---

## Estrutura do conteúdo

Os arquivos de conteúdo vivem em `src/content/` e são YAML simples:

```
src/content/
├─ singletons/
│  ├─ config.yaml       # WhatsApp, Instagram, e-mail
│  ├─ product.yaml      # nome, preço, tamanhos, pagamentos
│  ├─ hero.yaml         # título, typewriter, subtítulo
│  ├─ story.yaml        # história da marca
│  ├─ finalCta.yaml     # CTA final e textos do rodapé
│  └─ branding.yaml     # caminhos das imagens de logo
└─ collections/
   ├─ colors/           # 5 cores do produto
   ├─ features/         # 4 diferenciais
   ├─ steps/            # 3 passos de compra
   ├─ nav/              # links do menu
   └─ gallery/          # 4 fotos da galeria (opcional)
```

---

## Deploy na Netlify

### 1. Conectar o repositório

1. Faça login em [app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project**
3. Selecione este repositório GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`

### 2. Configurar o Keystatic Cloud (edição online)

Para editar o conteúdo diretamente pelo painel em produção sem precisar fazer push local:

1. Crie uma conta em [keystatic.cloud](https://keystatic.cloud)
2. Crie um novo projeto e conecte ao seu repositório GitHub
3. Copie o **Project slug** (ex: `minha-equipe/olic-kids`)
4. No painel da Netlify → **Site configuration → Environment variables**, adicione:

| Variável | Valor |
|---|---|
| `KEYSTATIC_STORAGE` | `cloud` |
| `KEYSTATIC_CLOUD_PROJECT` | `minha-equipe/olic-kids` |

5. Faça um novo deploy.

O painel `/keystatic` em produção pedirá login com a conta Keystatic Cloud e salvará as edições diretamente no repositório GitHub (via commit automático).

### 3. Subir fotos da galeria

Com o site em produção:

1. Acesse `/keystatic` → **Galeria do produto**
2. Clique em um item → **Foto do produto** → faça upload
3. Clique em **Save** — um commit é criado e o Netlify refaz o build automaticamente

---

## Adicionando/trocando imagens de marca

Os logos estão em `public/images/`. Para trocar, substitua os arquivos diretamente:

- `public/images/wordmark_cream.png`
- `public/images/wordmark_brown.png`

---

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Preview do build localmente |

---

## Tecnologias

- **Astro 6** — framework de sites estáticos com suporte a SSR para o CMS
- **React 19** — islands interativos (Header, Typewriter, Product)
- **Keystatic** — CMS git-based, conteúdo versionado como YAML no repositório
- **Netlify** — hospedagem e deploy contínuo
- **Fraunces** / **Nunito Sans** / **Cormorant Garamond** — fontes locais em `public/fonts/`
