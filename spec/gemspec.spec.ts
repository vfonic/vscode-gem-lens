import { gemspecMapper } from "@/gemspec";
import { Dependency } from "@/types";
import { extractDependency } from "@/utils";

describe("extractDependency", () => {
  it.each([
    ['  spec.add_development_dependency "bundler", "~> 2.0"', { name: "bundler", requirements: "~> 2.0" }],
    ['  gem "pry", "~> 0.12"', { name: "pry", requirements: "~> 0.12" }],
    [`  gem "coveralls", "~> 0.8", require: false`, { name: "coveralls", requirements: "~> 0.8" }],
  ])("should return dependency", (line: string, expected: Dependency) => {
    const dep = extractDependency(line, gemspecMapper);

    expect(dep).not.toBeUndefined();
    expect(dep?.name).toBe(expected?.name);
    expect(dep?.requirements).toBe(expected?.requirements);
  });

  it.each([["foo bar"]])("should return undefined", (line: string) => {
    const dep = extractDependency(line, gemspecMapper);
    expect(dep).toBeUndefined();
  });
});
