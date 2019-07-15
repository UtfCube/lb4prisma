# Migration `20190714165041-todo`

This migration has been generated at 7/14/2019, 4:50:41 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Post";

DROP TABLE "public"."User";

CREATE TABLE "public"."TodoList"("id" text NOT NULL  ,"title" text NOT NULL DEFAULT '' ,"color" text   ,PRIMARY KEY ("id"));

CREATE TABLE "public"."Todo"("id" text NOT NULL  ,"title" text NOT NULL DEFAULT '' ,"desc" text   ,"isComplete" boolean NOT NULL DEFAULT false ,"createdAt" timestamp(3) NOT NULL  ,"updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,PRIMARY KEY ("id"));

CREATE TABLE "public"."TodoListImage"("id" text NOT NULL  ,"value" text NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

ALTER TABLE "public"."Todo" ADD COLUMN "todoList" text   REFERENCES "public"."TodoList"("id");

ALTER TABLE "public"."TodoListImage" ADD COLUMN "todoList" text   REFERENCES "public"."TodoList"("id");

CREATE UNIQUE INDEX "TodoList.id._UNIQUE" ON "public"."TodoList"("id")

CREATE UNIQUE INDEX "Todo.id._UNIQUE" ON "public"."Todo"("id")

CREATE UNIQUE INDEX "Todo.title._UNIQUE" ON "public"."Todo"("title")

CREATE UNIQUE INDEX "TodoListImage.id._UNIQUE" ON "public"."TodoListImage"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190714160844-init..20190714165041-todo
--- datamodel.dml
+++ datamodel.dml
@@ -6,21 +6,26 @@
 generator photon {
     provider = "photonjs"
 }
-model User {
+model TodoList {
     id    String  @default(cuid()) @id @unique
-    email String  @unique
-    name  String?
-    posts Post[]
+    title String
+    color String?
+    todos Todo[]
 }
-model Post {
-    id        String   @default(cuid()) @id @unique
-    createdAt DateTime @default(now())
-    updatedAt DateTime @updatedAt
-    published Boolean
-    title     String
-    content   String?
-    author    User?
-    temp      String
+model Todo {
+    id         String    @default(cuid()) @id @unique
+    title      String    @unique
+    desc       String?
+    isComplete Boolean
+    todoList   TodoList?
+    createdAt  DateTime  @default(now())
+    updatedAt  DateTime  @updatedAt
 }
+
+model TodoListImage {
+    id       String    @default(cuid()) @id @unique
+    value    String
+    todoList TodoList?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190714165041-todo)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190714165041-todo'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
