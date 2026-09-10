# OverCounter — Roadmap (reinicio, metodología en cascada incremental)

Guía fan de **Overwatch**: consultar counters de cada héroe, sinergias y composiciones recomendadas, y armar un equipo que explote las debilidades de una composición rival.

## Decisiones del reinicio

- **Stack**: una sola aplicación **Next.js** (App Router) + **TypeScript**. Se eliminan: monorepo workspaces, servidor Express, CORS y proxy (Next hace front y back en un mismo proceso).
- **Persistencia**: **SQLite** vía `better-sqlite3` (embebido, sin instalación). Archivo en `data/overcounter.db`.
- **Contenido**: seed de prueba primero; datos reales de OW2 en la fase final. **Sin** CRUD/admin de contenido en el MVP (se edita por seed).
- **Estilo**: CSS plano propio (los estilos ya creados en el MVP de React se conservan y migran).

## Metodología: cascada iterativa incremental

Cada fase **termina de punta a punta antes de empezar la siguiente**:
1. se construye lo mínimo necesario en backend/BD,
2. se integra la función en el frontend,
3. se verifica manualmente que funcione,
4. se cierra la fase (queda una demo estable y ejecutable).

El alcance solo crece cuando lo anterior ya funciona. Si algo de una fase falla, se corrige ahí antes de avanzar.

## Estructura de carpetas objetivo

```
overcounter/
├── package.json / next.config.ts / tsconfig.json
├── app/                        # App Router de Next (rutas = carpetas)
│   ├── layout.tsx              # layout raíz: cabecera/nav
│   ├── page.tsx                # grid de héroes (Server Component)
│   ├── hero/[id]/page.tsx      # detalle de héroe (Server Component)
│   ├── builder/page.tsx        # compositor vs rival (Fase 4, cliente)
│   ├── builder/layout.tsx?     # (según se necesite)
│   └── globals.css             # estilos (migrados del MVP)
├── lib/                        # lógica "backend" plana, sin capas
│   ├── types.ts                # tipos de dominio
│   ├── db.ts                   # conexión SQLite (singleton)
│   ├── schema.sql              # DDL completo del esquema actual
│   ├── migrate.ts              # ejecuta schema.sql (idempotente)
│   ├── seed.ts                 # datos de prueba (idempotente)
│   ├── heroes.ts               # consultas de héroes
│   ├── relations.ts            # consultas de matchups/sinergias (Fases 2-3)
│   ├── comps.ts                # composiciones recomendadas por héroe (Fase 3)
│   └── scoring.ts              # motor de puntuación reutilizable (Fase 4)
├── scripts/
│   └── db.ts                   # CLI: migrate / seed / reset
└── data/                       # overcounter.db (no versionada)
```

## Modelo de datos (evoluciona por fases)

Solo se crean las tablas que la fase activa necesita; las siguientes añaden tablas nuevas sin romper las anteriores.

**Fase 1 — `heroes` (única tabla):**
| columna | tipo | notas |
|---|---|---|
| id | INTEGER PK | |
| name | TEXT UNIQUE | |
| role | TEXT | CHECK tank/damage/support |
| archetype | TEXT nullable | reservada (dive/brawl/poke); se puebla en Fase 3. Se crea ya para evitar migraciones |
| description | TEXT | |
| image_url | TEXT nullable | placeholder avatar con inicial |
| created_at / updated_at | TEXT | |

**Fase 2 — `matchups` (relación dirigida "A le gana a B"):**
source_hero_id, target_hero_id, strength (0–1), note + UNIQUE compuesto + ON DELETE CASCADE + CHECK no self.

**Fase 3 — `synergies` (par A–B sin dirección, A<B)** + poblar `heroes.archetype`.

**Fase 4:** sin tablas nuevas; lógica pura en `lib/scoring.ts`.

## Fases en detalle

### Fase 0 — Fundaciones
**Objetivo:** proyecto Next.js limpio corriendo con HMR y una ruta de prueba.
- [ ] Crear app Next + TS; dependencias base (`better-sqlite3`).
- [ ] `.gitignore` (data/, node_modules/, .next/, .env).
- [ ] Primer commit de referencia.
**Definición de listo:** `npm run dev` abre la app; commit inicial.

