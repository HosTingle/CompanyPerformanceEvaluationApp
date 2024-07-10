const PROXY_CONFIG = 
[
    {
        context: 
        [
            "/path1",      
            "/path2",
        ],
        "target" : "https://localhost:4200", // I use 3000 for non-SSL
        "changeOrigin": true,  // helps on CORS Error in F12
        "logLevel": "debug",
        "rejectUnauthorzied": true, // or false if ok for you
        "secure": false,            // PROD must be "true", but DEV false else "UNABLE_TO_VERIFY_LEAF_SIGNATURE"
        "strictSSL": true,          // false is default
        "withCredentials": true     // required for Angular to send in cookie
    }
]
module.exports = PROXY_CONFIG;