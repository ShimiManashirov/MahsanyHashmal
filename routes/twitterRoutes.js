import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

const twitter_router = express.Router();

const twitterClient = new TwitterApi({
    consumer_key: 'xMZbvCmva1qU3jwgN6j6ZO9Fi',
    consumer_secret: 'KFtr8bJTLU80hEo1ANz48wbUUofppwOtMgcj8J4nkhK0PRUM8V',
    access_token: '1855213590870937600-Ns7dprOnKYYHqIqU3wPgijtD5yc2A8',
    access_token_secret: 'bSfNG8oB12qpJKqvZzzyArb8KiJArVNdCee91cDXDMoFC',
});

/**
 * @swagger
 * /api/post-tweet:
 *   post:
 *     summary: Post a tweet
 *     description: Post a tweet without any image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the tweet
 *     responses:
 *       200:
 *         description: Successfully posted the tweet
 *       400:
 *         description: Missing or invalid tweet content
 */
twitter_router.post('/api/post-tweet', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.json({ message: 'Tweet content cannot be empty' });
    }

    try {
        await twitterClient.v2.tweet(content);
        return res.json({ message: 'Tweet posted successfully!' });
    } catch (err) {
        console.error('Error posting tweet:', err);
        return res.json({ message: 'Error posting tweet' });
    }
});

async function uploadImageToTwitter(imagePath) {
    const b64content = fs.readFileSync(imagePath, { encoding: 'base64' });

    return new Promise((resolve, reject) => {
        twitterClient.v1.uploadMedia(b64content, { type: 'png' }) 
            .then((mediaId) => {
                resolve(mediaId);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * @swagger
 * /api/post-tweet:
 *   post:
 *     summary: Post a tweet with an image
 *     description: Post a tweet with an optional image attached.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the tweet
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image to be uploaded
 *     responses:
 *       200:
 *         description: Successfully posted the tweet with the image
 *       400:
 *         description: Missing or invalid tweet content or image
 *       500:
 *         description: Error uploading the image
 */
twitter_router.post('/api/post-tweet', upload.single('image'), async (req, res) => {
    const { content } = req.body;
    let mediaId = null;

    try {
        if (req.file) {
            mediaId = await uploadImageToTwitter(req.file.path);
            fs.unlinkSync(req.file.path); 
        }

        const tweetData = {
            status: content,
            media_ids: mediaId ? [mediaId] : []
        };

        await twitterClient.v2.tweet(tweetData);
        return res.json({ message: 'Tweet posted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ message: 'Error uploading image' });
    }
});

export default twitter_router;
