# Portafolio Personal — Carlos Fernández (`ingcarfer`)

Landing page personal diseñada para **GitHub Pages** y optimizada para **Cloudflare DNS**.

---

## 🚀 Despliegue en GitHub Pages (Paso a Paso)

### 1. Inicializar y subir a GitHub

Abre tu terminal en la carpeta de este proyecto (`ingcarfer.github.io`):

```bash
cd /home/ingcarfer/Proyectos/Dismin/ingcarfer.github.io
git init
git add .
git commit -m "feat: landing page personal de desarrollador"
git branch -M main
```

Crea un nuevo repositorio público en GitHub llamado exactamente:
👉 **`ingcarfer.github.io`**

Luego vincúlalo y sube el código:

```bash
git remote add origin https://github.com/ingcarfer/ingcarfer.github.io.git
git push -u origin main
```

### 2. Activar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/ingcarfer/ingcarfer.github.io`.
2. Entra en **Settings** > **Pages** (menú izquierdo).
3. En **Build and deployment > Source**, asegúrate de que esté seleccionado:
   - **Deploy from a branch**
   - Branch: `main` / Folder: `/ (root)`
4. Haz clic en **Save**.

En 1 o 2 minutos, tu web estará activa globalmente en:
👉 **`https://ingcarfer.github.io`**

---

## 🌐 Conexión con Cloudflare DNS (Dominio Propio)

Si tienes un dominio propio (por ejemplo `carlosfernandez.dev` o `ingcarfer.com`):

1. **En Cloudflare DNS:**
   - Añade un registro tipo **CNAME**:
     - **Name:** `@` (o `www`)
     - **Target:** `ingcarfer.github.io`
     - **Proxy status:** Activado (nube naranja activada para caché y SSL automático).

2. **En GitHub Pages:**
   - En **Settings > Pages > Custom domain**, escribe tu dominio (ej. `carlosfernandez.dev`).
   - Guarda y marca la casilla **Enforce HTTPS**.

---

## ⚡ Conectar tu VPS para Proyectos y APIs

Tu landing page principal se sirve gratis y sin consumo de recursos desde GitHub Pages. Tu VPS queda 100% disponible para tus proyectos reales (como **Dismin+** o APIs backend):

- **Subdominio en Cloudflare:** Crea un registro tipo **A** o un **Cloudflare Tunnel (`cloudflared`)** apuntando al subdominio que prefieras:
  - `api.tudominio.com` ➔ Apunta a tu API Laravel en el VPS.
  - `dismin.tudominio.com` ➔ Apunta a tu app PWA Nuxt en el VPS.