### Fase 1 — `heroes` + "consultar héroe" (primera función)
Alcance cerrado: **nada de relaciones todavía**. El detalle muestra los campos que existen y marca los demás como "próximamente" (sin romper la UI).
- [ ] `lib/db.ts`, `lib/schema.sql` (solo heroes), `migrate.ts`, `seed.ts` con 6 héroes de prueba; CLI `db` (migrate/seed/reset).
- [ ] `lib/types.ts` y `lib/heroes.ts`: listar (filtro por rol + búsqueda) y obtener por id.
- [ ] Migrar componentes del MVP: `app/page.tsx` = grid por rol + buscador; `app/hero/[id]/page.tsx` = detalle (avatar, rol, descripción, "habilidades/sinergias/counters próximamente").
- [ ] Verificación manual: filtros, búsqueda, navegación a detalle, refresco de página en `/hero/3`.
**Definición de listo:** listado y detalle funcionando contra SQLite desde el navegador, sin API intermedia (Server Components leen la BD). Commit.

### Fase 2 — Relaciones `matchups` + ver debilidades/fuertes
- [ ] Extender `schema.sql` con `matchups`; ampliar seed (bordes dirigidos con strength y nota).
- [ ] `lib/relations.ts`: dado un héroe, fuertes (outgoing) y debilidades (incoming), ordenados por strength.
- [ ] Frontend: en el detalle, dos paneles "Fuerte contra" / "Debilidades" con barra de fuerza y nota (UI ya existente, se reconecta a datos reales).
- [ ] Verificación: Ghost (seed) muestra 1 debilidad / 2 fuertes; enlaces cruzados entre héroes.
**Definición de listo:** detalle enriquece y navega entre counters. Commit.

### Fase 3 — `synergies` + composiciones por héroe
- [ ] Tabla `synergies` (A<B); seed de pares. Poblar `heroes.archetype`.
- [ ] `lib/relations.ts`: sinergias de un héroe.
- [ ] `lib/comps.ts`: dado un héroe, arquetipo + sinergias fuertes + cobertura de roles → lista de compañeros sugeridos con motivo.
- [ ] Frontend: panel "Sinergias" y panel "Compañeros sugeridos / composición".
**Definición de listo:** detalle muestra sinergias y una primera noción de comp recomendada. Commit.

### Fase 4 — Motor de puntuación + compositor vs rival (algoritmo)
- [ ] `lib/scoring.ts`: score de un equipo candidato = contra cada rival (usa matchups) + sinergias internas + balance de roles (1 tank / 2 dps / 2 supports).
- [ ] `app/builder/page.tsx` (cliente): elige 5 rivales → ranking de equipos que explotan debilidades, con desglose por rival.
- [ ] Complejidad: con ~40 héroes, enumerar 12·C(18,2)·C(10,2) ≈ 82k combos es viable; se diseña el scorer desacoplado por si crece (branch & bound/ILP).
**Definición de listo:** el usuario introduce una comp rival y obtiene equipos recomendados ordenados con razones. Commit.

### Fase 5 — Datos reales de OW2 + pulido
- [ ] Roster real (~40 héroes), arquetipos y matchups/sinergias curados (fuente manual/colaborativa).
- [ ] Estados vacíos/skeletons, accesibilidad, y empaquetado de escritorio opcional (Electron/Tauri) fuera de alcance salvo decisión.

## Notas técnicas transversales

- **Server Components**: grid y detalle leen la BD en el servidor; sin fetch ni estados de carga para la primera pantalla. El compositor (interactivo) es cliente y recibe el roster como props o vía `app/api`.
- **Migraciones**: un solo `schema.sql` idempotente que refleja el esquema de la fase actual; `npm run db:reset` regenera la BD (datos de prueba, no hay producción).
- **Verificación**: al cierre de cada fase, `npm run build` y `npm run lint` (o el que provea el template) deben pasar antes del commit.
