# freelance-scope-cli

Scan a client brief for common scope-creep phrases *before* you quote a fixed price. Zero dependencies, runs anywhere Node runs.

## Why

Most scope creep is visible in the first message, if you know what to look for: "unlimited revisions", "ongoing support", "similar to X", "pay once it's done". This tool flags those phrases and tells you what to ask for instead.

## Install

```bash
npx freelance-scope-cli "I need a simple app, similar to Uber, with unlimited revisions"
```

or install globally:

```bash
npm install -g freelance-scope-cli
freelance-scope < brief.txt
```

## Usage

```bash
# as an argument
freelance-scope "Quick fix needed ASAP, pay you once I'm happy with it"

# or pipe a brief in
cat client-email.txt | freelance-scope
```

Output:

```
Found 3 scope-creep red flags:

1. "Simple/quick/just" often hides real scope — ask for the full feature list before pricing.
2. "Similar to X" without specifics — ask exactly which features of X are in scope.
3. Unlimited revisions — cap it (e.g. "up to 3 rounds") or scope will never close.

Ask clarifying questions before quoting a fixed price.
```

## More free tools for freelancers

- [Freelancer Starter Kit](https://kleogeos.github.io/freelancer-tools/kit.html) — invoice, contract, and proposal templates
- [freelance-invoice-cli](https://github.com/kleogeos/freelance-invoice-cli) — generate HTML invoices from JSON, zero deps
- [Support this project](https://kleogeos.github.io/freelancer-tools/donate.html)

## License

MIT
