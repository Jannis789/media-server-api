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
    },
    "user_created_successfully": {
        "en": "User created successfully.",
        "es": "Usuario creado con éxito.",
        "fr": "Utilisateur créé avec succès.",
        "de": "Benutzer erfolgreich erstellt.",
    },
    "translations_fetched_successfully": {
        "en": "Translations fetched successfully.",
        "es": "Traducciones obtenidas con éxito.",
        "fr": "Traductions récupérées avec succès.",
        "de": "Übersetzungen erfolgreich abgerufen.",
    },
    "not_a_string": {
        "en": "Value is not a string.",
        "es": "El valor no es una cadena.",
        "fr": "La valeur n'est pas une chaîne.",
        "de": "Wert ist kein String.",
    },
    "not_a_number": {
        "en": "Value is not a number.",
        "es": "El valor no es un número.",
        "fr": "La valeur n'est pas un nombre.",
        "de": "Wert ist keine Zahl.",
    },
    "not_a_date": {
        "en": "Value is not a date.",
        "es": "El valor no es una fecha.",
        "fr": "La valeur n'est pas une date.",
        "de": "Wert ist kein Datum.",
    },
    "username_not_unique": {
        "en": "Username is already taken.",
        "es": "El nombre de usuario ya está en uso.",
        "fr": "Le nom d'utilisateur est déjà pris.",
        "de": "Benutzername ist bereits vergeben.",
    },
    "email_not_unique": {
        "en": "Email is already in use.",
        "es": "El correo electrónico ya está en uso.",
        "fr": "L'e-mail est déjà utilisé.",
        "de": "E-Mail wird bereits verwendet.",
    },
    "invalid_username": { // @todo look if constraints are right and useful
        "en": "Invalid username. It should be 3-20 characters long and can contain letters, numbers, underscores, and dots.",
        "es": "Nombre de usuario no válido. Debe tener entre 3 y 20 caracteres y puede contener letras, números, guiones bajos y puntos.",
        "fr": "Nom d'utilisateur invalide. Il doit comporter entre 3 et 20 caractères et peut contenir des lettres, des chiffres, des underscores et des points.",
        "de": "Ungültiger Benutzername. Er sollte 3-20 Zeichen lang sein und Buchstaben, Zahlen, Unterstriche und Punkte enthalten können.",
    },
    "language_not_found": {
        "en": "Language not found.",
        "es": "Idioma no encontrado.",
        "fr": "Langue non trouvée.",
        "de": "Sprache nicht gefunden.",
    },
    "not_a_boolean": {
        "en": "Value is not a boolean.",
        "es": "El valor no es un booleano.",
        "fr": "La valeur n'est pas un booléen.",
        "de": "Wert ist kein Boolean.",
    },
    "language_code_length": {
        "en": "Language code must be between 2 and 5 characters long.",
        "es": "El código de idioma debe tener entre 2 y 5 caracteres.",
        "fr": "Le code de langue doit comporter entre 2 et 5 caractères.",
        "de": "Der Sprachcode muss zwischen 2 und 5 Zeichen lang sein.",
    }
};