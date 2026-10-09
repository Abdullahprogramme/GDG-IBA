import assert from "node:assert/strict";
import { test } from "node:test";
import { eventDate, featuredEvent, fillTrack, orderEvents, orderTeam, preferConfirmed } from "../src/lib/home.ts";
import { activeNavHref, navigationHref } from "../src/data/site.ts";

test("confirmed chapter records replace samples without mutating the source", () => {
  const sample = { id: "demo", sample: true }, real = { id: "real", sample: false };
  const records = [sample, real];
  assert.deepEqual(preferConfirmed(records), [real]);
  assert.deepEqual(records, [sample, real]);
  assert.deepEqual(preferConfirmed([sample]), [sample]);
  assert.deepEqual(preferConfirmed([]), []);
});
test("crew leadership appears first even when editorial order is different", () => {
  const records = [
    { name: "Member", isLead: false, isCoLead: false, order: 0 },
    { name: "Co-Lead", isLead: false, isCoLead: true, order: 20 },
    { name: "Lead", isLead: true, isCoLead: false, order: 30 },
  ];
  assert.deepEqual(orderTeam(records).map(person => person.name), ["Lead", "Co-Lead", "Member"]);
  assert.equal(records[0].name, "Member");
});
test("event previews sort newest first and prioritise an upcoming feature", () => {
  const past = { date: "2027-03-01T09:00:00Z", status: "past" as const };
  const next = { date: "2027-02-01T09:00:00Z", status: "upcoming" as const };
  assert.deepEqual(orderEvents([next, past]), [past, next]);
  assert.equal(featuredEvent([past, next]), next);
  assert.equal(featuredEvent([past]), past);
  assert.equal(featuredEvent([]), undefined);
  assert.equal(eventDate("2027-01-15T22:00:00Z"), "16 Jan 2027");
});
test("homepage navigation falls back to live sections until full routes exist", () => {
  assert.equal(navigationHref({ label: "Events", href: "/events", available: false }), "/#events");
  assert.equal(navigationHref({ label: "Events", href: "/events", available: true }), "/events");
  assert.equal(navigationHref({ label: "Story", href: "/our-story", available: false }), undefined);
  for (const [hash, href] of [["#crew", "/team"], ["#events", "/events"], ["#voices", "/speakers"], ["#gallery", "/gallery"], ["#join", "/contact"]]) assert.equal(activeNavHref("/", hash), href);
});
test("marquee fill distinguishes decorative copies and handles no records", () => {
  const items = [{ id: "one" }, { id: "two" }];
  const filled = fillTrack(items);
  assert.equal(filled.length, 8);
  assert.equal(filled.filter(item => item.copy === 0).length, 2);
  assert.equal(filled[2].item, items[0]);
  assert.deepEqual(fillTrack([]), []);
});
