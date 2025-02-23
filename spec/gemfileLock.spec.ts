import { gemfileLockMapper } from "@/gemfileLock";
import { Dependency } from "@/types";
import { extractDependency } from "@/utils";

describe("extractDependency", () => {
  it.each([
    ["bundler (~> 2.4)", { name: "bundler", requirements: "~> 2.4" }],
    ["activerecord (= 7.0.4.3)", { name: "activerecord", requirements: "= 7.0.4.3" }],
  ])("should return dependency", (line: string, expected: Dependency) => {
    const dep = extractDependency(line, gemfileLockMapper);

    expect(dep).not.toBeUndefined();
    expect(dep?.name).toBe(expected?.name);
    expect(dep?.requirements).toBe(expected?.requirements);
  });
});
