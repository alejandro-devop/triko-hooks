## useApplicationEnv (Triko)
This hook allows access to env variables and other constants for all the application
```ecmascript 6
const {
androidID,        // Id for the android bundle
  apiServer,      // Url for GraphQL server,
  appCode,        // Unique key for triko backend,
  // All keys related with google
  google: {
    apiKey,       // G-Libraries code
  },
  iosId,          // Id for ios bundle,
  ipFinderUrl,    // Url for library to fetch ip information
  // All keys related with pusher
  pusher: {
    auth,         // Url for pusher authentication
    channel,      // Pusher channel prefix,
    id,           // Pusher account id
    key,          // Pusher project key
    secret,       // Pusher connection key
    cluster,      // Pusher cluster name
  },
  // All translation related keys
  translation: {  
    group,        // Unique application translation code
  },
  version,        // Current application version
} = useApplicationConfig();
```

