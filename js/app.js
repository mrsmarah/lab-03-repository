'use strict';
$(document).ready(function() {

//constructor:
    function Img(img) {
      this.image_url = img.image_url;
      this.title = img.title;
      this.description = img.description;
      this.keyword = img.keyword;
      this.horns = img.horns;
    }
//rendering imgs method:    
    Img.prototype.render = function() {
      let $imgTemplate = $("#img-template").html();
      let rendered = Mustache.render($imgTemplate , this);
      $('#horns-rendered').append(rendered);
    }; 
//reading JSON files function:        

    const readJson = (pageNum) => {
        $('#horns-rendered').html(''); 
          $.ajax(`data/page-${pageNum}.json`, { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(ItemsArr => {
               let img = new Img(ItemsArr);
                img.render();
                img.menu(); 
                renderMenu();
            });
          });
    };
    readJson(1);

//appending options method:
Img.prototype.menu = function(){
    if ($(`Option[value="${this.keyword}"]`).length == 0){
    $('select').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
    }
};

// render filtered imgs function
const renderMenu = () =>
    $('select').on('change' , () => {
        // console.log('hii');

    let selectValue = $('select').val();
    console.log(selectValue);
    $(' #horns-rendered section').hide();
    $(`.${selectValue}`).show();
})

// rendering imgs in diff pages method:    
function pageRender(){
    $('#button1').on('click',function(){
        readJson(1);
    });
    $('#button2').on('click', function(){
        readJson(2);
    })
}
pageRender();
renderMenu();

    });      