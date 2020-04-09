module.exports = {
    shuffle: function () {
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
            35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
        ];
        var m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        //console.log(array);
        return array;
    },

    randomId() {
        return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    },
    getIndexByKey(key, val, arr) {
        var index = false;
        for (var i in arr) {
            if (arr[i][key] == val) {
                index = i;
                break;
            }
        }

        return index;
    }
};