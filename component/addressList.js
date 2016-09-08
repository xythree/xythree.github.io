


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

