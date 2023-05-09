// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
    // baseUrl: 'test.dms.onebmac.com/api/',
    // baseUrl: 'http://localhost/ikooba/e-dms/api/',
    // app_url: 'https://e-dms-app.netlify.app',
  
    // **********************************
    production: false,
    scheme: 'http://',
    baseUrl: 'localhost:8000/api/',
    app_url: 'http://localhost:3000/',
  
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
    },
    post: {
      main: 'posts',
      privatePost: 'posts/private',
      myPosts: 'myPosts',
      media: 'media',
      like: 'like',
      unlike: 'unlike',
      share: 'posts/share',
      save: 'posts/save',
      sharedPublic: 'posts/share/public',
      sharedPrivate: 'posts/share/private',
      allFriendsPost: 'posts/allFriendsPost'
    },
    comments: {
      getComments: 'post-comments/',
      main: 'comment',
      subComment: 'subComment',
      deleteComment: 'deleteComment/'
    },
    stories: {
      main: 'stories',
      singleMedia: 'stories/media/single/',
      singletext: 'stories/text/single/',
      storyMedia: "stories/media/",
      storyText: "stories/text/"
    },
    friends: {
      main: 'friends',
      confirmFriend: 'friends/confirm',
      removeFriend: 'removeFriend/'
    },
    user: {
      main: 'users'
    },
    notification: {
      main: 'notification',
      read: 'notification/single/',
      readAll: 'notification/markAll',
      delete: 'notification/delete/'
    },
    search: {
      main: 'search/'
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
  