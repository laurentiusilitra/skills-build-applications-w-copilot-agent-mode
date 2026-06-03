# OctoFit Frontend

The presentation tier uses React 19, Vite, and react-router-dom.

## Environment variable

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```
