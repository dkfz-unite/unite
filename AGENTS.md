# UNITE repository instructions

Before changing this repository, read the shared UNITE instructions and
relevant project documentation maintained in
[dkfz-unite/.github](https://github.com/dkfz-unite/.github/blob/main/README.md).

1. Prefer the local shared checkout: `../unite-meta/AGENTS.md`, relative to this
   repository root. A sibling `.github/AGENTS.md` or a user-provided path is also
   valid. Resolve its document links relative to that shared checkout.
2. Read the shared `AGENTS.md`, project overview, repository map, and topic
   documents relevant to the task, following the shared README's task index.
3. If no shared checkout is accessible, use the GitHub versions beginning with
   [shared AGENTS.md](https://github.com/dkfz-unite/.github/blob/main/AGENTS.md).
   If those are unavailable too, report the missing context and proceed only
   with what local documentation/code establishes; do not invent shared rules.
4. Read this repository's README and relevant local docs; inspect Git status.
   More specific instructions here supplement the shared guidance.

Keep common rules in `.github`; keep component details in this repository.

## Portal

Status: reviewed with the owner (2026-10-12).

`unite` is the web portal: an ASP.NET 8 server (`Unite.Web`) that hosts the
built Vue SPA and proxies its API calls to the internal services, and the Vue 3
frontend (`Unite.Web/Client`). It has no business logic of its own; search,
datasets and downloads are Composer, submissions the feeds, analyses Analysis,
accounts Identity. Background:
[Datasets and portal](../unite-meta/docs/datasets-and-portal.md).

### Server (`Unite.Web`)

- `Program.cs`: SPA hosting from `Client/dist`, `GET /api/config` (footer
  links), and the active proxy (`Middleware/ProxyMiddleware.cs`, `UseProxy`):
  `/api/{identity,composer,analysis,feed-donors,feed-images,feed-specimens,feed-omics}`
  to `<host>/api`, and `/viewer/cxg<NN>` to `UNITE_VIEWER_CXG_HOST` with `{n}`
  replaced. The YARP configuration is commented out and not used.
- Hosts come from `Configuration/EnvironmentConfig.cs`; the feed variables are
  `UNITE_FEED_<TYPE>_HOST`, as in unite-env's Compose.
- `Configuration/Extensions/AuthenticationExtensions.cs` registers JWT bearer
  authentication (needs `UNITE_API_KEY`, 32 characters). There is no explicit
  `UseAuthentication()`: ASP.NET adds the middleware automatically, before the
  proxy. For `Worker` tokens it asks Identity whether the token is still active
  (cached for a minute) and removes the `Authorization` header otherwise, so
  revoked worker tokens are rejected at the portal. Keep this when changing the
  pipeline or the proxy.

### Frontend (`Unite.Web/Client`)

Vite 6, Vue 3 with the **Options API** (no `<script setup>`), Quasar 2, Vuex 4,
vue-router 4, axios, Plotly (`visualization/_shared/Plotly.vue`) and
`@dkfz-unite/event-grid` for the GAF and CNV-profile grids. JavaScript with
TypeScript for models (filter criteria, analysis models, feed APIs);
`tsconfig` is not strict and nothing type-checks. There is no linter and there
are no tests. Follow the surrounding style: components registered with the
`U` prefix (`u-data-table`), a `settings.js` per module (domain, title, crumb,
icon; route names equal `Settings.domain`), mixins for shared page behavior.

| Area (`src/`) | Contents |
| --- | --- |
| `main.js`, `global.js` | Bootstrapping; `global.js` adds `Array.prototype.groupBy`/`distinct` and `Math.roundTo` |
| `settings.js` | API base URLs (`/api/composer`, ...); the only place they are defined |
| `_settings/settings.js` | Registry of all module settings (not the URLs) |
| `_shared` | `api/api-client.ts` and interceptors (token, refresh, 401/403), filter framework (`components/filters`), table, download form, helpers, plugins |
| `home` | Layout (`HomePage.vue`), navigation, root router and store that assemble every module's routes and store modules |
| `identity` | Login (default and LDAP), register, password reset, account; store getters `isAdmin`, `canWriteData`, `hasPermission(s)` |
| `admin` | Users, worker tokens, tasks (stats, reindexing), submission review |
| `domain` | Entries (list) and entry (detail) pages per entity: projects, donors, images (MR), specimens (material, line, organoid, xenograft), omics (genes, proteins, SM, CNV, SV); submission status |
| `datasets` | Saved datasets (store, stats via each domain's `ModelsApi`) |
| `analysis` | Analysis list, launch dialogs, result viewers, one folder per method |
| `visualization` | Genomic profile (`profile`), protein lolliplot (`proteinplot`), Plotly wrapper, palettes |

Patterns:

- **API calls**: `ApiClient` (`_shared/api/api-client.ts`) returns
  `response.data` and throws `error.response`. Entries pages use classes
  derived from `ModelsApi` (`domain/_shared/entries/api`: `search`, `stats`,
  `data`); submissions use the `FeedApi` classes in `domain/submissions/api`;
  other modules export plain function objects.
- **Auth in the UI**: the JWT is in `localStorage['token']`; the request
  interceptor refreshes an expired token through Identity. Routes use
  `meta.authorize`; only `/admin` checks permissions. Controls are gated with
  `canWriteData` and `isAdmin`. UI gating is convenience only; the services
  enforce access.
- **Search state** lives in Vuex per domain (`filtersCriteria`, rows,
  selection), not in the URL. Entries pages use `page-table-mixin`, which
  watches the criteria and calls `fetchData`. This is accepted: the search does
  not survive a reload, and sharing is done with filter export/import and saved
  datasets (owner, 2026-10-12; URL state is an idea in Jira).
- **Errors** are shown with `this.$q.notify` in each component; there is no
  central handler.

### Where to change things

| Change | Location |
| --- | --- |
| Filter field on an existing model | `<entries>/models/filters/<x>-filters-criteria.ts` (field and constructor copy), `<x>-filters.js` (UI definition), `<x>-filters-context.ts` if needed, the entity `Table.vue` column; the backend criteria in `unite-indices` must match |
| New filter model | `_shared/components/filters/{filter-models.js,filters-criteria.ts,filters-context.ts,mixin.js}`, dataset `SaveButton.vue` merge logic, dataset criteria views |
| Detail page tab | `<entity>/components/tabs/`, shared tabs in `domain/_shared/entry/components/tabs/`, `settings.js` `Tabs` |
| Upload | Entries page `UploadButton.vue` with the shared `UploadDialog.vue`; templates in `Client/public/templates/` |
| Download options | `_shared/components/download/DownloadForm.vue` and the entry `DownloadButton.vue`; Composer's download criteria |
| Analysis method | `analysis/components/<method>/` (`analysis.ts`, `options.ts`, `Dialog.vue` with `canShow` eligibility, `Viewer.vue`, `Results.vue`), `_shared/analysis-type.ts`, `_shared/analysis-factory.ts`, `AnalysisButton.vue`, `analysis/Page.vue` |
| Genomic profile track | `visualization/profile` (data services and view options) |
| Proxy route or service host | `Program.cs`, `EnvironmentConfig.cs`, `Client/vite.config.js`, unite-env `applications/unite/docker-compose.yml` |

New data types touch most of these; see
[Integrating a new data type](../unite-meta/docs/integrating-a-data-type.md).

### Build and run

```sh
cd Unite.Web/Client && npm install && npm run dev   # http://localhost:8080
npm run build                                       # production build check
dotnet build Unite.sln
```

- Development uses Vite at `localhost:8080` with the proxy routes in
  `vite.config.js`, while the portal container keeps serving
  `https://localhost:443`; see
  [Development validation](../unite-meta/docs/development-validation.md).
- `npm install` needs access to GitHub Packages for `@dkfz-unite/event-grid`;
  the Docker build gets it through the `GITHUB_TOKEN` build argument.
- UI changes need a manual check in the browser; there are no automated tests.

### Pitfalls

- `analysis/components/_shared/componets/` is a misspelled folder imported by
  every method; keep the path unless renaming all imports.
- `home/TestPage.vue` has no route on purpose: it is the owner's playground
  for trying components. Keep it. Unused leftovers were removed on 2026-10-12;
  remove new ones rather than extending them.
- The GAF and CNV-profile grid components are near copies; change both. They
  are to be merged into one shared grid once GAF uses samples, regions and
  observations (Jira UND-1060).

### CI

`docker-images.yml` builds amd64 and arm64 images under one manifest on pushes
to `main`, passing `GITHUB_TOKEN` for the npm package.

### Known issues

Defects are tracked in the private Jira; see the shared
[Track defects](../unite-meta/AGENTS.md#track-defects).
