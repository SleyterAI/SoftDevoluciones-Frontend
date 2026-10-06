const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

// Lee la variable que definas en Vercel (por ejemplo: RENDER_API_URL)
const apiUrl = process.env.RENDER_API_URL || 'https://tu-backend-fallback.onrender.com/api';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`[Vercel Build] Environment file generated with API URL: ${apiUrl}`);
