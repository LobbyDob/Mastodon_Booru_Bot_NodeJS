require('dotenv').config();
const Mastodon = require('mastodon-api');
const Danbooru = require('danbooru');
const fs = require('fs');
const https = require('https');

console.log("Image Upload Bot Starting...");

const authenticatedMastodon = new Mastodon(
    {
        client_key: process.env.CLIENT_KEY,
        client_secret: process.env.CLIENT_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        timeout_ms: 60 * 1000,
        api_url: process.env.API_URL,
    }
);

const booru = new Danbooru(`https://danbooru.donmai.us`);

Post();
setInterval(Post, 60 * 60000);

async function Post()
{
    // Perform a search
    const pageNumber = Math.floor(Math.random() * 40);
    const posts = await booru.posts({tags: '',page: pageNumber});
    // Select a random post from posts array
    const index = Math.floor(Math.random() * posts.length);
    const post = posts[index];
    // Get post's url and create a filename for it
    const url = booru.url(post.file_url);
    const source = booru.url(post.source);
    const name = `${post.md5}.${post.file_ext}`;
    // If the post's rating is questionable or explicit, flag it as NSFW
    var isQuestionable = false;
    if (post.rating == 'q' || post.rating == 'e')
    {
        isQuestionable = true;
    }
    
    const writeStream = fs.createWriteStream(name);

    //Download post's image
    https.get(url, response => 
        {
            response.pipe(writeStream);
        });

    //Allow time for write operation to finish
    setTimeout(function() {writeStream.close();}, 2000);
    //Upload image as a Mastodon post
    setTimeout(function() {MastodonPost(name, source, isQuestionable);}, 4000);
    //Delete image after uploading
    setTimeout(function() {DeleteFile(name);}, 6000);
}

function MastodonPost(name, source, isQuestionable)
{
    var statusString = `(Source: ${source})`;
    if (isQuestionable)
    {
        statusString = `NSFW\n${statusString}`;
    }
    
    const readStream = fs.createReadStream(name);
    authenticatedMastodon.post('media', { file: readStream}).then(resp =>
        {
        const id = resp.data.id;
        authenticatedMastodon.post('statuses', {status: `${statusString}`, media_ids: [id]}, (error, data) => 
        {
            if (error)
            {
                console.error(error);
            }
            else
            {
                fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
                console.log(`ID: ${data.id}\nTimestamp: ${data.created_at}\nContent: ${data.content}`);
            }
        })});  
    setTimeout(function() {readStream.close();}, 2000);
}

function DeleteFile(name)
{
    fs.unlink(name, function(err)
    {
        if (err)
        {
            console.error(err);
        }
    });
}
