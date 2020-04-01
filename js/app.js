'use strict';
$(document).ready(function() {
//to allow select one checkbox only:
    // $(".page1").prop('checked', true);
    $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false); });
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
      $('main').append(rendered);
    }; 
//rendering imgs in diff pages method:    
Img.prototype.renderImgs = function() {  
    // if(($(".page2").prop('checked', false)) && ($(".page1").prop('checked', false))){}
    $('.page2').click(function(){
        console.log(data);
      
        $('main').append(`<img src='${imgJSON1.image_url}'/>`);
        })
        // $( "main section " ).each(function() {
        //     if ($(this).attr("class") === imgJSON1.keyword){
        //         // $( this).hide();
        //         // console.log("hiii");

        //     }
        //     if ($(this).attr("class") !== imgJSON1.title){
        //         console.log("hello");
        //     }
        // });
     



    // $('.page2').click(function() {});
    // $('.page1').click(function() {});
};








//appending options method:
    Img.prototype.menu = function(){
        //to insure that at least one of the checkboxes is selected:
        if(($(".page2").prop('checked', false)) && ($(".page1").prop('checked', false))){
            // console.log(imgJSON1);

            $(".page1").prop('checked', true);
            if ($(`Option[value="${this.keyword}"]`).length == 0){
                $('select[name="dropdown"]').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
            }
        }
        //if page 2 is clicked:
        $('.page2').click(function() {
            //to append JSON2 related options:
            if ($(`Option[value="${this.keyword}"]`).length == 0){
            $('select[name="dropdown"]').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
            }
        });
        //if page 1 is clicked:
        $('.page1').click(function() {
            //to append JSON1 related options:
            if ($(`Option[value="${this.keyword}"]`).length == 0){
            $('select[name="dropdown"]').append(`<option value="${this.keyword}">${this.keyword} </option>`); 
            }
        });
    };

//filtering function
    const renderMenu = () => {
           $('select').change(function(){
               $( "main section " ).each(function() {        
                
                if ($(this).attr("class") === $("select").val()){
                    $(this).show();
                }
                if ($(this).attr("class") !== $("select").val()){
                    $(this).hide();    
                }
               }
               )
            }
           )
        }
//reading JSON files function:        
        var imgJSON1;
        var imgJSON2;
    const readJson = () => {
      $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach(ItemsArr => {
            imgJSON1 = new Img(ItemsArr);
            imgJSON1.render();
            imgJSON1.menu();
            imgJSON1.renderImgs(); 
        //imgJSON1 is the new object from JSON file 1
        });
      });
      $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach(ItemsArr => {
            imgJSON2 = new Img(ItemsArr);
            imgJSON2.render();
            imgJSON2.menu();
            imgJSON2.renderImgs(); 
        //imgJSON2 is the new object from JSON file 2
        });
      });
    }
       readJson();
       renderMenu();
      
  });

  