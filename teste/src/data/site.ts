export const WHATSAPP_NUMBER = '5512997816761';
export const WHATSAPP_MESSAGE = 'Olá, Gabriel! Vim pelo site da NexIU e quero conversar sobre um projeto para minha empresa.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Processo', href: '#processo' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
] as const;

export const portfolio = [
  {
    name: 'ZeroOne Developers',
    category: 'Projeto próprio · Tecnologia',
    description: 'Site institucional com apresentação de serviços, projetos publicados e contato para um estúdio de desenvolvimento.',
    image: '/portfolio/zerone-20261118.png',
    url: 'https://zerone.dev.br/',
  },
  {
    name: 'Bruni Estética Automotiva',
    category: 'Estética automotiva',
    description: 'Serviços, trabalhos e contato direto em uma página para quem cuida do carro.',
    image: '/portfolio/bruni.webp',
    url: 'https://bruni.nexiu.dev/',
  },
  {
    name: 'Daniela Moraes Espaço de Beleza',
    category: 'Salão de beleza',
    description: 'Serviços organizados por área, trabalhos do salão e um caminho direto para pedir horário.',
    image: '/portfolio/daniela-20261015.webp',
    url: 'https://daniela.nexiu.dev/',
  },
  {
    name: 'Elisabete Freire Beauty',
    category: 'Beleza',
    description: 'Serviços de cílios, maquiagem e sobrancelhas com caminho direto para agendar.',
    image: '/portfolio/elisabete.webp',
    url: 'https://elisabete.nexiu.dev/',
  },
  {
    name: 'PerVoí',
    category: 'Cabelo e beleza',
    description: 'Fotografia e trabalhos em destaque para apresentar o salão e suas especialidades.',
    image: '/portfolio/pervoi.webp',
    url: 'https://pervoi.nexiu.dev/',
  },
] as const;

export const services = [
  {
    title: 'Sites institucionais',
    text: 'Sua empresa, seus serviços e um botão para o cliente chamar. Um site próprio, rápido e fácil de usar no celular.',
    href: '/criacao-de-sites/',
  },
  {
    title: 'Landing pages',
    text: 'Uma página para uma oferta: o que você vende, por que vale a pena e como comprar ou pedir orçamento.',
    href: '/landing-pages/',
  },
  {
    title: 'Automações',
    text: 'O formulário chega, a planilha atualiza, o aviso é enviado. A gente conecta essas etapas para você parar de repetir trabalho.',
    href: '/automacoes/',
  },
  {
    title: 'Sistemas e integrações',
    text: 'Pedidos, clientes e tarefas no mesmo painel. Criamos a ferramenta e conectamos os sistemas que sua empresa já usa.',
    href: '/sistemas-e-integracoes/',
  },
] as const;

export const steps = [
  { title: 'Você conta a ideia.', text: 'Manda uma referência ou mostra a tarefa que quer resolver. O Gabriel conversa com você.' },
  { title: 'A gente constrói.', text: 'Você recebe a proposta com valor e prazo, vê o visual e acompanha o desenvolvimento.' },
  { title: 'Testa. Ajusta. Publica.', text: 'Conferimos tudo com você antes de colocar o projeto em uso.' },
] as const;

export const faq = [
  {
    q: 'Preciso chegar com tudo pronto?',
    a: 'Não. Traga a ideia, uma referência ou o problema. A gente ajuda a definir o que precisa ser criado.',
  },
  {
    q: 'Quero só uma página. Vocês fazem?',
    a: 'Sim. Uma landing page reúne sua oferta e o contato em uma única tela de navegação.',
  },
  {
    q: 'E aquela tarefa que faço na planilha?',
    a: 'Mostre como você faz hoje. Podemos automatizar atualizações, avisos e a passagem de dados entre ferramentas.',
  },
] as const;
