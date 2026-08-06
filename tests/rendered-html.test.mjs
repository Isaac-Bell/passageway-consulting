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
    /<title>Online Emotional Health Consulting for Women \| Passageway Consulting<\/title>/i,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/passagewayconsulting\.com\/?"\s*\/?\s*>/i,
  );
  assert.match(
    html,
    /<meta name="description" content="Kansas City-based online emotional health and life consulting for women/i,
  );
  assert.match(html, /<meta property="og:title"/i);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /<script type="application\/ld\+json">/i);
  assert.match(html, /"@type":"Organization"/i);
  assert.match(html, /Online emotional health consulting for women/i);
  assert.match(html, /Kansas City–based · Online worldwide/i);
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
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com\/<\/loc>/i);
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com\/online-emotional-health-consulting<\/loc>/i);
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com\/nervous-system-regulation-for-women<\/loc>/i);
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com\/online-womens-emotional-health-workshops<\/loc>/i);
  assert.match(body, /<loc>https:\/\/passagewayconsulting\.com\/self-compassion-for-women<\/loc>/i);
  assert.match(body, /<lastmod>2026-08-06T00:00:00\.000Z<\/lastmod>/i);
});

const searchPages = [
  {
    path: "/online-emotional-health-consulting",
    title: /Online Emotional Health Consulting for Women \| Passageway/i,
    heading: /Online emotional health consulting for women/i,
  },
  {
    path: "/nervous-system-regulation-for-women",
    title: /Nervous System Regulation Support for Women \| Passageway/i,
    heading: /Nervous system regulation support for women/i,
  },
  {
    path: "/online-womens-emotional-health-workshops",
    title: /Online Women(?:’|&#x27;|&apos;|')s Emotional Health Workshops \| Passageway/i,
    heading: /Online women(?:’|&#x27;|&apos;|')s emotional health workshops/i,
  },
  {
    path: "/self-compassion-for-women",
    title: /Self-Compassion Support for Women \| Free Reflection Guide/i,
    heading: /Self-compassion support for women/i,
  },
];

for (const page of searchPages) {
  test(`renders indexable search page: ${page.path}`, async () => {
    const response = await fetchSite(page.path);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(html, page.title);
    assert.match(html, page.heading);
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https:\\/\\/passagewayconsulting\\.com${page.path}"`,
        "i",
      ),
    );
    assert.match(html, /"@type":"Service"/i);
    assert.match(html, /"areaServed":"Worldwide"/i);
    assert.match(html, /Kansas City/i);
    assert.match(html, /Book online/i);
  });
}

test("renders development preview metadata", async () => {
  const response = await fetchSite("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});
