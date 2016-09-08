

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


