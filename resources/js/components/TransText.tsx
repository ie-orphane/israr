import React, { useCallback, useEffect, useState } from "react";

interface TextProps {
  ar: string;
  fr: string;
  en?: string;
  sw?: string;
  pr?: string;
}

const TransText: React.FC<TextProps> = (props) => {
  const allowedLanguages = ["ar", "fr"] as const;

  const readLang = useCallback((): "ar" | "fr" => {
    if (typeof window === "undefined") return "fr";
    const saved = window.localStorage.getItem("lang") || "fr";
    return (allowedLanguages as readonly string[]).includes(saved)
      ? (saved as "ar" | "fr")
      : "fr";
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState<"ar" | "fr">(readLang());

  useEffect(() => {
    const onChange: EventListener = () => setSelectedLanguage(readLang());
    window.addEventListener("language:change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("language:change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [readLang]);

  const dictionary = props as unknown as Record<string, string>;
  const text = dictionary[selectedLanguage] ? dictionary[selectedLanguage] : dictionary["fr"];

  return (
    <span dir={selectedLanguage === "ar" ? "rtl" : "ltr"} dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} />
  );
};

export default TransText;
