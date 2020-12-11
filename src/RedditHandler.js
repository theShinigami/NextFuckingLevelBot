/**
 * 
 * 
 * RedditHandler.js
 * 
 * 
 */

const snoowrap = require("snoowrap");
const Secrets = require("./Secrets");




 class RedditHandler {
     constructor() {
         this.r = null;


         // call
         this.initReddit();
     }


     initReddit() {
        this.r = new snoowrap({
            userAgent: Secrets.USER_AGENT,
            clientId: Secrets.CLIENT_ID,
            clientSecret: Secrets.CLIENT_SECRET,
            username: Secrets.REDDIT_USERNAME,
            password: Secrets.REDDIT_PASSWORD
          });
     }

     returnNextLevel(limit, subr, cb) {
         if (this.r != null) {
            
 
            this.r
                .getSubreddit(subr)
                .getHot({limit: limit})
                .then(data => {
                    for (let i=1; i<data.length; i++) {
                        cb(data[i]);
                    }
            });
         } else {
             return false;
         }
     }

     isGIF(data) {
        if (typeof data.preview !== 'undefined') {
          if (typeof data.preview.reddit_video_preview !== 'undefined') return data.preview.reddit_video_preview.is_gif;
          return false;
        }
        return false;
    
      }
    
 }


 module.exports.RedditHandler = RedditHandler;