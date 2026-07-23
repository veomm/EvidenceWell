import Pocketbase from 'pocketbase';

// In the Hostinger Horizons preview, PocketBase is proxied on the same
// origin at /hcgi/platform. Outside that environment (e.g. Vercel), set
// VITE_POCKETBASE_URL to your PocketBase server's public URL.
const POCKETBASE_API_URL = import.meta.env.VITE_POCKETBASE_URL || '/hcgi/platform';

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;

export { pocketbaseClient };
