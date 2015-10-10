'use strict';

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

$(() => {
    let $main = $('#main');
    let model = new Model();
    let view = new MainView({
        model: model,
        el: $main[0]
    });
});