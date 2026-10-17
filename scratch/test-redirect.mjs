async function check() {
  for (const url of ["/gmt-to-mest", "/gmt-to-mest/", "/mest-to-est", "/mest-to-est/"]) {
    try {
      const res = await fetch("http://127.0.0.1:4173" + url, { redirect: "manual" });
      console.log(`Status for ${url}:`, res.status, res.headers.get("location"));
    } catch (e) {
      console.error(e);
    }
  }
}
check();
