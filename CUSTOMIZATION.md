# 🎨 Guia Rápido de Personalização

Use este guia para personalizar rapidamente a landing page com seus dados.

## 🔄 Alterações Rápidas Mais Comuns

### 1. Alterar Link do CTA Principal

**Arquivo**: `index.html`

Encontre TODAS as ocorrências de:
```
https://pay.cakto.com.br/34um9bm_587463?affiliate=VKbRTaaj
```

E substitua pelo seu link de afiliado:
```html
<!-- Exemplo -->
<a href="SEU_NOVO_LINK_AQUI">QUERO ACESSAR AGORA</a>
```

**Aonde aparecem**:
- Navbar (linha ~42)
- Hero Section (linha ~63)
- Urgency Section (linha ~330)

### 2. Mudar Cores da Página

**Arquivo**: `styles.css`

Localize as variáveis CSS no início do arquivo (linhas 1-20):

```css
:root {
    --primary: #00d9ff;           /* Azul Neon - MUDE AQUI */
    --secondary: #00ff88;          /* Verde Neon - MUDE AQUI */
    --accent: #ff006e;            /* Rosa/Magenta - MUDE AQUI */
    --dark-bg: #0b0f17;          /* Fundo escuro - MUDE AQUI */
}
```

**Exemplo**: Para usar cores do Razer:
```css
--primary: #00ff41;     /* Verde Razer */
--secondary: #00d9ff;   /* Ciano */
--accent: #ff3333;      /* Vermelho vibrante */
```

### 3. Alterar Textos Principais

**Arquivo**: `index.html`

```html
<!-- Linha ~59: Título Principal -->
<h1 class="hero-title">
    SEU NOVO TÍTULO AQUI
    <span class="gradient-text">SEGUNDA PARTE AQUI</span>
</h1>

<!-- Linha ~68: Subtítulo -->
<p class="hero-subtitle">
    Seu novo subtítulo aqui
</p>

<!-- Linha ~72: Texto Emocional -->
<p class="hero-emotion">
    Seu novo texto emocional aqui
</p>
```

### 4. Retirar ou Adicionar Benefícios

**Arquivo**: `index.html` (linhas ~177-243)

Para **remover** um benefício, delete este bloco inteiro:
```html
<div class="benefit-card">
    <div class="benefit-icon">🛡️</div>
    <h3>Sem Risco de Banimento</h3>
    <p>Método 100% seguro e verificado pela comunidade.</p>
</div>
```

Para **adicionar** um novo, copie o bloco acima e edite:
```html
<div class="benefit-card">
    <div class="benefit-icon">✨</div>
    <h3>Seu novo benefício</h3>
    <p>Descrição do seu novo benefício aqui</p>
</div>
```

### 5. Alterar Vídeo YouTube

**Arquivo**: `index.html` (linha ~131)

Encontre:
```html
<iframe src="https://www.youtube.com/embed/mFr7t1AoYq0?si=_LxxocKUDijpRhOG&...">
```

E substitua `mFr7t1AoYq0` pelo ID do seu vídeo:
```html
<!-- Para o vídeo: https://youtu.be/ABC123DEF456 -->
<iframe src="https://www.youtube.com/embed/ABC123DEF456?...">
```

### 6. Adicionar Suas Imagens de Feedback

**Arquivo**: `index.html` (linhas ~267-285)

Substitua as URLs:
```html
<!-- De: -->
<img src="https://steampremium.netlify.app/assets/feedback-01-DcGzbI_E.jpg">

<!-- Para: -->
<img src="https://seu-dominio.com/imagens/feedback-1.jpg">
```

### 7. Alterar Contagem Regressiva

**Arquivo**: `script.js` (linha ~7)

A data é calculada dinamicamente (23 dias + 14 horas + 37 minutos + 29 segundos).

Para **definir uma data específica** (Recomendado):
```javascript
// Altere para a data do seu evento
const countdownDate = new Date('2026-06-20T23:59:59').getTime();
```

### 8. Mudar Número de Usuários Ativos

**Arquivo**: `script.js` (linha ~30)

```javascript
const endValue = 143;  /* MUDE ESTE NÚMERO */

// Para 500 usuários:
const endValue = 500;
```

## 💻 Ferramentas Úteis para Personalização

### 1. Gerador de Cores
- https://coolors.co
- https://www.colorhexa.com
- https://chir.es

### 2. Editor de Imagens Online
- https://pixlr.com
- https://photopea.com
- https://canva.com

### 3. Verificar Cores
- https://contrast-ratio.com (contraste)
- https://www.colorblindnessassistant.com (daltonismo)

