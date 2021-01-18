import express from 'express';
import auth from '../../middleware/auth';

//Model
import Post from '../../models/post';

const router = express.Router();

//api/post 프론트로 올릴때 프론트랑 백앤드가 주소가 달라야..
router.get('/', async (req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
});

router.post('/', auth, async (req, res, next) => {
    try {
        console.log(req, "req");
        const { title, contents, fileUrl, creator } = req.body;//구조문의 문법으로 분해/자주쓰는 자바스크립트 문법
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator,
        });
        res.json(newPost);
    } catch (e) {
        console.log(e);
    }
});

export default router;