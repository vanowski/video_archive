'use strict';

class Model extends Backbone.Model {
    initialize() {
        this.set('currentPage', 0);
    }
}