var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var CommentSchema = new Schema(
    {
      'is_root' : Boolean,
      'content' : String,

      'location' : {
        type: Schema.Types.ObjectId
         , ref: 'Location'
      },

      'parent_comment' : {	
        type: Schema.Types.ObjectId,
        ref: 'Comment'	
      },

      'children' : [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        unique: true
      }],

      'index_x' : Number,
      'index_y' : Number,

      'author_name': String,
      'created_at' : Date
    });

// http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html
var autoPopulateChildren = function (next) {
  this.populate('children');
  next();
};

CommentSchema
  .pre('find', autoPopulateChildren);

module.exports = mongoose.model('Comment', CommentSchema);
