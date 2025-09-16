import { availableLanguages } from "./_languages";

export function parseAcceptLanguage(header: string): { lang: string; q: number }[] {
    return header
        .split(",") // trennen nach Komma
        .map(part => {
            const [lang, qVal] = part.trim().split(";q=");
            return { lang, q: qVal ? parseFloat(qVal) : 1.0 };
        })
        .sort((a, b) => b.q - a.q); // nach Qualität sortieren
}

export const ResponseTranslations: Record<string, Record<keyof typeof availableLanguages, string>> = {
    "email_unavailable": {
        "en": "Email is already in use.",
        "es": "El correo electrónico ya está en uso.",
        "fr": "L'e-mail est déjà utilisé.",
        "de": "E-Mail wird bereits verwendet.",
    },
    "invalid_email": {
        "en": "Invalid email address.",
        "es": "Dirección de correo electrónico no válida.",
        "fr": "Adresse e-mail invalide.",
        "de": "Ungültige E-Mail-Adresse.",
    },
    "invalid_password": {
        "en": "Password must be at least 8 characters long and contain at least one letter and one number.",
        "es": "La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número.",
        "fr": "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre.",
        "de": "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten.",
    },
    "incorrect_password": {
        "en": "Incorrect password.",
        "es": "Contraseña incorrecta.",
        "fr": "Mot de passe incorrect.",
        "de": "Falsches Passwort.",
    },
    "login_successful": {
        "en": "Login successful.",
        "es": "Inicio de sesión exitoso.",
        "fr": "Connexion réussie.",
        "de": "Erfolgreich eingeloggt.",
    }
};