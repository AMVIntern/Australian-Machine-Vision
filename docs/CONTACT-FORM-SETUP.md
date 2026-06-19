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

Notifications are sent through Web3Forms (form-to-email API). No DNS, no SMTP, no domain
verification. The recipient address is the one the access key was created for.

1. Get a free access key at **web3forms.com** (enter vikrant@amvco.com.au, the key is
   emailed back). Free tier covers 250 submissions per month.
2. Add the env var in Vercel (project -> Settings -> Environment Variables), for
   Production, Preview and Development:
   - `WEB3FORMS_ACCESS_KEY` = the access key
3. Redeploy. Submit the form on `/contact` and the email arrives at the recipient address
   on the key (vikrant@amvco.com.au), with the submitter's address set as reply-to so you
   can reply directly.

Notes:
- The "from" address on the email is a generic Web3Forms sender, not literally
  `@amvco.com.au`. Reply-to is the submitter, so replies still go to the right person.
- To change the recipient later, either reissue the access key for a different address,
  or set `CONTACT_TO_EMAIL`.

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `POSTGRES_URL` | Vercel Postgres connection (auto-injected) | For storage |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms access key | For email |
| `CONTACT_TO_EMAIL` | Recipient override (defaults to vikrant@amvco.com.au) | Optional |

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
