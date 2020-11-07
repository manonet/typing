// Ensure that land string can be matched with RtlLangs
export const getLangCode = (lang: string) =>
    lang.replace(/([\-\_].+)/, "").toLowerCase();

export const languageName = {
    ar: "العربية", // Arabic
    bg: "Български", // Bulgarian
    bs: "Bosanski", // Bosnian
    ca: "Català", // Catalan
    cs: "Čeština", // Czech
    da: "Dansk", // Danish
    de: "Deutsch", // German
    el: "Ελληνικά", // Greek
    en: "English",
    es: "Español", // Spanish
    et: "Eesti", // Estonian
    fa: "فارسی", // Persian
    fi: "Suomi", // Finnish
    fr: "Français", // French
    hi: "हिन्दी", // Hindi
    hr: "Hrvatski", // Croatian
    hu: "Magyar", // Hungarian
    it: "Italiano", // Italian
    ja: "日本語", // Japanese
    lt: "Lietuvių", // Lithuanian
    lv: "Latviešu", // Latvian
    mk: "Македонски", // Macedonian
    ml: "മലയാളം", // Malayalam
    nl: "Nederlands", // Dutch
    pa: "ਪੰਜਾਬੀ", // Punjabi
    pl: "Polski", // Polish
    pt: "Português", // Portuguese
    "pt-br": "Português (BR)", // Brazilian
    ro: "Română", // Romanian
    ru: "Русский", // Russian
    sk: "Slovenčina", // Slovak
    sl: "Slovenščina", // Slovenian
    sq: "Shqip", // Albanian
    sr: "Српски / srpski", // Serbian
    sv: "Svenska", // Swedish
    te: "తెలుగు", // Telugu
    tr: "Türkçe", // Turkish
    uk: "Українська", // Ukrainian
    zh: "中文", // Chinese
} as const;

export const RtlLangs = [
    "ae" /* Avestan */,
    "ar" /* 'العربية', Arabic */,
    "arc" /* Aramaic */,
    "arz" /* 'مصرى', Egyptian  */,
    "azb" /* 'تۆرکجه', Azeri, Azerbaijani  */,
    "bcc" /* 'بلوچی مکرانی', Southern Balochi */,
    "bqi" /* 'بختياري', Bakthiari */,
    "ckb" /* 'Soranî / کوردی', Sorani */,
    "dv" /* 'ދިވެހިބަސް', Dhivehi */,
    "fa" /* 'فارسی', Persian, Farsi */,
    "glk" /* 'گیلکی', Gilaki */,
    "he" /* 'עברית', Hebrew */,
    "ku" /* 'Kurdî / كوردی', Kurdish */,
    "mzn" /* 'مازِرونی', Mazanderani */,
    "nqo" /* 'ߒߞߏ', N'Ko */,
    "pnb" /* 'پنجابی', Western Punjabi */,
    "ps" /* 'پښتو', Pashto, */,
    "sd" /* 'سنڌي', Sindhi */,
    "ug" /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
    "ur" /* 'اردو', Urdu */,
    "yi" /* 'ייִדיש', Yiddish */,
];

// firstName: John
// lastName: Doe
// display name: John Doe
// Except for these languages:
export const firstNameIsTheLastLanguages = ["hu", "pl"];
// for these display name is: Doe John
