# 🚀 Guia Completo de Deployment

Escolha a plataforma que melhor se adequa às suas necessidades.

## ⚡ Deployment Rápido (< 5 minutos)

### Opção 1: Netlify Drop (Mais Fácil)

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `steam/` para a página
3. Pronto! Seu site está online em segundos

**URL**: `seu-site.netlify.app`

### Opção 2: Vercel Deploy (Muito Rápido)

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. No diretório do projeto:
```bash
vercel
```

3. Siga as instruções no terminal

**URL**: `seu-projeto.vercel.app`

### Opção 3: GitHub Pages (Gratuito)

1. Crie um repositório chamado `seu-usuario.github.io`

2. Clone localmente:
```bash
git clone https://github.com/seu-usuario/seu-usuario.github.io.git
cd seu-usuario.github.io
```

3. Coloque os arquivos lá:
```bash
cp -r ~/steam/. ./
git add .
git commit -m "Adiciona landing page Steam Premium"
git push
```

4. Acessar em: `https://seu-usuario.github.io`

## 🌍 Domínio Personalizado

### Passo 1: Comprar um domínio

**Plataformas recomendadas**:
- Namecheap ($8.88/ano)
- GoDaddy ($11.95/ano)
- Registro.br (Brasil) (~R$40/ano)

### Passo 2: Apontar domínio para seu servidor

#### Se usar Netlify:

1. No painel Netlify, vá em **Domain Settings**
2. Clique em **Add custom domain**
3. Digite seu domínio
4. Siga as instruções de DNS

**Registros DNS típicos**:
```
Tipo: CNAME
Nome: www
Valor: seu-site.netlify.app
TTL: 3600
```

#### Se usar Vercel:

1. No painel Vercel, vá em **Settings > Domains**
2. Clique em **Add Domain**
3. Digite seu domínio
4. Copie os nameservers da Vercel

**Nameservers Vercel**:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Atualize no registrador do seu domínio.

## 📦 Deploy em Servidor Próprio

### Via SSH/FTP (Shared Hosting)

1. Conecte via SSH:
```bash
ssh seu-usuario@seu-servidor.com
cd public_html/steam-premium
```

2. Faça upload dos arquivos:
```bash
# Via FTP
ftp seu-usuario@seu-servidor.com
# Ou use FileZilla (GUI)
```

3. Configure permissões:
```bash
chmod 755 .
chmod 644 *.html *.css *.js
```

### Via VPS (Digital Ocean, Linode, etc.)

#### Node.js + Express

1. Instale Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Crie arquivo `server.js`:
```javascript
const express = require('express');
const app = express();

app.use(express.static('.'));

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
```

3. Instale e rode:
```bash
npm install express
node server.js
```

#### Nginx + Static Files

1. Instale Nginx:
```bash
sudo apt-get update
sudo apt-get install nginx
```

2. Configure `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80 default_server;
    server_name seu-dominio.com;

    root /var/www/steam-premium;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

3. Inicie Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🔐 HTTPS/SSL Obrigatório

### Let's Encrypt (Gratuito)

```bash
# Instale Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gere certificado
sudo certbot certonly --nginx -d seu-dominio.com

# Auto-renovação
sudo systemctl enable certbot.timer
```

### CloudFlare Free SSL

1. Adicione seu domínio no https://dash.cloudflare.com
2. Mude nameservers no registrador
3. SSL é automático e grátis!

## 🔄 CI/CD Automático

### GitHub Actions (Deploy automático)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.'
        production-deploy: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📊 Monitoramento Pós-Deploy

### 1. Verificar Performance

```bash
# Teste com curl
curl -o /dev/null -s -w "%{http_code}\n" https://seu-dominio.com

# Teste de LCP
npm install -g lighthouse
lighthouse https://seu-dominio.com
```

### 2. Google Search Console

1. Acesse https://search.google.com/search-console
2. Adicione sua propriedade
3. Valide a propriedade
4. Envie sitemap.xml

### 3. Google Analytics

Adicione ao seu `index.html` antes de `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXX');
</script>
```

## 🛠️ Troubleshooting

### Problema: Página branca ao abrir

**Solução**:
1. Verifique console (F12 > Console)
2. Verifique se todos os arquivos foram uploadados
3. Limpe cache (Ctrl+Shift+Delete)

### Problema: Imagens não aparecem

**Solução**:
1. Verifique URLs das imagens
2. Teste com URL completa: `https://...`
3. Se hospedado localmente, use caminhos relativos

### Problema: Vídeo YouTube não carrega

**Solução**:
1. Verifique ID do vídeo
2. Teste em modo anônimo (sem cache)
3. Verifique permissões de embed do vídeo

### Problema: Contador regressivo não funciona

**Solução**:
1. Abra console (F12) e verifique erros
2. Certifique-se que JavaScript está habilitado
3. Cheque permissões do relógio do servidor

## 📈 Otimizações Depois do Deploy

### 1. Minificar e Comprimir

```bash
# Ativar gzip no Nginx
gzip on;
gzip_types text/html text/css text/javascript application/javascript;

# Minificar CSS/JS (veja OPTIMIZATION.md)
npm run minify-css
npm run minify-js
```

### 2. Cache Busting

Adicione hash aos arquivos:
```html
<link rel="stylesheet" href="styles.css?v=1.0.0">
<script src="script.js?v=1.0.0"></script>
```

### 3. CDN para Imagens

Se usar muitas imagens:
- CloudFlare Images
- AWS CloudFront
- Bunny CDN

## 🔄 Atualizações Futuras

### Como fazer update depois do deploy:

**Netlify/Vercel**:
```bash
git add .
git commit -m "Meu update"
git push
# Deploy automático!
```

**FTP**:
1. Edite arquivos localmente
2. Re-faça upload via FTP
3. Limpe cache página

**VPS**:
```bash
git pull
# ou re-upload via SCP
```

## 📋 Checklist Final

- [ ] Todos os 3 arquivos (HTML, CSS, JS) foram uploadados
- [ ] Links do CTA estão corretos
- [ ] Imagens carregam corretamente
- [ ] Vídeo YouTube funciona
- [ ] Responsive funciona em mobile
- [ ] Countdown está funcionando
- [ ] Contador de usuários ativos funciona
- [ ] HTTPS está ativado
- [ ] Google Search Console configurado
- [ ] Google Analytics adicionado
- [ ] Domínio aponta corretamente
- [ ] Teste de performance passou
- [ ] Corrigiu erros encontrados

## 💡 Dicas de Produção

1. **Sempre use HTTPS** - Aumenta segurança e SEO
2. **Cache agressivo** - Configure headers de cache
3. **Monitor 24/7** - Use serviço como UptimeRobot
4. **Backups regulares** - Backup semanal dos arquivos
5. **Logs de erro** - Configure alertas para erros
6. **CDN global** - Para mais velocidade em múltiplas regiões

## 🎉 Pronto para Deploy!

Escolha uma das opções acima e sua landing page estará online em minutos!

**Recomendado para iniciantes**: Netlify Drop
**Recomendado para produção**: Vercel + Seu domínio + CloudFlare
**Recomendado para controle total**: VPS + Nginx + Let's Encrypt

---

**Perguntas?** Consulte a documentação oficial das plataformas ou o arquivo OPTIMIZATION.md.

**Sucesso com sua landing page! 🚀**
