import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { FileSystemService } from "../../src/services/fileSystemService.ts";
import { path } from "../../deps.ts";

Deno.test('FileSystemService.path - "root" fs test', async () => {

  assertEquals(FileSystemService.path('/'), Deno.cwd(), 'root path should be equal to current working directory');
  assertEquals(FileSystemService.path('/users'), path.join(Deno.cwd(), 'users'), 'user path should be equal to current working directory');
  assertEquals(FileSystemService.path('../etc'), path.join(Deno.cwd(), 'etc'), 'path escalated from current working directory');
  assertEquals(FileSystemService.path('../../etc'), path.join(Deno.cwd(), 'etc'), 'path escalated from current working directory');
  assertEquals(FileSystemService.path('mod.ts'), path.join(Deno.cwd(), 'mod.ts'),'mod.ts should be in current working directory');
});

Deno.test("FileSystemService.isDir", async () => {
  assertEquals(
    FileSystemService.isDir('/'),
    true,
    `${Deno.cwd()} is not a directory`,
  );
});

Deno.test("FileSystemService.isFile", async () => {
  assertEquals(
    FileSystemService.isFile('/LICENCE'),
    true,
    `Put the EUPL-1.2 licence back where you found it, ${path.join(Deno.cwd(), 'LICENCE')} `,
  );
});

Deno.test('FileSystemService.write', async () => {
  const filePath =  'test.txt';
  const fileContent = 'Hello World';

  assertEquals(FileSystemService.write(filePath, fileContent), true, `File ${filePath} was not written`);

});

Deno.test('FileSystemService.delete', async () => {
  assertEquals(FileSystemService.delete('test.txt'), true, 'File not deleted');
});


Deno.test('FileSystemService.read', async () => {
  const filePath = 'test.txt';
  const fileContent = 'Hello World';

  assertEquals(FileSystemService.write(filePath, fileContent), true);

  assertEquals(
    FileSystemService.read(filePath),
    fileContent,
    `${filePath} should contain ${fileContent}`,
  );
});

Deno.test('FileSystemService.list', async () => {

  const files = FileSystemService.list('/');
  assertEquals(files.length > 0, true);

  files.forEach((file) => {
    assertEquals(FileSystemService.isFile(file) || FileSystemService.isDir(file), true, `${file} is not a file or directory`);
  });

});

Deno.test('FileSystemService.ensureDir', async() => {

  assertEquals(FileSystemService.ensureDir('testing/testing'), true, 'testing/testing should be created');
  assertEquals(FileSystemService.isDir('testing/testing'), true, `${path.join(Deno.cwd(), 'testing/testing')} is not a directory`);
  assertEquals(FileSystemService.isFile('testing/testing'), false, 'testing/testing should not be a file');
  assertEquals(FileSystemService.delete('testing'), false, 'Could not delete testing');
  assertEquals(FileSystemService.delete('testing/testing'), true, 'Could not delete testing');
  assertEquals(FileSystemService.delete('testing'), true, 'Could not delete testing');

});

