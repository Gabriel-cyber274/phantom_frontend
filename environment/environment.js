// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
    // baseUrl: 'test.dms.onebmac.com/api/',
    // baseUrl: 'http://localhost/ikooba/e-dms/api/',
    // app_url: 'https://e-dms-app.netlify.app',
  
    // **********************************
    production: false,
    scheme: 'https://',
    // baseUrl: 'localhost:8000/api/',
    baseUrl: 'phantomlaravel.org.ng/api/',
    app_url: 'http://localhost:3000/',
    socketUrl: 'http://localhost:4000',
    fileUrl: '127.0.0.1:8000/',
  
    // https://phantomlaravel.org.ng/laravel
    // *************************************
    // production: true,
    // scheme: 'https://',
    // baseUrl: 'back.dms.bmactest.com/api/',
    // app_url: 'https://dms.bmactest.com/',
    // **************************************
    auth: {
      login: 'login',
      googleLogin: 'login/g',
      register: 'register',
      logout: 'logout',
      info: 'userInfo',
      changeAvatar: 'changeAvatar',
      addAvatar: 'addAvatar'
    },
    reviews: {
      main: 'goodReviews'
    }, 
    link: {
      get: 'getLink',
      create: 'createLink',
      name: 'linkName/'
    },
    room: {
      create: 'createRooom',
      recievedRooms: 'recievedRooms',
      sentRooms: 'sentRooms',
      checkRoom: 'checkRoom/',
      blockUser: 'blockUser',
      reportUser: 'reportUser',
      allowLinks: 'allowLinks',
      revealProfile: 'revealProfile'
    },
    messages: {
      getMessage: 'getMessage/',
      sendMessage: 'sendMessage',
      sendReply: 'sendReply',
      read: 'read/',
      voiceNote: 'voiceNote',
      voicenoteGet: 'voicenotes/'
    },

    tutorial: {
      main: 'tutorial'
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  