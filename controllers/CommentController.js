var CommentModel = require('../models/CommentModel.js');
var LocationModel = require('../models/LocationModel.js');

var Q = require('q');
var async = require('async');

var mongoose = require('mongoose');
mongoose.Promise = Q.Promise;

/**
 * CommentController.js
 *
 * @description :: Server-side logic for managing Comments.
 */
module.exports = {

    /**
     * CommentController.list()
     */
    list: function (req, res) {
        CommentModel.find(function (err, Comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            return res.json(Comments);
        });
    },

    /**
     * CommentController.listChildren()
     */
    listChildren: function (req, res) {
        CommentModel.findOne({_id: req.params.id})
          .populate({
            path: 'children' ,
            model: 'Comment'
          })
          .then( function (Comment) {
            return res.json(Comment);
          })
          .catch( function (err) {
            return res.status(500).json({
              message: 'Error when getting Comment with children',
              error: err
            });
          })
    },

    /**
     * CommentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }
            return res.json(Comment);
        });
    },

    /**
     * CommentController.create() : '/:locationId/:parentCommentId?'
     * TODO: Promise가 왜 안먹히지.... Promise 로 깔끔하게 해보자.
     */
    create: function (req, res) {
        LocationModel.findOne({_id: req.params.locationId}, function (err, _location) {
          if (!req.params.parentCommentId) {
            var Comment = new CommentModel({
              isRoot: req.params.parentCommentId,
              content: req.body.content,
              location: _location,
              created_at: Date.now()
            });

            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating Comment',
                        error: err
                    });
                }
                return res.status(201).json(Comment);
            });
          } else {
            CommentModel.findOne({_id: req.params.parentCommentId}, function (err, _parent) {
              var Comment = new CommentModel({
                isRoot: req.params.parentCommentId,
                content: req.body.content,
                location: _location,
                parentComment: _parent,
                created_at: Date.now()
              });

              Comment.save(function (err, Comment) {
                  if (err) {
                      return res.status(500).json({
                          message: 'Error when creating Comment',
                          error: err
                      });
                  }

                  _parent.children.push(Comment);
                  _parent.save();
                  return res.status(201).json(Comment);
              });
            });
          }
        });
              /*
        var 
          location = null
        , parentComment = null;

        var queryLocation = LocationModel.findOne({_id: req.params.locationId});
        queryLocation.then( (err, _location) => location = _location )
          .catch( err => console.error(err) );

        var queryParentComment = CommentModel.findById(req.params.parentCommentId);
        queryParentComment
          .then( _parent => parentComment = _parent )
          .catch( err => parentComment = null );

        Q.fcall( function () { queryLocation.exec() } ) 
          .then( function () { queryParentComment.exec() } )
          .then( function () {
            console.log('comment create', {
              location: location, 
              parentComment: parentComment
            });

            var Comment = new CommentModel({
              isRoot: req.params.parentCommentId,
              content: req.body.content,
              location: location,
              parentComment: parentComment
            });

            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating Comment',
                        error: err
                    });
                }
                return res.status(201).json(Comment);
            });
          });
        */
        /*
        async.waterfall([
            function() {
              queryLocation.exec();
              done();
            }, function(done) {
              queryParentComment.exec();
              done();
            }
          ], function() {
            var Comment = new CommentModel({
              isRoot: req.params.parentCommentId,
              content: req.params.content,
              location: location,
              parentComment: parentComment
            });

            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating Comment',
                        error: err
                    });
                }
                return res.status(201).json(Comment);
            });
        });
        */

          /*
        LocationModel.findById(req.params.locationId)
          .then( _loc => {
            if(!req.params.parentCommentId)
              return [_loc, null];
            else {
              async.
              CommentModel.findById(req.params.parentCommentId)
                .then( _par =>)
            }
          })
          */
    },

    /**
     * TODO: CommentModel is changed: 'created_at', 'children' is added
     * CommentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }

            Comment.isRoot = req.body.isRoot ? req.body.isRoot : Comment.isRoot;			Comment.content = req.body.content ? req.body.content : Comment.content;			Comment.location = req.body.location ? req.body.location : Comment.location;			Comment.parentComment = req.body.parentComment ? req.body.parentComment : Comment.parentComment;			
            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Comment.',
                        error: err
                    });
                }

                return res.json(Comment);
            });
        });
    },

    /**
     * CommentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CommentModel.findByIdAndRemove(id, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Comment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

};
