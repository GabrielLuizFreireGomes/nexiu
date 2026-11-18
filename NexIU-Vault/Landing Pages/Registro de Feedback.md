# Registro de feedback

Uma entrada por rodada pode agrupar pedidos relacionados. Em cada nova rodada, registrar: **data · projeto · observação do usuário · decisão e alcance · verificação**. Toda crítica e todo pedido de preservação entram aqui, mesmo que a solução literal não seja adotada. Regras gerais também entram em [[Padrões Aprendidos]] e no prompt operacional; escolhas locais entram na nota do projeto.

As datas da tabela indicam quando o feedback foi registrado neste vault; os pedidos anteriores podem ter ocorrido antes.

## Histórico incorporado ao criar o vault

| Data | Projeto | Feedback do usuário | Decisão e alcance | Verificação |
| --- | --- | --- | --- | --- |
| 2026-10-09 | Daniela Moraes | Gostou de Maison Lune, mas pediu uma estética absurdamente única, com características da Daniela e efeitos em Astro. | Direção própria baseada no monograma, retrato, endereço 474 e fotos reais. Movimento deve servir à composição. Regra geral: não reutilizar a estética da referência como template. | Página atual revisada no navegador. |
| 2026-10-09 | Daniela Moraes | Textos, redirecionadores e títulos pareciam genéricos; pediu CTA de WhatsApp. | Copy com serviços e endereço concretos; CTAs de WhatsApp gerais e por serviço com mensagens específicas. Regra geral de copy e destino real. | Links e textos conferidos na página. |
| 2026-10-09 | Daniela Moraes | Pediu fontes melhores. | Newsreader nos títulos e Manrope em conteúdo/controles, revisadas no layout desktop e mobile. Regra geral: julgar tipografia na página real. | Capturas e responsividade revisadas. |
| 2026-10-09 | Daniela Moraes | Botões, fontes e ícones pareciam padrão; glifos Unicode ficam ruins no iPhone; pediu SVG leve e bonito. | Botões com hierarquia própria e ícones SVG; proibição de Unicode como ícone de interface incorporada ao prompt. | Busca no código sem ícones Unicode de interface; revisão mobile. |
| 2026-10-09 | Daniela Moraes | Pediu comparação com todos os projetos em `Desktop\nexiu` para não parecer template. | Comparados Bruni, Design18k, Elisabete, PerVoí e NexIU; serviço passou para menu de largura inteira com foto na área aberta. Regra geral de comparação do portfólio. | Desktop e celular revisados; painel e imagem conferidos. |
| 2026-10-09 | Daniela Moraes | Determinou que a foto principal não fosse trocada; ela está perfeita. | `daniela-retrato.webp` e composição da capa preservados. Restrição **específica deste projeto**. | Foto principal conferida na página publicada. |
| 2026-10-09 | Daniela Moraes | Ticket médio real desconhecido; autorizou estimativa por cenários para análise comercial. | Usar premissas e faixas declaradas, sem apresentar valor como dado da Daniela. Regra geral de análise com dado ausente. | Decisão registrada; qualquer nova estimativa exige fontes e premissas da análise. |
| 2026-10-09 | Processo NexIU | Pediu avaliar todas as alterações, gerir os `.md` que orientam as páginas, incorporar todas as reclamações e criar um vault no Obsidian. | Criado o vault; skill e prompt agora exigem registro de cada rodada, classificação do alcance e atualização dos documentos pertinentes. | Frontmatter, arquivos do vault e JSON conferidos manualmente. |
| Histórico anterior, sem data precisa | Elisabete Freire Beauty | Versões anteriores pareceram duras, genéricas ou com cara de IA; fonte, slogans, foto sobreposta, favicon de iniciais, origem repetida das fotos e CTAs impessoais foram rejeitados. | Critérios gerais de copy, tipografia, composição e autenticidade incorporados ao prompt; detalhes da Elisabete permanecem na referência específica da skill. | Registro de projeto existente na skill. |

## Próxima entrada

### 2026-10-09 · Daniela Moraes · revisão de componentes e marca

- **Observação do usuário:** botões genéricos; logo pequena e ilegível; ícone do WhatsApp com defeito; chips de serviço ruins; legenda “manicure em rosa claro” e depois “manicure com pequenos corações” narrava o óbvio; link “Ver todos os serviços” repetia outras páginas; pediu a marca como favicon. A seção final de localização foi elogiada e deve ser preservada. Uma linha estranha ao lado da logo também foi apontada.
- **Decisão e alcance:** componente de agendamento próprio com hierarquia de texto, ícone SVG fiel do WhatsApp e traço da marca; serviços em lista editorial; legenda reduzida a “manicure”; link secundário removido da abertura; logo original ampliada no cabeçalho e na apresentação e vinculada como favicon. Faixa cinza da borda do arquivo foi ocultada com recorte CSS. Preservadas foto principal e composição final. Regras gerais de legenda informativa, revisão de CTAs repetidos e inspeção de qualidade da marca foram incorporadas ao prompt.
- **Arquivos atualizados:** `src/components/BookingButton.astro`, `src/components/Icon.astro`, `src/pages/index.astro`, `src/styles/global.css`, plano local, nota do projeto, prompt e padrões.
- **Verificação:** Astro check, build e revisão visual local em telefone e desktop; recorte da faixa e leitura dos serviços revisados em telefone.

