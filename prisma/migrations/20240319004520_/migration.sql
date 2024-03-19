-- CreateTable
CREATE TABLE "EnglishWordPracSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "row" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "memo" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EnglishWordPracWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "jp_title" TEXT NOT NULL,
    "en_title" TEXT NOT NULL,
    "study_year" TEXT NOT NULL,
    "memo" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnglishWordPracWord_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "EnglishWordPracSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EnglishWordPracSession_row_key" ON "EnglishWordPracSession"("row");

-- CreateIndex
CREATE UNIQUE INDEX "EnglishWordPracWord_session_id_row_key" ON "EnglishWordPracWord"("session_id", "row");
