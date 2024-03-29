var app = {

    // findByName: function() {
    //     console.log('findByName');
    //     this.store.findByName($('.search-key').val(), function(employees) {
    //         var l = employees.length;
    //         var e;
    //         $('.employee-list').empty();
    //         for (var i=0; i<l; i++) {
    //             e = employees[i];
    //             $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
    //         }
    //     });
    // },

    
    showAlert: function (message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
},

registerEvents: function() {
    var self = this;
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    } else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    }
    $(window).on('hashchange', $.proxy(this.route, this));
},

route: function() {
    var hash = window.location.hash;
    if (!hash) {
        $('body').html(new HomeView(this.store).render().el);
        return;
    }
    var match = hash.match(app.detailsURL);
    if (match) {
        this.store.findById(Number(match[1]), function(employee) {
            $('body').html(new EmployeeView(employee).render().el);
        });
    }
},

    initialize: function() {
    var self = this;
    this.registerEvents();
    this.store = new MemoryStore(function() {
        self.route();
    });
    
    this.detailsURL = /^#employees\/(\d{1,})/;
}

};

app.initialize();