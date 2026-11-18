#!/usr/bin/env bash
# Publica o site na VPS: gera o build, envia para uma pasta nova em
# /var/www/zerone/releases e troca o link `current` de uma vez (sem site
# quebrado no meio do envio). Guarda as 5 últimas versões para voltar atrás.
#
# Uso:   bash deploy/deploy.sh
# Host:  DEPLOY_HOST=usuario@ip bash deploy/deploy.sh  (padrão: o alias "nexiu" do ~/.ssh/config)
#
# Voltar para a versão anterior:
#   ssh nexiu 'cd /var/www/zerone && ln -sfn releases/<pasta> current'
set -euo pipefail

HOST="${DEPLOY_HOST:-nexiu}"
APP_DIR=/var/www/zerone
RELEASE="$(date +%Y%m%d-%H%M%S)"
KEEP=5

cd "$(dirname "$0")/.."

echo "› Build"
npm run build

echo "› Enviando para $HOST:$APP_DIR/releases/$RELEASE"
tar -czf - -C dist . | ssh "$HOST" "
  set -e
  mkdir -p $APP_DIR/releases/$RELEASE
  tar -xzf - -C $APP_DIR/releases/$RELEASE
  chmod -R u=rwX,go=rX $APP_DIR/releases/$RELEASE
  ln -sfn releases/$RELEASE $APP_DIR/current.tmp
  mv -Tf $APP_DIR/current.tmp $APP_DIR/current
  cd $APP_DIR/releases && ls -1t | tail -n +$((KEEP + 1)) | xargs -r rm -rf --
"

echo "✓ No ar: https://zerone.dev.br (versão $RELEASE)"
