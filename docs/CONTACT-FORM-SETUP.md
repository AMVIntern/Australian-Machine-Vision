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

## B. Email notification - SMTP (Microsoft 365)

The notification is sent over SMTP using Nodemailer, through the AMV Microsoft 365 mailbox.
No DNS or domain verification is required, but the mailbox must allow authenticated SMTP.

1. **Enable authenticated SMTP** for the sending mailbox (M365 disables it by default):
   - Microsoft 365 admin -> Users -> the mailbox -> Mail -> Manage email apps ->
     tick **Authenticated SMTP**.
   - If the account uses MFA, create an **app password** to use as `SMTP_PASS`.
2. Add these environment variables in Vercel (project -> Settings -> Environment
   Variables), for Production, Preview and Development:
   - `SMTP_HOST` = `smtp.office365.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = the mailbox address (for example `noreply@amvco.com.au`)
   - `SMTP_PASS` = the mailbox password or app password
   - `CONTACT_FROM_EMAIL` = optional, defaults to `SMTP_USER`. For M365 this should be the
     authenticated mailbox or an address it is allowed to send as.
3. The notification goes to vikrant@amvco.com.au by default. To change it, set
   `CONTACT_TO_EMAIL`. The email uses the submitter's address as reply-to, so you can
   reply directly.

Notes:
- Port 587 uses STARTTLS (the default here). Use 465 with `SMTP_SECURE=true` only if your
  provider requires implicit TLS.
- M365 requires the `from` address to be the authenticated mailbox, or one it has
  send-as permission for. If sends are rejected, set `CONTACT_FROM_EMAIL` to `SMTP_USER`.

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `POSTGRES_URL` | Vercel Postgres connection (auto-injected) | For storage |
| `SMTP_HOST` | SMTP server, e.g. `smtp.office365.com` | For email |
| `SMTP_PORT` | SMTP port, usually `587` | For email |
| `SMTP_USER` | Mailbox address used to authenticate and send | For email |
| `SMTP_PASS` | Mailbox password or app password | For email |
| `CONTACT_FROM_EMAIL` | Sender address (defaults to `SMTP_USER`) | Optional |
| `CONTACT_TO_EMAIL` | Recipient (defaults to vikrant@amvco.com.au) | Optional |

## Testing locally

```bash
vercel env pull .env.local   # pulls the env vars from Vercel into local
npm run dev
```
Submit the form, then check the Vercel Postgres data view and the inbox.

## Notes

- Storage and email run in parallel and each fails independently, so one provider issue
  does not lose the lead through the other channel.
- Dependencies used: `@vercel/postgres` (storage) and `nodemailer` (SMTP email).
