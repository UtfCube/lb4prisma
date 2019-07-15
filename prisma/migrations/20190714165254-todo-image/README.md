# Migration `20190714165254-todo-image`

This migration has been generated at 7/14/2019, 4:52:54 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."TodoListImage" DROP COLUMN "todoList";

ALTER TABLE "public"."TodoList" ADD COLUMN "image" text   REFERENCES "public"."TodoListImage"("id");
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190714165041-todo..20190714165254-todo-image
--- datamodel.dml
+++ datamodel.dml
@@ -7,12 +7,13 @@
     provider = "photonjs"
 }
 model TodoList {
-    id    String  @default(cuid()) @id @unique
+    id    String         @default(cuid()) @id @unique
     title String
     color String?
     todos Todo[]
+    image TodoListImage?
 }
 model Todo {
     id         String    @default(cuid()) @id @unique
```

## Photon Usage

You can use a specific Photon built for this migration (20190714165254-todo-image)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190714165254-todo-image'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
