


var photoListBox = Vue.extend({
    data() {
        return {
            title: "photoList",
            showPhotosListBox: false
        }
    },
    methods: {
        back() {
            this.$emit("showPhotosListBox")
        }
    },
    events: {
        showPhotosListBox() {
            this.showPhotosListBox = !this.showPhotosListBox
        }
    },
    template: "<div class=\"iphotos_list_box\" v-if=\"showPhotosListBox\" transition=\"back\" >\r\n    <div class=\"ihead_box\">\r\n        <div class=\"ihead_child imore\" @click=\"back\">back</div>\r\n        <div class=\"ihead_child ititle\">{{title}}</div>\r\n        <div class=\"ihead_child icenter\" ></div>\r\n    </div>\r\n    <photoajax></photoajax>\r\n</div>\r\n\r\n\r\n\r\n"
})



Vue.component("photolistbox", photoListBox)


