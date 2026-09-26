<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep the public site as a single conversion-focused page with direct WhatsApp links; this avoids unnecessary persistence and preserves a fast emergency-booking path.
- Define all brand colors and typography as semantic tokens in `src/styles.css`; this keeps the industrial design consistent and theme-safe.
