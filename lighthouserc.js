// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      // Build and start a local Next.js production server for the audit
      startServerCommand: "npm run build && npm run start",
      url: [
        "http://localhost:3000/",
        // Add a mock post URL here to test the dynamic route performance
        // "http://localhost:3000/post/test-post-slug",
      ],
      numberOfRuns: 3, // Runs 3 times to prevent anomalous scores
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        // Enforce 95+ scores across key metrics
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
