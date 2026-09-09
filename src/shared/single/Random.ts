// mulberry32, a published seeded PRNG. Same seed, same sequence — that's what
// keeps the skyline stable across reloads.
//
// It bumps a counter, then hashes it into a number in [0, 1). The bit twiddling
// is the hash: multiply and xor-shift scramble the counter so 1, 2, 3... come
// out looking unrelated. Treat it as a black box; the tests pin its behaviour.
export function makeRandom(seed: number): () => number {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
