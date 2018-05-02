const PROXY_CONFIG = [
    {
        "context": [
            "/auth",
            "/api"
        ],
        "target": "http://localhost:4000",
        "secure": false
    }
];

module.exports = PROXY_CONFIG;