import { config, fields, collection, singleton } from '@keystatic/core';

const isCloud = !import.meta.env.DEV;

export default config({
  storage: isCloud ? { kind: 'cloud' } : { kind: 'local' },
  ...(isCloud ? { cloud: { project: import.meta.env.VITE_KEYSTATIC_CLOUD_PROJECT ?? 'olickids/olickids' } } : {}),

  ui: {
    brand: { name: 'Olic Kids CMS' },
  },

  singletons: {
    // ── hero ─────────────────────────────────────────────────────────────
    hero: singleton({
      label: 'Hero (Início)',
      path: 'src/content/singletons/hero',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow (cima do título)',
          description: 'Texto pequeno acima do título principal. Ex: Nova coleção inverno 2025',
        }),
        titlePrefix: fields.text({
          label: 'Início do título',
          description: 'Parte fixa do título que aparece antes da palavra animada. Ex: Feito com',
        }),
        titleSuffix: fields.text({
          label: 'Palavra em destaque',
          description: 'Palavra em itálico exibida após o início do título. Ex: amor',
        }),
        subtitle: fields.text({
          label: 'Subtítulo',
          multiline: true,
          description: 'Texto de apoio abaixo do título principal.',
        }),
        trustItems: fields.array(
          fields.text({ label: 'Frase de confiança' }),
          {
            label: 'Frases de confiança (abaixo dos botões)',
            description: 'Pequenas frases que reforçam credibilidade. Ex: Entrega rápida · Feito no Brasil',
            itemLabel: (p) => p.value ?? 'Frase',
          },
        ),
        button1Label: fields.text({
          label: 'Botão 1 — texto',
          description: 'Ex: Ver o conjunto',
        }),
        button1Href: fields.text({
          label: 'Botão 1 — link',
          description: 'Ex: #produto (âncora) ou URL completa',
        }),
        button2Label: fields.text({
          label: 'Botão 2 — texto',
          description: 'Ex: Falar no WhatsApp',
        }),
        button2Href: fields.text({
          label: 'Botão 2 — link (opcional)',
          description: 'Deixe vazio para usar o link do WhatsApp gerado automaticamente pelo número nos Contatos & Redes.',
        }),
        image: fields.image({
          label: 'Foto da hero',
          description: 'Foto lifestyle principal (recomendado: 16:9, mín. 1600px de largura)',
          directory: 'public/images/hero',
          publicPath: '/images/hero/',
        }),
      },
    }),

    // ── diferenciais ─────────────────────────────────────────────────────
    features: singleton({
      label: 'Diferenciais',
      path: 'src/content/singletons/features',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow',
          description: 'Texto pequeno acima do título da seção. Ex: Por que escolher a Olic Kids?',
        }),
        heading: fields.text({
          label: 'Título da seção',
          description: 'Título principal dos diferenciais.',
        }),
        items: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Ícone',
              description: 'Ícone ilustrativo do diferencial.',
              options: [
                { label: 'Termômetro (calor)', value: 'thermo' },
                { label: 'Pena (maciez)', value: 'feather' },
                { label: 'Escudo (proteção)', value: 'shield' },
                { label: 'Lavagem (durabilidade)', value: 'wash' },
              ],
              defaultValue: 'thermo',
            }),
            title: fields.text({
              label: 'Título',
              description: 'Nome curto do diferencial. Ex: Quentinho de verdade',
            }),
            text: fields.text({
              label: 'Descrição',
              multiline: true,
              description: 'Explicação breve do diferencial.',
            }),
          }),
          {
            label: 'Pontos diferenciais',
            description: 'Cada item aparece como um card na seção de diferenciais.',
            itemLabel: (p) => p.fields.title.value || 'Diferencial',
          },
        ),
      },
    }),

    // ── produto (inclui cores e galeria) ─────────────────────────────────
    product: singleton({
      label: 'Produto',
      path: 'src/content/singletons/product',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow',
          description: 'Texto pequeno acima do nome do produto. Ex: Produto em destaque',
        }),
        name: fields.text({
          label: 'Nome do produto',
          description: 'Nome principal exibido na página. Ex: Conjunto Térmico Olic Kids',
        }),
        subtitle: fields.text({
          label: 'Subtítulo',
          description: 'Linha complementar ao nome. Ex: Macacão + Casaco · Plush antialérgico',
        }),
        price: fields.text({
          label: 'Preço',
          description: 'Texto livre. Ex: R$ 69,90',
        }),
        tag: fields.text({
          label: 'Etiqueta (opcional)',
          description: 'Ex: Lançamento — deixe vazio para não exibir',
        }),

        defaultGallery: fields.array(
          fields.object({
            label: fields.text({
              label: 'Descrição da foto',
              description: 'Texto alternativo para acessibilidade. Ex: Vista frontal do macacão bege',
            }),
            image: fields.image({
              label: 'Foto',
              description: 'Imagem do produto sem cor definida (proporção sugerida: 4:5).',
              directory: 'public/images/gallery',
              publicPath: '/images/gallery/',
            }),
          }),
          {
            label: 'Fotos "Sem cor definida"',
            description: 'Exibidas quando nenhuma cor está selecionada.',
            itemLabel: (p) => p.fields.label.value || 'Foto',
          },
        ),

        colors: fields.array(
          fields.object({
            name: fields.text({
              label: 'Nome da cor',
              description: 'Ex: Bege, Azul marinho, Branco',
            }),
            hex: fields.text({
              label: 'Cor (hex)',
              description: 'Ex: #1F2A4D',
            }),
            ring: fields.text({
              label: 'Cor do anel (hex)',
              description: 'Geralmente igual ao hex, exceto branco',
            }),
            gallery: fields.array(
              fields.object({
                label: fields.text({
                  label: 'Descrição da foto',
                  description: 'Texto alternativo para acessibilidade. Ex: Conjunto azul marinho, vista traseira',
                }),
                image: fields.image({
                  label: 'Foto',
                  description: 'Imagem do produto nesta cor (proporção sugerida: 4:5).',
                  directory: 'public/images/gallery',
                  publicPath: '/images/gallery/',
                }),
              }),
              {
                label: 'Fotos desta cor',
                description: 'Galeria específica para esta variação de cor.',
                itemLabel: (p) => p.fields.label.value || 'Foto',
              },
            ),
          }),
          {
            label: 'Cores disponíveis',
            description: 'Cada cor tem sua própria galeria de fotos.',
            itemLabel: (p) => p.fields.name.value || 'Cor',
          },
        ),

        sizes: fields.array(
          fields.text({ label: 'Tamanho' }),
          {
            label: 'Tamanhos disponíveis',
            description: 'Ex: RN, P, M, G — exibidos como opções de seleção na página do produto.',
            itemLabel: (p) => p.value ?? 'Tamanho',
          },
        ),
        benefits: fields.array(
          fields.text({ label: 'Benefício' }),
          {
            label: 'Benefícios do produto',
            description: 'Características destacadas abaixo das opções de compra. Ex: Plush antialérgico',
            itemLabel: (p) => p.value ?? 'Benefício',
          },
        ),

        buyButton: fields.text({
          label: 'Botão de compra — texto',
          description: 'O link é gerado automaticamente com a cor e o tamanho escolhidos pelo cliente.',
        }),
        whatsappMessage: fields.text({
          label: 'Mensagem padrão do WhatsApp',
          description: 'Texto inicial enviado ao abrir o WhatsApp. A cor e o tamanho escolhidos são adicionados automaticamente.',
        }),
        buyNote: fields.text({
          label: 'Nota abaixo do botão',
          description: 'Texto pequeno explicativo abaixo do botão de compra.',
        }),
      },
    }),

    // ── passos de compra + formas de pagamento ────────────────────────────
    howToBuy: singleton({
      label: 'Passos de compra',
      path: 'src/content/singletons/howToBuy',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow',
          description: 'Texto pequeno acima do título da seção. Ex: Como comprar',
        }),
        heading: fields.text({
          label: 'Título da seção',
          description: 'Título principal da seção de como comprar.',
        }),
        subtitle: fields.text({
          label: 'Descrição',
          multiline: true,
          description: 'Texto de apoio abaixo do título.',
        }),
        steps: fields.array(
          fields.object({
            n: fields.text({
              label: 'Número',
              description: 'Ex: 01',
            }),
            title: fields.text({
              label: 'Título do passo',
              description: 'Ex: Escolha a cor e o tamanho',
            }),
            text: fields.text({
              label: 'Descrição',
              multiline: true,
              description: 'Explicação detalhada do passo.',
            }),
          }),
          {
            label: 'Passos de compra',
            description: 'Sequência de etapas exibidas na seção "Como comprar".',
            itemLabel: (p) => p.fields.title.value || 'Passo',
          },
        ),
        payments: fields.array(
          fields.text({ label: 'Forma de pagamento' }),
          {
            label: 'Formas de pagamento',
            description: 'Ex: Pix, Cartão de crédito, Transferência — exibidos como lista.',
            itemLabel: (p) => p.value ?? 'Pagamento',
          },
        ),
        deliveryNote: fields.text({
          label: 'Nota de entrega',
          description: 'Informação rápida sobre prazo ou condições. Ex: Entrega em até 5 dias úteis',
        }),
        deliveryRegion: fields.text({
          label: 'Regiões de entrega',
          description: 'Ex: Todo o Brasil via Correios ou transportadora',
        }),
        ctaButton: fields.text({
          label: 'Texto do botão CTA (opcional)',
          description: 'Deixe vazio para ocultar o botão',
        }),
        ctaButtonHref: fields.text({
          label: 'Link do botão CTA (opcional)',
          description: 'Deixe vazio para usar o WhatsApp gerado pelo número em Contatos & Redes',
        }),
      },
    }),

    // ── história ─────────────────────────────────────────────────────────
    story: singleton({
      label: 'História da marca',
      path: 'src/content/singletons/story',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow',
          description: 'Texto pequeno acima do título. Ex: Nossa história',
        }),
        heading: fields.text({
          label: 'Título da seção',
          description: 'Título principal da seção de história.',
        }),
        paragraph1: fields.text({
          label: 'Parágrafo 1',
          multiline: true,
          description: 'Primeiro bloco de texto da história da marca.',
        }),
        paragraph2: fields.text({
          label: 'Parágrafo 2',
          multiline: true,
          description: 'Segundo bloco de texto da história da marca.',
        }),
        quote: fields.text({
          label: 'Citação em destaque',
          multiline: true,
          description: 'Frase marcante exibida em destaque visual na seção.',
        }),
        imagePrincipal: fields.image({
          label: 'Foto principal',
          description: 'Proporção sugerida: 5:6',
          directory: 'public/images/story',
          publicPath: '/images/story/',
        }),
        imageDetalhe: fields.image({
          label: 'Foto detalhe',
          description: 'Proporção sugerida: 1:1 — aparece sobreposta à foto principal',
          directory: 'public/images/story',
          publicPath: '/images/story/',
        }),
      },
    }),

    // ── CTA final ────────────────────────────────────────────────────────
    finalCta: singleton({
      label: 'CTA Final',
      path: 'src/content/singletons/finalCta',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({
          label: 'Título principal',
          multiline: true,
          description: 'Chamada principal da seção de conversão. Ex: Vamos vestir o inverno com carinho?',
        }),
        subtitle: fields.text({
          label: 'Subtítulo',
          multiline: true,
          description: 'Texto de apoio abaixo do título.',
        }),
        ctaButton: fields.text({
          label: 'Botão 1 — texto',
          description: 'Ex: Fazer meu pedido no WhatsApp',
        }),
        ctaButtonHref: fields.text({
          label: 'Botão 1 — link',
          description: 'Link do WhatsApp com mensagem pré-preenchida',
        }),
        instagramLabel: fields.text({
          label: 'Botão 2 — texto',
          description: 'Ex: @olickids',
        }),
        instagramHref: fields.url({
          label: 'Botão 2 — link',
          description: 'URL do Instagram',
        }),
      },
    }),

    // ── rodapé ───────────────────────────────────────────────────────────
    footer: singleton({
      label: 'Rodapé',
      path: 'src/content/singletons/footer',
      format: { data: 'yaml' },
      schema: {
        footerTagline: fields.text({
          label: 'Tagline do rodapé',
          description: 'Frase em destaque no rodapé, em itálico. Ex: Feito para crescer com carinho.',
        }),
        footerDescription: fields.text({
          label: 'Descrição no rodapé',
          multiline: true,
          description: 'Texto breve sobre a marca exibido na coluna da logo.',
        }),
      },
    }),

    // ── contatos & redes ──────────────────────────────────────────────────
    config: singleton({
      label: 'Contatos & Redes',
      path: 'src/content/singletons/config',
      format: { data: 'yaml' },
      schema: {
        whatsappNumber: fields.text({
          label: 'WhatsApp (só dígitos)',
          description: 'Apenas dígitos, formato internacional. Ex: 554792657717',
        }),
        instagramUrl: fields.url({
          label: 'URL do Instagram',
          description: 'URL completa do perfil. Ex: https://www.instagram.com/olickids',
        }),
        instagramHandle: fields.text({
          label: 'Handle do Instagram',
          description: 'Ex: @olickids',
        }),
        email: fields.text({
          label: 'E-mail de contato',
          description: 'Endereço exibido no rodapé e usado no link de contato.',
        }),
        headerCtaLabel: fields.text({
          label: 'Botão do header — texto',
          description: 'Ex: Pedir no WhatsApp',
        }),
        headerCtaHref: fields.text({
          label: 'Botão do header — link',
          description: 'Link completo do WhatsApp com mensagem pré-preenchida.',
        }),
      },
    }),
  },

  collections: {
    // ── menu ─────────────────────────────────────────────────────────────
    nav: collection({
      label: 'Menu de navegação',
      path: 'src/content/collections/nav/*',
      format: { data: 'yaml' },
      slugField: 'label',
      schema: {
        label: fields.slug({ name: { label: 'Rótulo do link' } }),
        href: fields.text({
          label: 'Link (âncora)',
          description: 'Ex: #inicio',
        }),
      },
    }),
  },
});
