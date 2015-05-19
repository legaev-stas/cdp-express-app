define([
    'backbone'
    , 'app/users-collection'
    , 'text!app/users-list.tpl'
    , 'app/user-form'
], function(Backbone, UsersCollection, tpl, UserForm){

    var requestConfig = {
        sortBy: 'firstName',
        sortDir: 'asc'
    }

    return Backbone.View.extend({
        el: '.users-list',

        template: _.template(tpl),

        users: new UsersCollection,

        events: {
            'click .user-form': 'showUserForm',
            'click .delete-user': 'deleteUser',
            'click .sortable': '_sortTable'
        },

        initialize: function(){
            this.listenTo(this.users, 'sync', this.render);
            this.users.fetch({data: requestConfig});
            this._userForm = new UserForm()

            this.listenTo(this.users, 'destroy', function(){
                this.users.fetch({data: requestConfig});
            })

            this.listenTo(Backbone.Events, 'userWasSaved', function(){
                this.users.fetch({data: requestConfig});
            });
        },

        render: function(){
            this.$el.html(this.template({
                collection: this.users.toJSON(),
                requestConfig: requestConfig
            }));

            this._userForm.setElement(this.$('.' + this._userForm.className).get(0));

            return this;
        },

        showUserForm: function(e){
            this._userForm.showPopup($(e.target).data('id'));
        },

        deleteUser: function(e){
            this.users.get($(e.target).data('id')).destroy();
        },

        _sortTable: function(e){
            this.users.fetch({
                data: _.extend(requestConfig, {
                    sortBy: $(e.target).data('sortby'),
                    sortDir: $(e.target).hasClass('asc') ? 'desc' : 'asc'
                })
            });
        }
    });
});