set -e

echo "CodeKorico Neon + Prisma Setup"
echo "==============================="
echo ""

if [ -z "$DATABASE_URL"]; then 
    if [ ! -f ".env"]; then
        echo ".env not found"
    else
        source .env
        if [ -z "$DATABSE_URL"]; then
            echo "DATABASE_URL not set in .env"
            exit 1
        fi
    fi
fi

echo "DATABASE_URL found"
echo ""

echo "Installing dependencies"
npm install --save-dev prisma
npm install @prisma/client
npm install gray-matter

echo "Dependencies installed"
echo ""

echo "Initializing Prisma"
npx prisma generate

echo "Prisma client generated"
echo ""

echo "Running database migrations"
npx prisma migrate deploy

echo "Database migrations applied"
echo ""

echo "Migrating markdown content"
npx tsx scripts/migrate-content.ts

echo ""
echo "============================="
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review your data in Prisma Studio:"
echo "npm run db:studio"
echo ""
echo "2. Start your dev server:"
echo "npm run dev"
echo ""
echo "3. Verify the feed show your content"
echo "Visit localhost:3000/feed"
echo ""
echo "For production, remember to:"
echo "- Set DATABASE_URL in Vercel environment variables"
echo "- Deploy with git push"
echo "=============================="
