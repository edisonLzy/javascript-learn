const clipboard = new ClipboardJS('#btn',{
    target: function() {
        return document.querySelector('#content');
    }
});

clipboard.on('success', function(e) {
  console.log(e);
});
  
clipboard.on('error', function(e) {
  console.log(e);
});