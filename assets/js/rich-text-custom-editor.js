var toolbarOptions = [
    ['bold'],        
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [ 'link', 'image'],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
  ];
  
  var editor = document.getElementById('editor');
if(editor){
  var quill = new Quill(editor, {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });
}
