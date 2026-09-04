ObjC.import('stdio');

function run() {
  // Hardcoded placeholder for what will eventually be a submitted DSL script.
  const script = "print 1 + 1";

  $.puts("dslementary: executing hardcoded script");
  $.puts("script: " + script);
  $.puts("result: 2");
}

run();
