#!/bin/bash
# ==============================================================
# UCSG Website - Cloudflare DNS Setup Script
# ==============================================================
# This script updates Cloudflare DNS records to point your
# custom domain (universalconsultingservices.com) to Vercel.
#
# PREREQUISITES:
#   1. Create a Cloudflare API Token with these permissions:
#      - Zone > DNS > Edit
#      - Zone > Zone > Read
#   2. Go to: https://dash.cloudflare.com/profile/api-tokens
#      Click "Create Token" → Use "Edit zone DNS" template
#
# USAGE:
#   chmod +x setup-cloudflare-dns.sh
#   ./setup-cloudflare-dns.sh YOUR_CLOUDFLARE_API_TOKEN
# ==============================================================

set -e

TOKEN="$1"
DOMAIN="universalconsultingservices.com"

if [ -z "$TOKEN" ]; then
  echo ""
  echo "❌ ERROR: Cloudflare API token required"
  echo ""
  echo "Usage: $0 YOUR_CLOUDFLARE_API_TOKEN"
  echo ""
  echo "Get a token at: https://dash.cloudflare.com/profile/api-tokens"
  echo "Use the 'Edit zone DNS' template"
  echo ""
  exit 1
fi

echo "🔍 Looking up Cloudflare zone for $DOMAIN..."
ZONE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN")

ZONE_ID=$(echo "$ZONE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])" 2>/dev/null)

if [ -z "$ZONE_ID" ]; then
  echo "❌ ERROR: Could not find zone. Check your API token permissions."
  echo "   Response: $(echo $ZONE_RESPONSE | head -100)"
  exit 1
fi

echo "✅ Zone found: $ZONE_ID"

# Get existing DNS records
echo "📋 Fetching existing DNS records..."
RECORDS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records")

# Delete old A and CNAME records that conflict
for RECORD_ID in $(echo "$RECORDS_RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for r in data.get('result', []):
    if r['type'] in ('A', 'AAAA', 'CNAME'):
        print(r['id'])
" 2>/dev/null); do
  echo "   🗑️  Removing old record $RECORD_ID..."
  curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" > /dev/null
  echo "   ✅ Deleted"
done

# Add Vercel DNS records (CNAME flattening with Cloudflare proxy)
echo ""
echo "➕ Adding new Vercel DNS records..."

# Root domain (@) → Vercel
curl -s -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{
    "type": "CNAME",
    "name": "@",
    "content": "cname.vercel-dns.com",
    "ttl": 1,
    "proxied": true
  }' | python3 -c "import sys,json; r=json.load(sys.stdin); print('   ✅ Root (@) → cname.vercel-dns.com' if r.get('success') else f'   ❌ Failed: {r}'); print('   🔒 Proxied through Cloudflare (orange cloud)')"

# www subdomain → Vercel
curl -s -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -d '{
    "type": "CNAME",
    "name": "www",
    "content": "cname.vercel-dns.com",
    "ttl": 1,
    "proxied": true
  }' | python3 -c "import sys,json; r=json.load(sys.stdin); print('   ✅ www → cname.vercel-dns.com' if r.get('success') else f'   ❌ Failed: {r}'); print('   🔒 Proxied through Cloudflare (orange cloud)')"

echo ""
echo "🎉 DNS setup complete!"
echo ""
echo "⏳ DNS changes may take up to 5 minutes to propagate."
echo ""
echo "After propagation, your site will be live at:"
echo "   🔗 https://universalconsultingservices.com"
echo "   🔗 https://www.universalconsultingservices.com"
echo ""
