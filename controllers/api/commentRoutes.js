const router = require('express').Router();
const { Comment, Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/display', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update(req.body, {where: {id: req.params.id}});

        res.status(200).json({ok: true});
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.post('/:id', withAuth, async (req, res) => {
    try {
        const createComment = await Comment.create({
            body: req.body.comment,
            user_id: req.session.user_id,
            comment_date_created: req.body.comment_date_created,
            proj_id: req.params.id,
        });

        res.status(200).json({ok: true});

    } catch (err) {
        console.log('error ' + err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: { id: req.params.id, user_id: req.session.user_id }
        });
        res.status(200).json({ok: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;