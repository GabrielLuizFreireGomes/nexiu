# Daniela Moraes Espaço de Beleza

- **Código:** `C:\Users\Gabriel\Desktop\nexiu\DanielaMoraesEspacoDeBeleza`
- **Repositório:** https://github.com/NexIU-Dev/DanielaMoraesEspacoDeBeleza
- **Página:** https://nexiu-dev.github.io/DanielaMoraesEspacoDeBeleza/
- **Portfólio NexIU:** https://daniela.nexiu.dev/ (ativo desde 15/10/2026). O caminho temporário `https://nexiu.dev/projetos/daniela-moraes/` redireciona para esse endereço.
- **Plano local:** `PLANO_IMPLEMENTACAO.md`
- **Pesquisa e origens:** `pesquisa/FONTES_E_DIRECAO.md`

## Decisões aprovadas e limites

- **Preservar a foto principal de Daniela**, `public/images/daniela-retrato.webp`. O usuário a considera única e perfeita. Não substituir nem transformar sem novo pedido explícito. Manter a composição aprovada da abertura em ajustes pontuais.
- A identidade combina marfim, rosa da marca, vinho e verde escuro das fotos. Monograma e linha desenhada são detalhes próprios, não um logo novo.
- Newsreader é a fonte de título; Manrope, a de texto e controles. Os ícones de interface são SVGs leves; não usar Unicode como ícone.
- O CTA principal pede horário no WhatsApp. Cada serviço envia uma mensagem contextual. Confirmar destinos reais antes de alterar.
- Serviços usam menu de largura inteira com imagem na área aberta; esse formato foi escolhido após comparação com outros projetos da pasta.
- A avaliação informada é 5,0 em 117 avaliações no Google. Não criar depoimentos ou números extras.
- O ticket médio real é desconhecido. Qualquer análise comercial deve declarar cenários e premissas.
- O usuário aprovou a composição final de endereço, horários e contato; preservar sua estrutura nas revisões pontuais.
- Retirar o link secundário genérico “Ver todos os serviços” da abertura. A legenda do trabalho de unhas fica apenas “manicure”, sem descrição do visual evidente da foto.
- A marca original deve aparecer em escala legível no cabeçalho e na seção de assinatura, e ser usada no favicon. O arquivo `marca-original.webp` estava desfocado e tinha uma faixa cinza na borda esquerda. Em 2026-10-09 o usuário **aprovou a segunda prévia restaurada**; `marca-restaurada.png` passou a ser usada no cabeçalho, na seção de assinatura, no favicon e no ícone da tela inicial. Preservar o original como referência, pois a IA pode ter reinterpretado sutilmente curvas finas. O retrato principal continua intocado.
- O CTA usa `BookingButton.astro` com texto “Pedir horário” e identificação do WhatsApp; o ícone é SVG da marca WhatsApp. Os serviços são listados em linhas, sem chips.
- A prévia do portfólio foi atualizada em 15/10/2026 para `daniela-20261015.webp`; é uma captura estática. A publicação sob `daniela.nexiu.dev` evita que o card leve ao endereço GitHub Pages parecido com o domínio principal, apontado pelo usuário como origem de um aviso do Chrome. A nova URL foi aberta no navegador sem o alerta. O build aceita `SITE_URL` e `SITE_BASE` para preservar o GitHub Pages e gerar a variante no domínio próprio. Alterações futuras feitas só no Pages não atualizam automaticamente a versão da VPS nem a miniatura da NexIU.

## Próximas revisões

Ler [[Landing Pages/Registro de Feedback]] e o plano local antes de editar. Registrar aqui decisões específicas desta página e atualizar o plano quando a composição, texto, CTA ou conteúdo aprovado mudar. Registrar regras reutilizáveis em [[Landing Pages/Padrões Aprendidos]] e no prompt da skill.