### 4. Converter URL YouTube para ID
Se você tem: `https://youtu.be/ABC123DEF`
O ID é: `ABC123DEF`

## 🔧 Mudanças Mais Avançadas

### Adicionar Novo Jogo no Carrossel

**Arquivo**: `index.html` (linhas ~152-215)

Copie este bloco:
```html
<div class="carousel-item">
    <img src="https://steampremium.netlify.app/assets/game-gta.jpg" alt="GTA V">
</div>
```

E mude para seu jogo:
```html
<div class="carousel-item">
    <img src="https://seu-dominio.com/meu-jogo.jpg" alt="Seu Jogo">
</div>
```

### Alterar Taxa de Scroll do Carrossel

**Arquivo**: `styles.css` (linha ~526)

```css
@keyframes scroll {
    /* Altere de 40s para velocidade desejada */
    animation: scroll 60s linear infinite; /* Mais lento */
    animation: scroll 30s linear infinite; /* Mais rápido */
}
```

### Mudar Velocidade das Animações

**Arquivo**: `styles.css` (linha ~6)

```css
--transition: all 0.3s cubic-bezier(...);
/* Mude 0.3s para:
   0.1s = Muito rápido
   0.3s = Rápido (padrão)
   0.6s = Médio
   1s = Lento
*/
```

### Desabilitar Efeito Mouse Glow

**Arquivo**: `script.js` (linha ~192)

Encontre:
```javascript
if (window.innerWidth > 768) {
    document.body.appendChild(canvas);
    // ...
}
```

Substitua por:
```javascript
if (false) {  // Desabilita o efeito
    document.body.appendChild(canvas);
    // ...
}
```

### Remover Countdown Timer

**Arquivo**: `index.html`

Remova toda esta seção (linhas ~292-313):
```html
<div class="countdown">
    <!-- REMOVA TUDO AQUI -->
</div>
```

**E em**: `script.js` (linha ~1)

Comente ou remova:
```javascript
// startCountdown();  // Comentado
```

## 🎯 Personalização por Indústria

### Para E-commerce

Mude para tons de ouro/branco:
```css
--primary: #ffd700;     /* Ouro */
--secondary: #ffed4e;   /* Ouro claro */
--accent: #ff6b6b;      /* Vermelho */
```

### Para SaaS/Produtividade

Use azuis corporativos:
```css
--primary: #0066ff;     /* Azul corporativo */
--secondary: #00ccff;   /* Ciano */
--accent: #ff0088;      /* Magenta */
```

### Para Fitness/Wellness

Use cores vibrantes:
```css
--primary: #ff6b35;     /* Laranja */
--secondary: #00ff88;   /* Verde neon */
--accent: #ff0077;      /* Rosa */
```

## 📋 Checklist de Personalização

Depois de fazer suas mudanças:

- [ ] Alterar link do CTA
- [ ] Mudar cores principais
- [ ] Editar textos do hero
- [ ] Adicionar link de vídeo YouTube
- [ ] Substituir imagens de feedback
- [ ] Ajustar countdown date
- [ ] Testar em mobile
- [ ] Testar em diferentes navegadores
- [ ] Verificar todos os links
- [ ] Validar HTML (https://validator.w3.org)

## 🆘 Precisa de Ajuda?

Se cometer algum erro durante a edição:

1. **Desfazer mudanças** no VS Code:
   - Ctrl+Z (Windows/Linux)
   - Cmd+Z (Mac)

2. **Ver diferenças** no Git:
   ```bash
   git diff nome-arquivo.html
   ```

3. **Reverter arquivo**:
   ```bash
   git checkout nome-arquivo.html
   ```

## 📱 Testar Responsividade

Após fazer mudanças:

1. Abra em Chrome: `F12` ou `Cmd+Option+I`
2. Clique em dispositivo mobile (canto superior esquerdo)
3. Teste em diferentes tamanhos:
   - iPhone 12: 390x844
   - iPad: 768x1024
   - Desktop: 1920x1080

## 🚀 Deploy com suas Mudanças

Após finalizar:

```bash
# Se usar Git
git add .
git commit -m "Personalizei a landing page"
git push

# Se usar FTP
# Faça upload dos arquivos alterados via FTP
```

---

**💡 Dica**: Use o `config.json` para guardar todos os seus dados em um único lugar!

Exemplo:
```json
{
  "links": {
    "cta_primary": "SEU_LINK_AQUI"
  },
  "colors": {
    "primary": "#sua_cor_aqui"
  }
}
```

**Tudo pronto para personalizar!** 🎉
