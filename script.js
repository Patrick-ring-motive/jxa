ObjC.import('stdio');

function run() {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;

  const base = "http://localhost:4444";

  // Speaks the W3C WebDriver wire protocol to safaridriver via curl,
  // shelling out through Standard Additions rather than sending Apple
  // Events to Safari — this is what keeps it off the Automation TCC gate.
  function wd(method, path, body) {
    let cmd = "curl -s -X " + method + " '" + base + path + "'";
    if (body !== undefined) {
      const json = JSON.stringify(body).replace(/'/g, "'\\''");
      cmd += " -H 'Content-Type: application/json' -d '" + json + "'";
    }
    const raw = app.doShellScript(cmd);
    if (!raw) return {};
    return JSON.parse(raw);
  }

  let sessionId;

  try {
    $.puts("dslementary: creating WebDriver session");
    const session = wd("POST", "/session", {
      capabilities: { alwaysMatch: { browserName: "Safari" } }
    });

    if (!session.value || !session.value.sessionId) {
      $.puts("error: no sessionId in response: " + JSON.stringify(session));
      return;
    }

    sessionId = session.value.sessionId;
    $.puts("session: " + sessionId);

    wd("POST", "/session/" + sessionId + "/url", { url: "https://example.com" });

    const title = wd("GET", "/session/" + sessionId + "/title");
    $.puts("title: " + title.value);

    const body = wd("POST", "/session/" + sessionId + "/execute/sync", {
      script: "return document.body.innerText.slice(0, 200);",
      args: []
    });
    $.puts("body preview: " + body.value);

    $.puts("dslementary: result 2 (placeholder DSL output retained)");
  } catch (e) {
    $.puts("error: " + e.message);
  } finally {
    if (sessionId) {
      wd("DELETE", "/session/" + sessionId, undefined);
      $.puts("dslementary: session closed");
    }
  }
}

run();
