# RADAR FF — Portal de fans de Free Fire


## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (sistema de diseño propio en `app/globals.css`)
- Sin backend todavía: toda la lógica de herramientas corre en el cliente
- SEO: metadata por página, JSON-LD (Article / FAQPage / SoftwareApplication / BreadcrumbList / HowTo), sitemap y robots dinámicos

## Correr localmente

```bash
npm install      # ya ejecutado al crear el proyecto
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm run start    # sirve el build
npm run lint     # eslint
```

## Estructura

```
app/                     rutas (App Router)
  herramientas/          las 30+ herramientas (generadores, calculadoras, comparadores, sensibilidad, diamantes)
  personajes|armas|mascotas  catálogos + fichas dinámicas ([slug])
  noticias|guias         listados + artículos dinámicos ([slug])
  codigos|eventos|faq|glosario|vehiculos|acerca|cuenta
  sitemap.ts robots.ts   SEO dinámico desde el contenido real
components/              UI y motivos HUD (radar, esquinas, micro-interacciones)
content/                 datos actualizables con fecha de verificación
lib/                     utilidades, metadata, navegación
```

## Reglas del proyecto

- `content/codes.ts` solo publica códigos verificados (hoy: vacío + ejemplos educativos).
- Toda información variable lleva fecha de verificación visible (`UpdatedStamp`).
- AdSense: el componente `AdSlot` NO renderiza nada hasta configurar las variables de entorno:

```bash
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXX
# opcional: NEXT_PUBLIC_ADSLOT_DISABLED=1 (desactivar anuncios)
```

- Monetización sin AdSense (100% gratis): página `/apoya` con donaciones, afiliados y patrocinio directo.
  Todo es opcional y configurable con variables de entorno; sin configurar, la CTA y los enlaces no aparecen:

```bash
NEXT_PUBLIC_DONATION_URL=https://cafecito.app/tu-usuario     # plataforma de apoyo (Cafecito/Ko-fi/Buy me a coffee)
NEXT_PUBLIC_DONATION_LABEL=Invitar un café                   # texto del botón (opcional)
NEXT_PUBLIC_SPONSOR_EMAIL=hola@tudominio.com                 # correo para patrocinio directo
NEXT_PUBLIC_AFFILIATE_LINKS='[{"label":"Tablets recomendadas","note":"para jugar sin lag","href":"https://..."}]'
```

  Ideas de programas de afiliados gratuitos para este nicho: Amazon Associates (móviles, tablets,
  accesorios gamer), tiendas de tecnología y apps de descarga. No existe programa oficial de afiliados
  de Free Fire; no inventes enlaces de descarga del juego. Los enlaces afiliados se marcan
  `rel="sponsored nofollow"` de forma automática.

- Sistema de usuarios (registro/login reales, favoritos, historial) está planificado en `content/` + notas de fase: requiere backend y base de datos; no se ha implementado una falsa autenticación.

## Privacidad

Sin creadores de cuentas, sin cookies de seguimiento de terceros mientras no exista AdSense aprobado ni analytics configurado. Las valoraciones «útil/no útil» se guardan en localStorage.