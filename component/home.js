

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



