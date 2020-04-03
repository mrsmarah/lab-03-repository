'use strict';
$(document).ready(function() {

 var constArr = [];
 var selectArr =[];

//constructor:
    function Img(img) {
      this.image_url = img.image_url;
      this.title = img.title;
      this.description = img.description;
      this.keyword = img.keyword;
      this.horns = img.horns;
      constArr.push(this);
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
                // renderMenu();
            });
          });
    };

//appending options method:
Img.prototype.menu = function(){
    if ($(`Option[value="${this.keyword}"]`).length == 0){
    $('select').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
    }
};

// render filtered imgs function
const renderMenu = () =>
    $('select').on('change' , () => {
    let selectValue = $('select').val();
    $(' #horns-rendered section').hide();
    $(`.${selectValue}`).show();
})

// rendering imgs in diff pages func:    
function pageRender(){
    $('#button1').on('click',function(){
        readJson(1);
    });
    $('#button2').on('click', function(){
        readJson(2);
    })
}
// sorting imgs func:    
function sortBy( array,property){
    array.sort((a,b) => {
        let firstItem = a[property];
        let secondItem = b[property];
        if (property === 'title'){
            firstItem = firstItem.toUpperCase();
            secondItem = secondItem.toUpperCase();
        }
        if( firstItem > secondItem){return 1;
        }
        else if( secondItem > firstItem){return -1;}
        else {return 0;}
});
}
$('#sortingDiv').on('click', e => {
    if(e.target.id !== "sortingDiv"){
        if(e.target.id === "titleSort"){
            sortBy(constArr,'title');
        }else if(e.target.id === "hornSort"){
            sortBy(constArr,'horns');
        }
    }
    $('#horns-rendered').html('');
    constArr.forEach(horn => horn.render())
    });
 
pageRender();
renderMenu();
readJson(1);

    });   
    
    