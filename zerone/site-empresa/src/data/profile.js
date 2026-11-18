// Tudo que é da empresa vive aqui. Troque os textos entre [colchetes] e os
// links de exemplo pelos dados reais. Nenhum componente precisa ser alterado.

export const profile = {
  name: 'ZeroOne Developers',
  slogan: 'Sites profissionais, feitos sob medida para o seu negócio.',
  // Texto curto acima do nome, no topo do site. Vazio = a linha não aparece.
  greeting: '',
  // Não aparecem na página: viram o título da aba e a descrição do site nas
  // buscas e nos compartilhamentos (veja src/layouts/BaseLayout.astro). Mantenha o título
  // com até ~60 caracteres e a descrição entre ~120 e 160.
  seoTitle: 'ZeroOne Developers | Criação de sites profissionais',
  tagline:
    'Criação de sites sob medida, landing pages, lojas virtuais e automações para negócios que querem ser encontrados no Google, passar confiança e vender mais.',

  // Caminho do logo em /public (ex.: '/logo.png'). Vazio = bloco com as iniciais.
  logo: '/logo.png',

  // Logo horizontal do cabeçalho, em /public. Vazio = iniciais + nome em texto.
  wordmark: '/logo.svg',

  // "Quem somos": um parágrafo por item.
  about: [
    'A ZeroOne Developers é um estúdio de criação de sites. Pegamos uma ideia, às vezes só um rascunho no papel, e transforma em um site bonito, rápido e pronto para receber clientes, no computador ou no celular.',
    'Atendemos desde o pequeno comércio do bairro até empresas que já estão crescendo, sempre com conversa direta e acompanhando cada etapa junto com o cliente.',
  ],

  // Missão, visão e valores, logo abaixo do "Quem somos". `id` escolhe o
  // ícone (missao, visao, valores). Use `text` para um parágrafo ou `items`
  // para uma lista. Array vazio = o bloco não aparece.
  pillars: [
    {
      id: 'missao',
      title: 'Missão',
      subtitle: 'O que fazemos',
      text: 'Criar sites e soluções digitais eficientes, que simplifiquem a rotina de quem nos contrata e ajudem o negócio a crescer por meio da tecnologia.',
    },
    {
      id: 'visao',
      title: 'Visão',
      subtitle: 'Onde queremos chegar',
      text: 'Ser reconhecidos por entregar soluções digitais confiáveis, modernas e acessíveis para empresas de diferentes segmentos.',
    },
    {
      id: 'valores',
      title: 'Valores',
      subtitle: 'Como trabalhamos',
      items: [
        { name: 'Transparência', text: 'Conversa clara sobre custos, prazos e limites.' },
        { name: 'Qualidade', text: 'Código organizado, seguro e feito para durar.' },
        { name: 'Compromisso', text: 'Responsabilidade com cada projeto entregue.' },
        { name: 'Evolução contínua', text: 'Sempre aprendendo e trazendo novas tecnologias.' },
      ],
    },
  ],

  // Números em destaque no "Sobre nós". Vazio = o bloco não aparece.
  // Exemplo: { value: '10+', label: 'projetos entregues' }.
  highlights: [],

  // Seção "Serviços": o que a empresa entrega ao cliente, na ordem exibida.
  services: [
    {
      title: 'Sites institucionais',
      description:
        'É o site da sua empresa, com algumas páginas como início, sobre, serviços e contato. O cliente encontra vocês no Google, conhece o negócio e fala com vocês pelo WhatsApp ou formulário.',
    },
    {
      title: 'Landing pages',
      description:
        'É uma página única, focada em um produto ou serviço. O visitante chega por um anúncio ou link, lê a oferta de cima a baixo e termina em um botão para comprar ou pedir orçamento.',
    },
    {
      title: 'E-commerce',
      description:
        'É a sua loja virtual. O cliente navega pelos produtos, coloca no carrinho e paga ali mesmo, por Pix, cartão ou boleto. Você acompanha os pedidos e o estoque por um painel simples.',
    },
    {
      title: 'Automações',
      description:
        'São ações que o computador faz sozinho por você. Por exemplo: quando alguém preenche um formulário, os dados vão para uma planilha e você recebe um aviso, sem precisar copiar nada.',
    },
    {
      title: 'Sistemas e integrações',
      description:
        'É um painel online onde a sua equipe cadastra pedidos, clientes e tarefas. Ele também se conecta a ferramentas que vocês já usam, como planilhas, e-mail ou WhatsApp, para tudo ficar num lugar só.',
    },
  ],

  // Seção "Depoimentos". Com o array vazio, a seção não aparece. Só os 6
  // primeiros são exibidos (coloque os mais novos no topo); os demais surgem
  // ao pesquisar pela empresa (`company`; sem ela, vale o nome do cliente).
  testimonials: [
    {
      quote:
        'Estou muito satisfeita com o trabalho de criação e montagem do site, que ficou excelente, profissional e alinhado às minhas expectativas. O atendimento foi atencioso, ágil e muito prestativo durante todo o processo. Recomendo de olhos fechados pela qualidade do serviço, profissionalismo e dedicação!',
      name: 'Fabiana Sgarbi',
      role: 'Proprietária',
      company: 'Fabiana Sgarbi Saúde e Beleza',
    },
    {
      quote:
        'A ZeroOne entendeu exatamente o que a gente precisava e transformou a nossa ideia em um site rápido, bonito e que passa confiança para os nossos clientes. O processo foi leve, com conversa direta e entregas no prazo. Ficamos muito satisfeitos e recomendamos!',
      name: 'Gabriel',
      role: 'Fundador',
      company: 'NexIU',
    },
  ],

  // Seção "Habilidades": uma coluna por grupo, na ordem exibida. Grupo com
  // `items` vazio não aparece.
  skillGroups: [
    {
      title: 'Front-end',
      items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    },
    {
      title: 'Back-end',
      items: ['Node.js', 'Express', 'PostgreSQL', 'APIs REST'],
    },
    {
      title: 'Ferramentas',
      items: ['Claude Code', 'Codex', 'v0', 'Google Stitch'],
    },
  ],

  contactText:
    'Tem um projeto em mente? Fale com a gente pelo WhatsApp ou pelas redes.',
  // Vazio = o e-mail não aparece no Contato nem nos dados de SEO.
  email: '',

  // `number`: DDI + DDD + número, só dígitos (Brasil começa com 55).
  // `message`: texto que já vem escrito na conversa. Com `number` vazio, o
  // botão e o ícone do WhatsApp não aparecem.
  whatsapp: {
    number: '5512981548193',
    message: 'Olá! Vim pelo site e gostaria de conversar sobre um projeto.',
  },

  // `id` aceita: github, linkedin. Outros valores usam um ícone genérico de link.
  socials: [{ id: 'github', label: 'GitHub', url: 'https://github.com/Knnyxz' }],

  // Usados nas meta tags de SEO e de compartilhamento, no robots.txt e no
  // sitemap.xml (veja src/pages/). Ao trocar de domínio, troque
  // `siteUrl` pelo novo endereço.
  siteUrl: 'https://zerone.dev.br',
  ogImage: '/og-image.png',
}
