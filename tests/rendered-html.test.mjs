import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

let workerPromise;

function loadWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }

  return workerPromise;
}

async function fetchSite(path, accept = "text/html") {
  const worker = await loadWorker();

  return worker.fetch(
    new Request(`https://passagewayconsulting.com${path}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders complete indexable SEO metadata", async () => {
  const response = await fetchSite("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, developmentPreviewMeta);
  assert.match(
    html,
    /<title>Emotional Health Consulting for Women \| Passageway Consulting<\/title>/i,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/passagewayconsulting\.com\/?"\s*\/?\s*>/i,
  );
  assert.match(
    html,
    /<meta name="description" content="Compassionate emotional health and life consulting for women/i,
  );
  assert.match(html, /<meta property="og:title"/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /<script type="application\/ld\+json">/i);
  assert.match(html, /"@type":"Organization"/i);
  assert.match(html, /Emotional health consulting for women/i);
});

test("serves crawler instructions with the canonical sitemap", async () => {
  const response = await fetchSite("/robots.txt", "text/plain");
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /^User-Agent: \*/im);
  assert.match(body, /^Allow: \/$/im);
  assert.match(
    body,
    /^Sitemap: https:\/\/passagewayconsulting\.com\/sitemap\.xml$/im,
  );
  assert.match(body, /^Host: https:\/\/passagewayconsulting\.com$/im);
});

test("serves a canonical XML sitemap", async () => {
  const response = await fetchSite("/sitemap.xml", "application/xml");
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/i);
  assert.match(body, /<urlset[^>]*>/i);
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com<\/loc>/i);
  assert.match(body, /<lastmod>2026-08-06T00:00:00\.000Z<\/lastmod>/i);
});

test("renders development preview metadata", async () => {
  const response = await fetchSite("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});
