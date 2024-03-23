-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EnglishWordPracWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "jp_title" TEXT NOT NULL,
    "en_title" TEXT NOT NULL,
    "study_year" TEXT NOT NULL DEFAULT '',
    "memo" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnglishWordPracWord_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "EnglishWordPracSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EnglishWordPracWord" ("created_at", "en_title", "id", "jp_title", "memo", "row", "session_id", "study_year", "updated_at") SELECT "created_at", "en_title", "id", "jp_title", "memo", "row", "session_id", "study_year", "updated_at" FROM "EnglishWordPracWord";
DROP TABLE "EnglishWordPracWord";
ALTER TABLE "new_EnglishWordPracWord" RENAME TO "EnglishWordPracWord";
CREATE UNIQUE INDEX "EnglishWordPracWord_session_id_row_key" ON "EnglishWordPracWord"("session_id", "row");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
