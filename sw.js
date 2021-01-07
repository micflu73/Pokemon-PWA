// Install the SW
self.addEventListener("install", async (e) => {
    console.log("SW installed");
})

// Listen for fetching request
self.addEventListener("fetch", async (e) => {
    console.log(`SW fetch: ${e.request.url}`);
})

// Activate the SW
self.addEventListener("activate", async (e) => {
    console.log("SW activate");
})
