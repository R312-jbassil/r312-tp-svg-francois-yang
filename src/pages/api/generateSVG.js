import { OpenAI } from 'openai';

// Récupération des variables d'environnement
const HF_TOKEN = import.meta.env.HF_TOKEN;
const NOM_MODEL = import.meta.env.HF_MODEL;
const BASE_URL = import.meta.env.HF_URL;

// Fonction exportée pour gérer les requêtes POST
export const POST = async ({ request }) => {
    // Extraction de l'historique des messages du corps de la requête
    let messages = await request.json();
    // Vérifie que messages est bien un tableau
    if (!Array.isArray(messages)) {
        messages = [messages];
    }

    // Initialisation du client OpenAI avec l'URL de base et le token d'API
    const client = new OpenAI({
        baseURL: BASE_URL,
        apiKey: HF_TOKEN,
    });

    // Création du message système pour guider le modèle
    const SystemMessage = {
        role: "system",
        content: "You are an SVG code generator. Generate SVG code for the following messages. Make sure to include ids for each part of the generated SVG.",
    };

    // Appel à l'API pour générer le code SVG en utilisant le modèle spécifié
    const chatCompletion = await client.chat.completions.create({
        model: NOM_MODEL,
        messages: [SystemMessage, ...messages],
    });

    // Vérification sécurisée de la réponse
    if (
        !chatCompletion ||
        !chatCompletion.choices ||
        chatCompletion.choices.length === 0 ||
        !chatCompletion.choices[0].message
    ) {
        return new Response(
            JSON.stringify({ error: "Aucune réponse du modèle IA." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    // Récupération du message généré par l'API
    const message = chatCompletion.choices[0].message.content || "";

    // Recherche d'un élément SVG dans le message généré
    const svgMatch = message.match(/<svg[\s\S]*?<\/svg>/i);

    // Retourne une réponse JSON contenant le SVG généré
    return new Response(
        JSON.stringify({ svg: svgMatch ? svgMatch[0] : "" }),
        { headers: { "Content-Type": "application/json" } }
    );
};
