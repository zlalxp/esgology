# DNS for esgology.co.kr

Keep the domain at the current registrar. Do not transfer it to GitHub.

After GitHub Pages is enabled on `zlalxp/esgology`:

1. Apex `esgology.co.kr`
   - Type: ALIAS/ANAME if the registrar supports it, otherwise A records GitHub publishes for Pages
   - GitHub Pages IPv4 (current public docs): `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153`
2. `www.esgology.co.kr`
   - Type: CNAME
   - Value: `zlalxp.github.io`
3. Do not point this domain at the Render ESG CHECK service.
4. Do not 301 `esgcheck.kr` → `esgology.co.kr`.

Mail (`@esgology.co.kr`) stays off until a business is registered.

Verify:

- https://esgology.co.kr/ returns this static home
- https://esgcheck.kr/ remains the product app
