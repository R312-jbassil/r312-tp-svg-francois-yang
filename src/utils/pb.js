import PocketBase from 'pocketbase';

// Utiliser l'URL de ton instance PocketBase
const pbUrl = import.meta.env.PB_URL || 'http://127.0.0.1:8090';

// Créer et exporter l'instance PocketBase
const pb = new PocketBase(pbUrl);

export default pb;