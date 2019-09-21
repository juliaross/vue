var app = new Vue ({
  el: '#app',
  data: {
    list: [
      {
        name: 'Read books',
        status: false
      },
      {
        name: 'Call to bank',
        status: true
      },
      {
        name: 'Running',
        status: true
      }
    ],
    message: ''
  },
  methods: {
    onClick: function() {
      this.list.push({
        name: this.message,
        status: true
      })
      console.log(this.message)
    },
    deleteItem: function(){
      this.list.splice(this.list.indexOf(),1)
    }
  }
})
