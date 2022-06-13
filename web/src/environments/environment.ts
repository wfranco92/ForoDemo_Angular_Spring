// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDs1zSSg0p9sGSrCt9LV1cH8MBC2EzpmZE",
    authDomain: "reto-sofka-questions.firebaseapp.com",
    projectId: "reto-sofka-questions",
    storageBucket: "reto-sofka-questions.appspot.com",
    messagingSenderId: "1012633543738",
    appId: "1:1012633543738:web:d5fdeca1230986da018103"
  },
  apiUrl: 'http://localhost:8080/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
