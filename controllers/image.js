module.exports = {
    index:function(req,res){
        res.render('image');
    },
    create:function(req,res){
        res.send('Create Action');
    },
    comment:function(req,res){
        res.send('Comment Action');
    },
    like:function(req,res){
        res.send('Like Action');
    }
};