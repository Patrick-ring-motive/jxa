ObjC.import('stdio');

function run() {
  // Hardcoded placeholder for what will eventually be a submitted DSL script.
  const script = "print 1 + 1";

  $.puts("dslementary: executing hardcoded script");
  $.puts("script: " + script);
  $.puts("result: 2");

  


  try {
    const safari = Application('Safari');
    safari.activate();
    safari.openLocation('https://example.com');
    delay(2);
    $.puts("ok");
  } catch (e) {
    $.puts("error " + e.errorNumber + ": " + e.message);
  }



  


}

run();
