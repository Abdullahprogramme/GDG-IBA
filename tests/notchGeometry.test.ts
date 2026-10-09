import assert from "node:assert/strict";
import { test } from "node:test";
import { createNotchPath, NOTCH_POSITIONS } from "../src/components/shapes/notchGeometry.ts";

test("every combination of step corners stays inside the card at review widths", () => {
  for (const width of [16, 288, 640, 768, 1024, 1440]) {
    const height = width === 16 ? 16 : 280;
    for (let mask = 0; mask < 16; mask++) {
      const notches = NOTCH_POSITIONS.filter((_, i) => mask & (1 << i));
      const path = createNotchPath({ width, height, notches });
      assert.ok(path.startsWith("M") && path.endsWith("Z"));
      assert.ok(!/NaN|Infinity/.test(path));
      const coordinates = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      for (let i = 0; i < coordinates.length; i += 2) {
        assert.ok(coordinates[i] >= 1.5 && coordinates[i] <= width - 1.5);
        assert.ok(coordinates[i + 1] >= 1.5 && coordinates[i + 1] <= height - 1.5);
      }
      // Four outer joins plus two additional joins per cut corner.
      assert.equal((path.match(/Q/g) ?? []).length, 4 + notches.length * 2);
    }
  }
});

test("top and bottom label tabs remain closed, rounded and distinct", () => {
  for (const width of [288, 640, 1440]) {
    const top = createNotchPath({ width, height: 240, type: "tab", tabPosition: "top-left" });
    const bottom = createNotchPath({ width, height: 240, type: "tab", tabPosition: "bottom-left" });
    assert.notEqual(top, bottom);
    for (const path of [top, bottom]) {
      assert.equal((path.match(/Q/g) ?? []).length, 6);
      assert.ok(path.endsWith("Z") && !/NaN|Infinity/.test(path));
    }
  }
});

test("resizing changes the geometry and rejects unusable measurements", () => {
  assert.notEqual(createNotchPath({ width: 288, height: 240 }), createNotchPath({ width: 640, height: 240 }));
  for (const width of [0, -1, NaN, Infinity]) assert.throws(() => createNotchPath({ width, height: 240 }), RangeError);
  assert.throws(() => createNotchPath({ width: 640, height: 240, radius: -1 }), RangeError);
});
