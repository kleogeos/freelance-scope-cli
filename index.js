#!/usr/bin/env node
"use strict";

const RED_FLAGS = [
  { re: /unlimited revisions?/i, msg: "Unlimited revisions — cap it (e.g. \"up to 3 rounds\") or scope will never close." },
  { re: /ongoing support|free support/i, msg: "Open-ended support promise — define a fixed support window (e.g. \"14 days post-delivery\")." },
  { re: /\bASAP\b|urgent(ly)?|right away/i, msg: "Urgency language with no deadline — ask for a hard date before quoting." },
  { re: /simple|quick|just a|small (job|task|fix)/i, msg: "\"Simple/quick/just\" often hides real scope — ask for the full feature list before pricing." },
  { re: /similar to|like \[?(competitor|this site|that app)\]?/i, msg: "\"Similar to X\" without specifics — ask exactly which features of X are in scope." },
  { re: /pay (you )?(after|once|when)\b/i, msg: "Payment conditional on open-ended delivery — require a deposit or milestone split." },
  { re: /full[- ]?stack|end[- ]?to[- ]?end|complete (platform|system|solution)/i, msg: "Broad end-to-end ask — break it into milestones, don't quote the whole thing as one task." },
  { re: /no budget (yet|set)|flexible budget|depends on (quality|quote)/i, msg: "No fixed budget stated — get a number or range before writing a proposal." },
  { re: /might (also|later) need|maybe (also|later)/i, msg: "\"Might also need\" signals likely future scope creep — price only what's written, quote add-ons separately." },
  { re: /revisions? until (you'?re|you are|client is) (happy|satisfied)/i, msg: "Revisions tied to subjective satisfaction, not a count — this has no natural end point." },
];

function analyze(text) {
  return RED_FLAGS.filter((f) => f.re.test(text));
}

function main() {
  const arg = process.argv.slice(2).join(" ");
  if (arg) {
    report(arg);
    return;
  }
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => (input += chunk));
  process.stdin.on("end", () => report(input));
  if (process.stdin.isTTY) {
    console.log("Paste the client's brief, then Ctrl+D:");
  }
}

function report(text) {
  const hits = analyze(text);
  if (hits.length === 0) {
    console.log("No common scope-creep phrases found. Still confirm deliverables, revision count, and deadline in writing.");
    return;
  }
  console.log(`Found ${hits.length} scope-creep red flag${hits.length > 1 ? "s" : ""}:\n`);
  hits.forEach((h, i) => console.log(`${i + 1}. ${h.msg}`));
  console.log("\nAsk clarifying questions before quoting a fixed price.");
}

main();
