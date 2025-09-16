import { requestContext } from "../RequestContext";
import { ResponseTranslations } from "./_backendTranslations";

export function fetchTranslation(key: string) {
	return () => translateMessage(key);
}

export function translateMessage(key: string) {
	const language = requestContext.getStore()?.language || "en";
	return translate(key, language);
}

export function translate(key: string, language: string) {
	return ResponseTranslations[key]?.[language] ?? key;
}