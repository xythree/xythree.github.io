


var morelistBox = Vue.extend({
    data() {
        return {
            moreListData: [
                {name: "我的收藏"},
                {name: "我的相册"},
                {name: "我的文件夹"},
                {name: "我的钱包"}
            ]
        }
    },
    methods: {
        listClick() {
            this.$parent.$refs.photolistbox.$dispatch("showPhotosListBox")
            this.$dispatch("showMore")
        }
    },
    events: {
        moreListData(d) {
            this.moreListData = d
        }
    },
    template: "<div class=\"moreList_box\">\r\n    <div class=\"moreList_head\">\r\n        \r\n    </div>\r\n    <ul class=\"moreList\">\r\n        <li v-for=\"item in moreListData\" @click=\"listClick\" >\r\n            {{item.name}}\r\n        </li>\r\n\r\n    </ul>\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n"
})

Vue.component("morelistbox", morelistBox)





