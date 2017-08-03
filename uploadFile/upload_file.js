/**
 * Created by yugang on 2017/5/23.
 */
function base_readFile(domClick){
  //var _this=this
  var file = $(domClick)[0].files[0];
  var fileSize = (file.size/1024/1024);
  var fileName=file.name;
  var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
  if(fileExt !=='.jpg' && fileExt !=='.jpeg' && fileExt !=='.png'){
    alert('图片类型不符')
    domClick.value = ''
    return false
  }
  if(fileSize > 3){
    alert('图片超过3M')
    domClick.value = ''
    return
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e){
    if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.png'){
      $(domClick).parent().parent().find('#base_register-view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" alt="" width="180" height="180"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)"><img src="img/delete.png"/><span>');
    }else{
      $(domClick).parent().parent().find('#base_register-view').html('<a target="_blank" class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:base_remove_img(this)"></span>');
    }
    $(domClick).parent().parent().find('.base_sign').show();
  }
  $(domClick).attr('disabled','disabled')
  $(domClick).attr('data_upload','already_uploaded')
  if($(domClick).parent().find('.error').attr("class") === "error"){
    $(domClick).parent().find('.error').detach();
  }
  $(domClick).parent().find('.lable').css("opacity",0);
}
//删除图片
function base_remove_img(targetName){
  $("#show_img").html('');
  $('.errorImg').addClass('hide')
  $('.uploadImg').addClass('hide')
  $(targetName).hide();
  $(targetName).parent().find('.img').detach();
  var domName = $(targetName).parent().parent().find('input').attr('id');
  dom_show(domName,targetName)
  $(targetName).parent().parent().find('.lable').css('opacity',1);
}

function dom_show(domName,targetName){
  if($(targetName).parent().parent().find('input').attr('id') === domName){
    var h='';
    $(targetName).parent().parent().find('input').detach();
    $(targetName).parent().parent().find('label').remove();
    h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" accept="image/jpeg,image/png" onchange="base_readFile(this)">';
    h+='<label class="lable lable-pic base_lable"></label>'
    $(targetName).parent().parent().find('.base_upfilebox').append(h);
  }
}
