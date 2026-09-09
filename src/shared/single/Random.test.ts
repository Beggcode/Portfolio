import { makeRandom } from "@/shared/single/Random";
import { describe, expect, it } from "vitest";

describe("makeRandom", () => {
	it("is deterministic for a seed", () => {
		const a = makeRandom(42);
		const b = makeRandom(42);
		expect([a(), a(), a()]).toEqual([b(), b(), b()]);
	});

	it("differs between seeds", () => {
		expect(makeRandom(1)()).not.toEqual(makeRandom(2)());
	});

	it("stays in [0, 1)", () => {
		const r = makeRandom(7);
		for (let i = 0; i < 1000; i++) {
			const n = r();
			expect(n).toBeGreaterThanOrEqual(0);
			expect(n).toBeLessThan(1);
		}
	});
});
