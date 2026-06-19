# Contact Form: storage and email setup

The contact form now (a) stores every submission in Vercel Postgres and (b) emails a
notification to vikrant@amvco.com.au via Resend. Both are optional at runtime: if the
environment variables are not set, the form still works and returns success, and the
submission is logged to the server console. Add the env vars below to switch each feature
on. Code lives in `app/contact/actions.ts`.

## A. Storage - Vercel Postgres

1. Vercel dashboard -> your project -> **Storage** -> **Create Database** -> **Postgres**.
2. Connect it to the project and to all environments (Production, Preview, Development).
   Vercel automatically injects `POSTGRES_URL` (and related vars). No code change needed.
3. The table is created automatically on the first submission:
   `contact_submissions (id, created_at, first_name, last_name, email, company, phone,
   industry, message)`. There is nothing to run by hand.
4. To view leads: Vercel -> Storage -> your database -> **Data** / **Query**, then run:
   ```sql
   SELECT * FROM contact_submissions ORDER BY created_at DESC;
   ```
   You can export the result to CSV from there.

## B. Email notification - Web3Forms

Notifications use the [official Web3Forms Vercel pattern](https://web3forms.com/platforms/vercel-contact-form):
browser-side `FormData` → append `access_key` → `fetch` as JSON → check `result.success`.

1. Get a free access key at **web3forms.com** (enter vikrant@amvco.com.au, the key is
   emailed back). Free tier covers 250 submissions per month.
2. Add the env var in Vercel (project -> Settings -> Environment Variables), for
   **Production, Preview and Development**:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = the access key
3. **Redeploy** after adding the variable (`NEXT_PUBLIC_` values are baked in at build time).

### Preview / `*.vercel.app` domains

Web3Forms may **block free platform subdomains** (including Vercel Preview URLs) by default.
If submissions work locally but not on `something.vercel.app`, contact Web3Forms support
with your domain to request approval, or test on your **custom production domain**.

### Verify in the browser

After submit, open DevTools -> **Network** and confirm a request to `api.web3forms.com/submit`
returns **200** with `{ "success": true }`. If the key is missing, the form shows an error
instead of a fake success message.

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `POSTGRES_URL` | Vercel Postgres connection (auto-injected) | For storage |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key (browser-side) | For email |

## Testing locally

```bash
vercel env pull .env.local   # pulls the env vars from Vercel into local
npm run dev
```
Submit the form, then check the Vercel Postgres data view and the inbox.

## Notes

- Storage and email run in parallel and each fails independently, so one provider issue
  does not lose the lead through the other channel.
- Dependencies used: `@vercel/postgres` (storage). Email uses Web3Forms via a plain
  `fetch` call, no extra dependency.
