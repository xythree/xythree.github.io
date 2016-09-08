

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


