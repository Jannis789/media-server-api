# 📺 Media Server (Eigenbau) Setup-Übersicht

## Grundgerüste, die aufgebaut werden sollten

* **AlpineJs**
  Frontend

* **alpine-components**
  Für HTML-Bausteine

* **Vite**
  Build-Tool für typescript

## Ordner Struktur
```
.
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── shell.nix
├── src
│   ├── assets
│   │   └── styles
│   │       └── index.less
│   ├── components
│   │   ├── body.html
│   │   ├── footer.html
│   │   └── header.html
│   ├── index.html
│   ├── main.ts
│   ├── modell
│   ├── types
│   │   ├── global.d.ts
│   │   └── vite-env.d.ts
│   └── utils
├── tsconfig.json
└── vite.config.ts
```
