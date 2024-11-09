import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import bodyParser from 'body-parser';



const twitter_router = express.Router();

const twitterClient = new TwitterApi({
    consumer_key: 'xMZbvCmva1qU3jwgN6j6ZO9Fi',
    consumer_secret: 'KFtr8bJTLU80hEo1ANz48wbUUofppwOtMgcj8J4nkhK0PRUM8V',
    access_token: '1855213590870937600-Ns7dprOnKYYHqIqU3wPgijtD5yc2A8',
    access_token_secret: 'bSfNG8oB12qpJKqvZzzyArb8KiJArVNdCee91cDXDMoFC',
});

twitter_router.post('/api/post-tweet',  async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.json({ message: 'Tweet content cannot be empty' });
    }

    twitterClient.post('statuses/update', { status: content }, (err, data, response) => {
        if (err) {
            console.error('Error posting tweet:', err);
            return res.json({ message: 'Error posting tweet' });
        } else {
            return res.json({ message: 'Tweet posted successfully!' });
        }
    });
});


async function uploadImageToTwitter(imagePath) {
    const b64content = fs.readFileSync(imagePath, { encoding: 'base64' });

    return new Promise((resolve, reject) => {
        twitterClient.post('media/upload', { media_data: b64content }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.media_id_string);
            }
        });
    });
}

/*twitter_router.post('/api/post-tweet', upload.single('image'), async (req, res) => {
    const { content } = req.body;
    let mediaId = null;

    try {
        // אם יש תמונה, העלה אותה קודם לטוויטר
        if (req.file) {
            mediaId = await uploadImageToTwitter(req.file.path);
            fs.unlinkSync(req.file.path); // מחק את הקובץ המקומי לאחר ההעלאה
        }

        // פרסם את הציוץ
        const tweetData = {
            status: content,
            media_ids: mediaId ? [mediaId] : []
        };

        twitterClient.post('statuses/update', tweetData, (err) => {
            if (err) {
                console.error('Error posting tweet:', err);
                return res.json({ message: 'Error posting tweet' });
            } else {
                return res.json({ message: 'Tweet posted successfully!' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.json({ message: 'Error uploading image' });
    }
});
*/

export default twitter_router;