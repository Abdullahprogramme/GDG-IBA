import assert from "node:assert/strict";
import { test } from "node:test";
import { activeNavHref, confirmedExternalUrl, site } from "../src/data/site.ts";
test("unconfirmed links stay inert and external links require HTTPS", () => {
  assert.equal(confirmedExternalUrl(site.communityUrl), undefined);
  for (const href of [null, "", "javascript:alert(1)", "http://example.com", "not-a-link"]) assert.equal(confirmedExternalUrl(href), undefined);
  assert.equal(confirmedExternalUrl("https://example.com/join"), "https://example.com/join");
});
test("active navigation distinguishes home, About, inner routes and unrelated paths", () => {
  assert.equal(activeNavHref("/"), "/"); assert.equal(activeNavHref("/", "#about"), "/#about");
  assert.equal(activeNavHref("/events/sample-workshop"), "/events");
  assert.equal(activeNavHref("/events-other"), undefined); assert.equal(activeNavHref("/dev/foundation"), undefined);
});
