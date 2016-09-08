
var wrapBox = Vue.extend({
    template: "<morelistbox></morelistbox>\r\n\r\n<div class=\"iwrap\" :class=\"{'right-transition': rightTransition}\" :style=\"iwrapStyle\">\r\n\r\n    <div class=\"ihead_box\">\r\n        <div class=\"ihead_child imore\" @click=\"showMore\">more</div>\r\n        <div class=\"ihead_child ititle\">{{title}}</div>\r\n        <div class=\"ihead_child icenter\" @click=\"centerShow\">center</div>\r\n    </div>\r\n\r\n    <div class=\"ibody_box\" :style=\"bodyStyle\">\r\n        <homebox v-show=\"home\" ></homebox>\r\n        <addresslistbox v-show=\"addressList\"></addresslistbox>\r\n        <setbox v-show=\"set\"></setbox>\r\n    </div>\r\n\r\n    <div class=\"ifoot_box\">\r\n        <div @click=\"iconToggle($index)\" :class=\"{'icon': true, 'icon_index': $index == iconIndex}\" v-for=\"icon in iconData\">{{icon}}</div>\r\n    </div>\r\n    <centerbox></centerbox>\r\n    <photolistbox v-ref:photolistbox ></photolistbox>\r\n    <loadingbox v-show=\"loadingShow\" ></loadingbox>\r\n</div>\r\n<alertbox></alertbox>",
    data() {
        return {
            abc: { a: 1, b: 2 },
            home: true,
            addressList: false,
            set: false,
            loadingShow: false,
            iconData: ["主页", "通讯录", "设置"],
            iconIndex: 0,
            rightTransition: false,
            title: "",
            iwrapStyle: {},
            bodyStyle: {}
        }
    },
    methods: {
        centerShow() {
            this.$broadcast("centerShow")
        },
        showMore() {
            this.$emit("showMore")
        },
        iconToggle(index) {

            switch (index) {
                case 0:
                    this.home = true
                    this.addressList = false
                    this.set = false
                    this.$emit("showHome")
                    break
                case 1:
                    this.home = false
                    this.addressList = true
                    this.set = false
                    this.$emit("showAddressList")
                    break
                case 2:
                    this.home = false
                    this.addressList = false
                    this.set = true
                    this.$emit("showSet")
                    break
            }
            this.iconIndex = index
            this.title = this.iconData[this.iconIndex]
        }
    },
    events: {
        showMore() {
            this.rightTransition = !this.rightTransition
        },
        showHome() {
            var arr = []
            for (var i = 0; i < 60; i++) {
                arr.push({ src: "", content: i })
            }
            this.$broadcast("homeData", arr)
        },
        showAddressList() {
            var arr = []
            for (var i = 0; i < 30; i++) {
                arr.push({ content: i })
            }
            this.$broadcast("addressListData", arr)
        },
        showSet() {
            this.$broadcast("setShow")
        },
        showLoading() {
            this.loadingShow = !this.loadingShow
        },
        showAlertBox(d) {
            this.$broadcast("showAlertBox", d)
        }
    },
    ready() {

        this.iwrapStyle = {
            width: window.innerWidth + "px"
        }
        this.bodyStyle = {
            height: window.innerHeight - 80 + "px"
        }

        this.title = this.iconData[this.iconIndex]

        this.$emit("showHome")
    }
})

Vue.component("wrapbox", wrapBox)


