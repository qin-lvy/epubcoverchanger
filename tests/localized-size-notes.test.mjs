import assert from "node:assert/strict";
import test from "node:test";

import { COVER_SIZES } from "../src/lib/cover-sizes.ts";
import { localizedSizeNote } from "../src/lib/localized-size-notes.ts";

test("English preset notes stay in English", () => {
  for (const size of COVER_SIZES) {
    assert.equal(localizedSizeNote("en", size.id, size.note), size.note);
  }
});

test("Portuguese and Spanish have their own note for every preset", () => {
  for (const size of COVER_SIZES) {
    for (const locale of ["pt", "es"]) {
      const note = localizedSizeNote(locale, size.id, size.note);
      assert.notEqual(note, size.note, `${locale} note missing for ${size.id}`);
    }
  }
  assert.match(localizedSizeNote("es", "kindle", ""), /recomienda/);
  assert.match(localizedSizeNote("pt", "kindle", ""), /recomenda/);
});
