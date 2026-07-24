import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Next.js 16 native flat config.
 * `eslint-config-next` endi flat config massivlarini bevosita export qiladi —
 * shuning uchun FlatCompat kerak emas.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  {
    rules: {
      // O'zbek/rus matni apostrof va tirnoqlarni tabiiy ishlatadi — JSX'da
      // ularni har safar qochirish (&apos;) o'rniga qoidani o'chiramiz.
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },
];

export default eslintConfig;
