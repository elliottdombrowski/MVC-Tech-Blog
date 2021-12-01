const router = require('express').Router();
const { Comment, Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

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
            ...req.body,
            proj_id: req.params.id,
        });

        res.status(200).json({ok: true});

    } catch (err) {
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