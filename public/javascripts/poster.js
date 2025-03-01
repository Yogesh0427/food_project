$(document).ready(function(){
    $('#posterlink').change(function(){
        $('#poster').attr('src',URL.createObjectURL(posterlink.files[0]))
    })

    $.getJSON('http://localhost:3000/fetchdata/fetchallcategory', function(response){
        response.data.map((item)=>{
            $('#category').append($("<option>").text(item.category_name).val(item.category_id))
        })
    })
    $('#category').change(function(){
        $.getJSON('/fetchdata/fetchallsubcategory',{category_id:$('#category').val()}, function(response){
            $('#subcategory').empty()
            $('#subcategory').append($("<option>").text("Food subcategory"))
            response.data.map((item)=>{
                $('#subcategory').append($("<option>").text(item.subcategory_name).val(item.subcategory_id))
            })
        })
    })
    $('#subcategory').change(function(){
        $.getJSON('/fetchdata/fetchallfooditem',{subcategory_id:$('#subcategory').val()}, function(response){
            $('#fooditem').empty()
            $('#fooditem').append($("<option>").text("Dishish"))
            response.data.map((item)=>{
                $('#fooditem').append($("<option>").text(item.food_name).val(item.food_id))
            })
        })
    })
})
