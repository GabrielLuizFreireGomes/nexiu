// Para adicionar um projeto ao portfólio, acrescente um objeto no TOPO deste
// array. Só os 6 primeiros aparecem direto (destaques antes); os demais
// ficam ocultos e surgem ao pesquisar pelo nome da empresa ou filtrar.
//
// {
//   id: 'meu-site-exemplo',             // string única
//   title: 'Nome do projeto',
//   category: 'Site institucional',     // opcional; aparece acima da imagem
//   description: 'Resumo em 1 a 3 frases.',
//   tags: ['React', 'CSS', 'API'],      // tecnologias usadas (geram os filtros)
//   image: '/projects/meu-site.png',    // opcional; arquivo em public/projects/
//   liveUrl: 'https://exemplo.com',     // link do site no ar
//   featured: true,                     // opcional; destaca e prioriza
//   year: 2026,                         // opcional
//   caseStudy: {                        // opcional; aparece no detalhe
//     challenge: 'O problema do cliente.',
//     solution: 'O que construímos.',
//     result: 'O que mudou depois.',
//   },
// }

export const projects = [
  {
    id: 'nexiu',
    title: 'NexIU',
    category: 'Site institucional',
    description:
      'Site da NexIU, estúdio de criação de sites, landing pages e automações. Apresenta os serviços, os projetos publicados, o processo de trabalho e as dúvidas mais comuns, com contato direto pelo WhatsApp com quem desenvolve.',
    tags: ['Astro', 'CSS', 'JavaScript'],
    image: '/projects/nexiu.jpg',
    liveUrl: 'https://nexiu.dev/',
    featured: true,
    year: 2026,
  },
  {
    id: 'fabiana-sgarbi',
    title: 'Fabiana Sgarbi',
    category: 'Site institucional',
    description:
      'Site da Fabiana Sgarbi Saúde e Beleza, clínica de estética em São José dos Campos. Apresenta os tratamentos faciais, corporais, de estética avançada e harmonização, a profissional por trás do atendimento e o agendamento direto pelo WhatsApp.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/fabiana-sgarbi.jpg',
    liveUrl: 'https://fabiana-sgarbi-site.pages.dev/',
    featured: true,
    year: 2026,
  },
]
