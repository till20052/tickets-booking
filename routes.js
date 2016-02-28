var fs = require('fs');

module.exports = {
    path: './app/routes',
    apply: apply
};

/**
 *
 * @param app
 */
function apply(app) {
    var it = this;

    try {
        fs.readdirSync(it.path)
            .map(include)
            .sort(compare)
            .forEach(appUse);
    }
    catch (error) {
        // @todo need to create errors handler
        throw error;
    }

    /**
     *
     * @param filename
     * @returns {*}
     */
    function include(filename) {
        var file = require(it.path + '/' + filename);

        if (!file.hasOwnProperty('priority'))
            file.priority = 999;

        return file;
    }

    /**
     *
     * @param a
     * @param z
     * @returns {number}
     */
    function compare(a, z) {
        if (a.priority === z.priority)
            return 0;

        return a.priority > z.priority ? 1 : -1;
    }

    /**
     *
     * @param file
     */
    function appUse(file) {
        app.use(file.prefix, file.router);
    }
}

