var express = require('express');
var router = express.Router();
var CommentController = require('../controllers/CommentController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    CommentController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    CommentController.show(req, res);
});

/*
 * POST :: replace with /:locationId/:parentCommentId?
 *
router.post('/', function (req, res) {
    CommentController.create(req, res);
});
 */

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    CommentController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    CommentController.remove(req, res);
});

/*
 * Create with Location and ParentComment
 */
router.post('/:locationId/:parentCommentId?', function (req, res) {
    CommentController.create(req, res);
});

/*
 * 
 */
router.get('/:id/withChildren', function (req, res) {
    CommentController.listChildren(req, res);
});

module.exports = router;
