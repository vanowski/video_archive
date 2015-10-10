'use strict';

const ARCHIVE_URL = '/feed';
const STORAGE_ID = 'videoFeedPage';

class MainView extends Backbone.View {
    initialize() {
        this.templates = {
            music: $('#item-music-template').html(),
            movie: $('#item-movie-template').html()
        };

        this.$feed = $('#feed');
        this.$fetchButton = $('#fetch');

        this.$fetchButton.on('click', this.render.bind(this));

        this.render();
    }

    requestPage(pageNum) {
        let promise = new Promise(function(resolve, reject) {
            let storedPage = localStorage.getItem(STORAGE_ID + pageNum);

            if (storedPage) {
                try {
                    resolve(JSON.parse(storedPage));
                } catch(e) {
                    console.error(e);
                    reject();
                }
            } else {
                $.getJSON(ARCHIVE_URL + '?page=' + pageNum).then(
                    (response) => {
                        localStorage.setItem(STORAGE_ID + pageNum, JSON.stringify(response));
                        resolve(response);
                    },
                    () => {
                        reject();
                    }
                );
            }
        });

        return promise;
    }

    render() {
        let nextPage = this.model.get('currentPage') + 1;
        let newData = this.requestPage(nextPage);

        newData.then(
            (data) => {
                data.content.forEach((item) => {
                    this.$feed.append(_.template(this.templates[item.type])(item));
                });

                if (data.has_next !== 'true') {
                    this.hideFetchButton();
                };

                this.model.set('currentPage', nextPage);
            },
            () => {
                this.hideFetchButton();
            }
        );
    }

    hideFetchButton() {
        this.$fetchButton.addClass('hidden');
    }
}