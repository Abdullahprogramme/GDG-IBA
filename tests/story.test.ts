import assert from "node:assert/strict";
import { test } from "node:test";
import { orderMilestones, milestoneTheme } from "../src/lib/story.ts";
test("timeline sorts chronologically without mutating records and replaces samples", () => {
 const input = [{id:"later",year:2026,sample:true},{id:"earlier",year:2025,sample:true}];
 assert.deepEqual(orderMilestones(input).map(item=>item.id),["earlier","later"]);
 assert.equal(input[0].id,"later");
 assert.deepEqual(orderMilestones([...input,{id:"confirmed",year:2024,sample:false}]).map(item=>item.id),["confirmed"]);
 assert.deepEqual(orderMilestones([]),[]);
});
test("milestone colours repeat in the prescribed order", () => {
 assert.deepEqual(Array.from({length:6},(_,index)=>milestoneTheme(index)),["blue","green","yellow","pink","blue","green"]);
});
