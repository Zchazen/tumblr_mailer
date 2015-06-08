var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Ws3dYlAoryy5U3seECXGxD6jnP0UTP6iZOIhrpATrinJN5XJEs',
  consumer_secret: '5oEcy1cKJWk6ie1x9HOPJGdE34bch8TV2Np97QbyUT1p7emnhq',
  token: 'XXXXXXXXXXXXXXXXXXX',
  token_secret: 'XXXXXXXXXXXXXXXXX'
});

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('oLVlSZPhZJRYR7xmAoRPRA');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
console.log(csvFile);
var emailTemplate = fs.readFileSync('email_template', 'utf-8');

function csvParse(csvFile) {
	var arrOfObj = [];
	var csvArr = csvFile.split("\n");
	var keys = csvArr.shift();
	for (var i = 0; i < csvArr.length; i++) {
		csvArr[i] = csvArr[i].split(",");
		arrOfObj.push(
			{"firstName": csvArr[i][0],
			"lastName": csvArr[i][1],
			"numMonthsSinceContact": csvArr[i][2],
			"emailAddress": csvArr[i][3]
		});
	}
	return arrOfObj;

}

var friendinfo = csvParse(csvFile));

var latestPosts = [];
client.posts('newprogrammerandblogger.tumblr.com', function(err, blog){
	for (var j = 0; j < blog.posts.length; j++) {
		if ((Math.abs(Date.now() - Date.prototype.getTime(blog.posts[j].date)) < 6.048e+8) {
			latestPosts.push(blog.posts[j]);
		}
	}
	//sendEmail??
});

var customizeTemplate = function(friendinfo, latestPosts) {
	var customemails = [];
		for (var i = 0; i < friendinfo.length; i++) {
			customemails.push = ejs.render(emailTemplate, {"firstName": friendinfo[i].firstName,  
    		"numMonthsSinceContact": friendinfo[i].numMonthsSinceContact
    		"latestPosts": latestPosts});
		}
		//sendEmail here to all people?!
	}

  function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
    	"latestposts": latestPosts;
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);   
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
 }





// tumblr_mailerOAuth Consumer Key:
// Ws3dYlAoryy5U3seECXGxD6jnP0UTP6iZOIhrpATrinJN5XJEs
// Secret Key:  5oEcy1cKJWk6ie1x9HOPJGdE34bch8TV2Np97QbyUT1p7emnhq   Explore API


//EXTRA WORDS
// function csvParse(csvFile) {
// 	var arrOfObj = [];
// 	var csvArr = csvFile.split("\n");
// 	var keys = csvArr.shift().split(",");
// 	for (var i = 0; i < csvArr.length; i++) {
// 		for (var j = 0; j < 4; j++) {
// 			arrOfObj[i] = ({keys[j]:csvArr[i][j]});
// 		}
// 	}
// }

// function csvParse(csvFile) {
// 	var arrOfObj = [];
// 	var csvArr = csvFile.split("\n");
// 	var columns = csvArr.shift().split(",");
// 	for (var people = 0; people < csvArr.length; people++) {
// 		for (var keys = 0; keys < 4; keys++) {
// 			arrOfObj[people] = {
// 				columns[keys]:csvArr[people][keys];
// 			};
// 		}
// 	}
// }