### 2026-10-09 · Daniela Moraes · qualidade da logo

- **Observação do usuário:** a imagem da marca ampliada está com qualidade ruim e prejudica o site; pediu tentativa de melhoria sem perda de detalhes, prévia para aprovação antes de aplicá-la e indicação de ferramenta manual se necessário.
- **Decisão e alcance:** duas restaurações candidatas foram geradas em arquivos separados, com o original intacto. A versão mais conservadora foi apresentada como prévia. Como a geração pode reinterpretar detalhes do monograma, nenhuma candidata foi aplicada ao site; aguardar aprovação explícita para substituir. Para fidelidade absoluta, solicitar o vetor original ou recomendar reconstrução manual no Inkscape.
- **Arquivos atualizados:** prévias em `C:\Users\Gabriel\.codex\generated_images\01a11ce8-6fb3-70f1-8dd4-d1d1af1cbb0b`; nota do projeto, plano local, prompt e padrões.
- **Verificação:** textos “DANIELA MORAES” e “ESPAÇO DE BELEZA” conferidos visualmente nas prévias; diferenças sutis nos traços centrais exigem aprovação humana.

### 2026-10-09 · Daniela Moraes · aprovação da restauração

- **Observação do usuário:** aprovou a versão restaurada mostrada na rodada anterior.
- **Decisão e alcance:** a segunda prévia foi copiada para `public/images/marca-restaurada.png` e aplicada no cabeçalho, na seção de assinatura, no favicon e no ícone da tela inicial. O arquivo `marca-original.webp` e a foto principal de Daniela foram preservados.
- **Arquivos atualizados:** imagem restaurada, `src/pages/index.astro`, `src/styles/global.css`, plano local e nota deste projeto. Nenhuma regra geral adicional foi necessária.
- **Verificação:** logo e favicon conferidos no navegador local em telefone e desktop; `astro check` e build executados após a troca.

### 2026-10-15 · Portfólio NexIU · atualização da Daniela e domínio dos projetos

- **Observação do usuário:** a Daniela mudou e precisava de uma prévia atualizada no portfólio. Ao abrir o card no endereço GitHub Pages, o Chrome às vezes mostrava “Você quis dizer nexiu” e explicava que infratores imitam endereços. O usuário pediu corrigir o acesso e depois decidiu publicar todas as quatro páginas do portfólio em subdomínios próprios; perguntou se isso pesaria muito no servidor.
- **Decisão e alcance:** a miniatura da Daniela foi recapturada e versionada como `daniela-20261015.webp`. Bruni, Daniela, Elisabete e PerVoí receberam builds estáticos com canonical e assets nos subdomínios `bruni`, `daniela`, `elisabete` e `pervoi.nexiu.dev`. Os quatro somam cerca de 5 MB e foram publicados na VPS com Nginx, DNS Cloudflare proxied e certificado Let's Encrypt. Os cards foram atualizados. O caminho temporário da Daniela no domínio principal redireciona para o novo endereço. O alerta descrito corresponde à heurística documentada do Chrome para URL semelhante; não foi tratado como prova de invasão. Regra reutilizável de conferir o destino do card, HTTPS, canonical e captura estática entrou no prompt e nos padrões.
- **Arquivos atualizados:** `teste/src/data/site.ts`, `teste/public/portfolio/daniela-20261015.webp`, configurações Astro e metadados das landings, `teste/deploy/`, planos locais, nota da Daniela, prompt e padrões.
- **Verificação:** checks/builds de publicação, Nginx validado, quatro homepages e imagens principais responderam 200 via Cloudflare com TLS válido; renovação do certificado simulada com sucesso. O portfólio e `daniela.nexiu.dev` foram abertos no navegador, com nova miniatura visível e sem o intersticial relatado. As miniaturas e as cópias da VPS não se atualizam automaticamente quando o GitHub Pages muda.

### AAAA-MM-DD · Projeto

- **Observação do usuário:**
- **Decisão e alcance:** regra geral / preferência recorrente / escolha deste projeto / sugestão não adotada literalmente (com motivo).
- **Arquivos atualizados:**
- **Verificação:**
