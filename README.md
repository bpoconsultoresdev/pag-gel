# Gaming Expert Labs — sitio web (borrador estático)

Sitio estático (HTML/CSS/JS, sin dependencias externas ni CDN) para **gamingexpertlabs.com**, en tres idiomas: español (principal), inglés y portugués.

## Cómo previsualizar

No requiere build ni instalación. Basta con abrir en el navegador:

```
index.html          → selector/redirección de idioma (por defecto ES)
es/index.html        → Home en español
en/index.html        → Home en inglés
pt/index.html        → Home en portugués
```

Para desarrollo cómodo (recarga en vivo, rutas relativas), se recomienda servir la carpeta con cualquier servidor estático simple, por ejemplo:

```bash
npx serve .
```

## Estructura

```
index.html                 # Selector de idioma (redirige a /es/)
assets/css/style.css       # Estilos compartidos (tema oscuro navy/teal)
assets/js/main.js          # Menú móvil, FAQ acordeón, formulario simulado, animaciones de scroll
es/  en/  pt/
  index.html                # Home
  servicios.html             # 8 líneas de servicio (secciones ancladas: #rng-rtp, #plataforma-rgs, #apuestas-deportivas, #esports, #ciberseguridad, #regulatorio, #geolocalizacion, #juego-responsable)
  nosotros.html               # Quiénes somos + a quién servimos + jurisdicciones
  recursos.html                # Blog/noticias (placeholder) + FAQ
  contacto.html                 # Formulario de contacto (sin backend real)
```

Los nombres de archivo se mantienen iguales entre `es/`, `en/` y `pt/` para que el selector de idioma en el header/footer funcione con solo cambiar `../es/`, `../en/`, `../pt/` en la URL.

## Estado actual

El sitio no muestra contenido "de relleno" ni notas de pendiente: se retiró la sección de artículos de ejemplo en Recursos (queda solo el FAQ, que sí es contenido terminado) y los enlaces muertos de Política de privacidad/Términos de uso en el footer.

El formulario de contacto (ES/EN/PT) está conectado vía [FormSubmit](https://formsubmit.co) — un servicio gratuito de envío de formularios sin backend propio ni cuentas que crear. Incluye protección anti-spam (honeypot) y muestra confirmación o error en la misma página, sin redirigir al visitante.

**Destino:** los envíos del formulario (`action` en `contacto.html`, las 3 versiones) apuntan directamente a **info@gamingexpertlabs.com**.

**Importante — paso de activación de FormSubmit:** la primera vez que alguien envíe un mensaje desde el formulario web, FormSubmit mandará un correo de confirmación a `info@gamingexpertlabs.com` con un enlace que hay que hacer clic una sola vez para autorizar los envíos.

## Checklist antes de publicar

- [x] **Activar el formulario**: actualizado a `info@gamingexpertlabs.com`.
- [x] **Dominio y hosting**: configurado en Vercel y GoDaddy para `gamingexpertlabs.com`.
- [ ] **Analítica**: no se incluyó ningún script de analítica (Google Analytics, Plausible, etc.) — agregar según la herramienta elegida.
- [ ] **Páginas legales**: si se quiere Política de privacidad / Términos de uso, hay que redactarlas y volver a agregarlas al footer (se retiraron los enlaces vacíos).
- [ ] **Recursos**: si más adelante se quiere sumar blog/noticias, se puede reincorporar esa sección con contenido real (hoy la página solo tiene FAQ).
- [ ] **SEO técnico**: agregar `sitemap.xml`, `robots.txt`, y validar `hreflang` entre las 3 versiones de idioma si se busca posicionamiento internacional.

## Diseño

Tema oscuro (navy) con acentos teal/dorado, iconografía en SVG inline (sin imágenes externas), pensado para diferenciarse visualmente de las referencias del sector (GLI, BMM, iTech Labs, eCOGRA — mayormente en tono claro/corporativo).
