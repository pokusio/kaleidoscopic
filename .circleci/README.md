# Secrets initialization


```bash
secrethub org init --name=pokusio --description="organization for all https://pok-us.io applicationsand components"
secrethub repo init pokusio/kaleidoscopic
export QUAY_SECRETS_FOLDER_DEV=pokusio/kaleidoscopic/dev/quay/bot
secrethub mkdir --parents "${QUAY_SECRETS_FOLDER_DEV}"
export QUAY_BOT_USERNAME="pok-us-io+pokusbot"
export QUAY_BOT_TOKEN="inyourdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreamsdreams"
echo "${QUAY_BOT_USERNAME}" | secrethub write "${QUAY_SECRETS_FOLDER_DEV}/username"
echo "${QUAY_BOT_TOKEN}" | secrethub write "${QUAY_SECRETS_FOLDER_DEV}/token"

# check reads
export QUAY_BOT_USERNAME=$(secrethub read "${QUAY_SECRETS_FOLDER_DEV}/username")
export QUAY_BOT_TOKEN=$(secrethub read "${QUAY_SECRETS_FOLDER_DEV}/token")

echo "QUAY_BOT_USERNAME=${QUAY_BOT_USERNAME}"
echo "QUAY_BOT_TOKEN=${QUAY_BOT_TOKEN}"

# Create the secrethub service account with read permissions on repoholding the quay secrets

secrethub service init --permission=read --description="bot used in the circle ci pipeline for the https://github.com/pokusio/kaleidoscopic experimental app" --out-file ./kaleidoscopic.secrethub.bot.token "pokusio/kaleidoscopic"
cat ./kaleidoscopic.secrethub.bot.token

# ---
# And finally create a "kaleidoscopic" context for the [pokusio] Circle CI organization, and a SECRETHUB_CREDENTIAL env.varwith the value of that token
