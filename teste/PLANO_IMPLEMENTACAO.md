# NexIU — direção e implementação

## Briefing confirmado

- Site curto, direto e bonito, com efeitos que demonstrem tecnologia e profissionalismo.
- Preservar a identidade e o movimento da versão original; retirar conteúdo repetitivo ou sem material real.
- Conversão principal: conversa no WhatsApp com o Gabriel.
- Domínio principal: `https://nexiu.dev/`.

## Estrutura

- Home: oferta → quatro serviços com exemplos concretos → portfólio publicado → processo em três etapas → três respostas visíveis → contato.
- Portfólio reúne Bruni Estética Automotiva, Daniela Moraes Espaço de Beleza, Elisabete Freire Beauty e PerVoí. A Daniela substituiu a Design18k por decisão do usuário em 09/10/2026.
- Desde 15/10/2026, os quatro cards apontam para `bruni.nexiu.dev`, `daniela.nexiu.dev`, `elisabete.nexiu.dev` e `pervoi.nexiu.dev`. As prévias em `public/portfolio/` são capturas estáticas convertidas para WebP. A imagem da Daniela foi renovada em `daniela-20261015.webp`. Atualizar a landing no GitHub Pages não renova automaticamente nem a miniatura nem a cópia servida na VPS.
- Quatro páginas específicas para busca: sites, landing pages, automações, sistemas e integrações. Cada uma tem título, descrição, H1 e conteúdo próprios. Seus links ficam no rodapé; a explicação e o contato dos serviços acontecem na própria home.
- Sem fotografias ou cases na pasta. Nenhum depoimento, número, preço ou projeto foi inventado.

## Direção visual e movimento

- Paleta original clara, preta e vermelha; wordmark NexIU e tipografia Archivo Variable.
- Mantidos: abertura curta da marca, títulos cinéticos, letreiro que reage ao scroll, cursor interativo em dispositivos com mouse, hover dos serviços, barra de progresso e menu lateral animado. As máscaras dos títulos são removidas ao terminar a animação, preservando as letras inteiras.
- Processo agora cabe em uma seção, sem prender a rolagem. O ritmo vertical e a altura das seções foram reduzidos.
- Telefone: leitura em coluna, botões acessíveis por toque e efeitos reduzidos conforme `prefers-reduced-motion`.

## SEO e descoberta

- HTML estático com conteúdo legível sem JavaScript, links internos, canonical, metadados sociais, sitemap e robots.txt.
- Dados estruturados `WebSite` e `Organization` na home; páginas específicas declaram `Service` e `BreadcrumbList` com fatos confirmados.
- Favicon quadrado legível em tamanho pequeno e imagem de compartilhamento com a marca completa.
- `llms.txt` oferece um resumo opcional para sistemas que o utilizem. O Google não usa esse arquivo como sinal de classificação; a descoberta depende de HTML acessível, links e rastreamento real.

## Publicação e validação

- Publicado em 15/10/2026 na VPS `194.61.238.81`, em `/var/www/nexiu/current` (release `20261015-portfolio-subdomains`). As releases anteriores foram preservadas para eventual reversão.
- Cada landing está em `/var/www/nexiu/portfolio-sites/<nome>/current`, com release `20261015`; os quatro builds somam cerca de 5 MB. O build de cada repositório usa `SITE_URL=https://<nome>.nexiu.dev` e `SITE_BASE=/`. O domínio público `https://nexiu.dev/#portfolio` mostra a nova miniatura da Daniela e links para os quatro subdomínios. A URL temporária `/projetos/daniela-moraes/` redireciona 301 para `https://daniela.nexiu.dev/`.
- Nginx dos subdomínios: `deploy/portfolio-subdomains.nginx`; HTTPS por certificado Let's Encrypt `portfolio.nexiu.dev` cobrindo os quatro nomes, válido até 13/01/2027. Renovação simulada com sucesso após ativar o proxy da Cloudflare; hook em `deploy/reload-nginx-after-renewal.sh` recarrega Nginx após renovação. Os quatro registros A na Cloudflare estão em **Proxied** para a VPS e o modo SSL/TLS foi confirmado como **Full (strict)**.
- Verificados HTTP 200 via Cloudflare com TLS válido para as quatro homepages e imagens principais; `https://nexiu.dev/` contém os quatro links finais. Daniela foi aberta no navegador em `daniela.nexiu.dev` sem o aviso de URL parecida. O aviso anterior era compatível com a heurística do Chrome para endereços semelhantes (`nexiu-dev.github.io` e `nexiu.dev`), não uma confirmação de invasão.
- Nginx: `/etc/nginx/sites-available/nexiu`, com configuração versionada em `deploy/nexiu.nginx`.
- Certbot: certificado para `nexiu.dev` e `www.nexiu.dev`, válido até 06/01/2027. Renovação automática ativa e `certbot renew --dry-run --cert-name nexiu.dev` aprovado antes e depois de ativar o proxy da Cloudflare.
- Conferidos: HTTPS 200 na home e nas quatro páginas de serviço, redirecionamentos 301 de HTTP e `www` para `https://nexiu.dev/`, sitemap, robots, `llms.txt`, card social e resposta 404 para URL inexistente.
- Cloudflare: registros A `@` e CNAME `www` em **Proxied** (nuvem laranja). Respostas públicas da Cloudflare para home, `www`, sitemap, robots e `llms.txt` conferidas em 08/10/2026.
- Google Search Console: propriedade `nexiu.dev` verificada e `https://nexiu.dev/sitemap.xml` enviado em 08/10/2026. O relatório inicial mostrou "Não foi possível ler o sitemap" e 0 páginas; o arquivo público respondeu 200 pela Cloudflare e passou em validação XML com 5 URLs. Acompanhar o processamento no Search Console e usar "Testar URL publicada" se o erro persistir.
- Desempenho real e indexação dependem de dados após a publicação; não há garantia de posição no Google ou de citação por assistentes de IA.


## Atualização de contato — 18/11/2026

- Gabriel confirmou que é o responsável pelo atendimento e autorizou a troca das referências ao Marcos.
- WhatsApp confirmado: +55 12 99781-6761 (5512997816761). Troca na home, páginas de serviço, mensagem inicial, dados estruturados e llms.txt.
- Ajuste pontual: preservar direção visual, serviços e portfólio. Verificar build e todos os destinos de WhatsApp antes e depois de publicar. Release anterior preservada para reversão.


## Portfólio ZeroOne — 18/11/2026

- Gabriel confirmou que https://zerone.dev.br também é seu e autorizou incluí-lo no portfólio e adicionar crédito de autoria NexIU no site ZeroOne.
- Adicionado card ZeroOne Developers, identificado como projeto próprio de tecnologia, com captura real da primeira tela e link para o domínio publicado. Introdução do portfólio ajustada para incluir tecnologia.
- Rodapé da ZeroOne recebe link visível Desenvolvido pela NexIU para https://nexiu.dev/. Sem promessa de ganho de posição; sem alteração dos contatos da ZeroOne.
- Validar ambos os builds, lint da ZeroOne, imagens, navegação e apresentação móvel/desktop. Publicar em releases separadas, preservando as versões anteriores.
