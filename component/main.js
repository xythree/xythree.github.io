

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






var homeBox = Vue.extend({
    props: {

    },
    data() {
        return {
            homeLoadingStatus: false,      
            homeData: []
        }
    },
    events: {
        homeData(d) {
            this.homeData = d
        }
    },
    methods: {
        alert(d) {
            var _t = this
            this.$dispatch("showLoading")
            setTimeout(function () {
                _t.$dispatch("showLoading")
                d.alertShow = true
                _t.$dispatch("showAlertBox", d)
            }, 3000)
        },  
        scroll() {
            var _t = this
            
            if (this.$el.scrollTop + this.$el.offsetHeight + 50 >= this.$el.firstElementChild.offsetHeight) {
                clearTimeout(this.timer)
                this.homeLoadingStatus = true

                this.timer = setTimeout(function () {

                    for (var i = _t.homeData.length, len = i + 15; i < len; i++) {
                        _t.homeData.push({ src: "", content: i })
                    }
                    _t.homeLoadingStatus = false

                }, 300)
            }
        }
    },
    ready() {
        
    },
    template: "<div class=\"home_box\" @scroll=\"scroll\">\r\n    <ul class=\"home_list\" >\r\n        <li v-for=\"item in homeData\" track-by=\"$index\" @click=\"alert({title: $index, content:item.content})\" >\r\n            <img :src=\"item.src\">\r\n            <p>{{item.content}}</p>\r\n        </li>\r\n    </ul>\r\n    <div class=\"home_loading_box\" v-show=\"homeLoadingStatus\" >loading...</div>\r\n</div>\r\n\r\n\r\n\r\n"
})


Vue.component("homebox", homeBox)








var addressListBox = Vue.extend({
    data() {
        return {
            addressListData: {}
        }
    },
    events: {
        addressListData(d) {
            this.addressListData = d
        }
    },
    template: "<div class=\"addressList_box\" >\r\n\r\n    <ul class=\"addressList\">\r\n        <li v-for=\"item in addressListData\" >\r\n            {{item.content}}\r\n        </li>\r\n    </ul>\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"
})


Vue.component("addresslistbox", addressListBox)






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










var setBox = Vue.extend({
    data() {
        return {
            
        }
    },
    events: {
        setShow() {
            
        }  
    },
    template: "\r\n\r\n<div class=\"set_box\" >\r\n\r\n    <h3>setBox</h3>\r\n\r\n</div>\r\n\r\n\r\n"
})

Vue.component("setbox", setBox)










var alertBox = Vue.extend({
    data() {
        return {
            alertData: {
                alertShow: false,          
                title: "",
                content: ""
            }
        }        
    },
    events: {
        showAlertBox(data) {
            this.alertData = data
        }
    },
    methods: {
        close() {
            this.alertData.alertShow = false
            this.$dispatch("alertBoxClose", "close") 
        },
        sure() {
            this.alertData.alertShow = false 
            this.$dispatch("alertBoxClose", "sure")
        }
    },
    template: "\r\n\r\n\r\n<div class=\"ialert_box_bg\" v-show=\"alertData.alertShow\" ></div>\r\n<div class=\"ialert_box\" v-show=\"alertData.alertShow\" transition=\"scale\" >\r\n  <h4 class=\"ialert_box_title\">{{alertData.title}}</h4>\r\n  <div class=\"ialert_box_content\">\r\n    {{alertData.content}}\r\n  </div>\r\n  <div class=\"ialert_box_btn\">\r\n    <a href=\"javascript:;\" class=\"close\" @click=\"close\" >关闭</a>\r\n    <a href=\"javascript:;\" class=\"sure\" @click=\"sure\" >确定</a>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"
})

Vue.component("alertbox", alertBox)






var centerBox = Vue.extend({
    data() {
        return {
            centerShow: false,
            title: "个人中心"
        }
    },
    methods: {
        close() {
            this.centerShow = !this.centerShow
        }
    },
    events: {        
        centerShow() {            
            this.centerShow = !this.centerShow
        }
    },
    template: "\r\n\r\n<div class=\"center_box\" v-show=\"centerShow\" transition=\"center\" >\r\n    <div class=\"ihead_box\">\r\n        <div class=\"ihead_child imore\" @click=\"close\" >close</div>\r\n        <div class=\"ihead_child ititle\">{{title}}</div>\r\n        <div class=\"ihead_child icenter\"></div>\r\n    </div>\r\n    <h3>Center</h3>\r\n\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n"
})


Vue.component("centerbox", centerBox)





var loadingBox = Vue.extend({
    template: "<div class=\"loading_box\">\r\n    loading...\r\n</div>"
})

Vue.component("loadingbox", loadingBox)





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





//动态加载模块
Vue.component("photoajax", function (resolve, reject) {
    var _t = this

    this.$dispatch("showLoading")
    
    setTimeout(function () {
        resolve({
            template: "<p>ajax back content</p>"
        })
        _t.$dispatch("showLoading")
    }, 3000)

})


var vm = new Vue({
    el: "body"
})










