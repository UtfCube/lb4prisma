# Migration `20190714160844-init`

This migration has been generated at 7/14/2019, 4:08:44 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User"("id" text NOT NULL  ,"email" text NOT NULL DEFAULT '' ,"name" text   ,PRIMARY KEY ("id"));

CREATE TABLE "public"."Post"("id" text NOT NULL  ,"createdAt" timestamp(3) NOT NULL  ,"updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,"published" boolean NOT NULL DEFAULT false ,"title" text NOT NULL DEFAULT '' ,"content" text   ,"temp" text NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

ALTER TABLE "public"."Post" ADD COLUMN "author" text   REFERENCES "public"."User"("id");

CREATE UNIQUE INDEX "User.id._UNIQUE" ON "public"."User"("id")

CREATE UNIQUE INDEX "User.email._UNIQUE" ON "public"."User"("email")

CREATE UNIQUE INDEX "Post.id._UNIQUE" ON "public"."Post"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190714160844-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,26 @@
+datasource db {
+    provider = "postgresql"
+    url      = "postgresql://postgres:postgres@localhost:5432/prismatest?schema=public"
+}
+
+generator photon {
+    provider = "photonjs"
+}
+
+model User {
+    id    String  @default(cuid()) @id @unique
+    email String  @unique
+    name  String?
+    posts Post[]
+}
+
+model Post {
+    id        String   @default(cuid()) @id @unique
+    createdAt DateTime @default(now())
+    updatedAt DateTime @updatedAt
+    published Boolean
+    title     String
+    content   String?
+    author    User?
+    temp      String
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190714160844-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190714160844-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
