import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Substitua o objeto a seguir pela configuração do seu projeto Firebase.
// Você pode encontrar essa configuração no Console do Firebase:
// Configurações do projeto > Geral > Seus apps > App da Web > Configuração do SDK > Objeto de configuração.
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Firestore para ser usada em outras partes do aplicativo
export const db = getFirestore(app);
