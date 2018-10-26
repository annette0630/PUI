function item(){

    // check if only one button is selected
    var button_state_qt=null;
    var button_state_glz=null;

    // which options are selected?
    var temp_flavs="";
    var temp_quants="";
    var temp_glazes="";

    //load object to storage
    var bun=JSON.parse(localStorage.getItem("bun"));

    //arrays to store data
    var flavs = [];
    var quants = [];
    var glazes = [];

    //if bun is null then give bun keys empty arrays
    //else, load bun values
    if (bun==null){
        bun = {flavs: flavs, quants: quants, glazes: glazes};
    } else {
        flavs = bun["flavs"];
        quants = bun["quants"];
        glazes = bun["glazes"];
    };

    //change selected quant option button
    $(".qt button").click(function() {
        $(".qt button").removeClass("button_active");
        $(this).addClass("button_active");

        //for each click event, set temp quant value as selected option
        temp_quants= $(this).text();

        //button selected
        button_state_qt=1;

        //if glaze also selected, then activate add to cart and purchase buttons
        if(button_state_glz==1){
            $('.button3').addClass('button3_active');
        };
        //in the case that sth is already added to cart, change added to cart --> add to cart
         $(".addcart").text("Add to Cart");

    });

    //selecting glaze option
     $(".glz button").click(function() {
        $(".glz button").removeClass("button_active");
        $(this).addClass("button_active");
        temp_glazes = $(this).text();

        //changing images for ORIGINAL BUNS based on glaze option
        //first check if on ORIGINAL bun detail page
        if ($(".details-text h2").text()=='Original'){
            console.log('hi');
            if (temp_glazes=='None'){
                $(".details-img").attr('src', 'original.jpg');
            } else if (temp_glazes=='Sugar Milk'){
                $(".details-img").attr('src', 'original-sugar.jpg');
            } else if (temp_glazes=='Vanilla Milk') {
                $(".details-img").attr('src', 'original-vanilla.jpg');
            } else if (temp_glazes=='Double Chocolate'){
                $(".details-img").attr('src', 'original-choc.jpg');
            }
        };

        button_state_glz=1;
        if(button_state_qt==1){
               $('.button3').addClass('button3_active');
        };
        $(".addcart").text("Add to Cart");
    });

     //add object to data and to cart
     $(".addcart").click(function(){
        //indicate object has been added to data and cart
        $(this).text("Added to Cart");

        //flav value extracted from image name
        temp_flavs = $(".details-img").attr("src").split(".")[0];
        console.log(temp_flavs);

        //push values to arrays
        flavs.push(temp_flavs);
        quants.push(temp_quants);
        glazes.push(temp_glazes);

        //set updated arrays as new bun values
        bun = {flavs:flavs, quants: quants, glazes:glazes};

        //send to local storage
        localStorage.setItem("bun",JSON.stringify(bun));

        //for mini cart in nav bar
        $("#item-count").text(bun["quants"].length);
     });
}


function cart() {
    //load values from storage
    var bun = JSON.parse(localStorage.getItem("bun"));

    //total cost
    var bunTotal=0;

    //if cart isn't empty
    if (bun["quants"].length != 0) {
        $(".flex-container").remove();
    }

    //if empty, remove total price and checkout buttons
    if (bun["quants"].length == 0) {
        $(".total-price").remove();
        $(".checkout").remove();
    }

    //for all stored buns
    for (var i = 0; i < bun["flavs"].length; i++) {
        var flav = bun["flavs"][i];
        var quant = bun["quants"][i];
        var glaze = bun["glazes"][i];

        console.log(flav);
        console.log(quant);
        console.log(glaze);

        //add unique id to each cart item div
        var cartItem = $("<div class='cart-item'></div>");
        cartItem.attr("id", "no-"+i);
        console.log(cartItem);

        //add proper image
        var img = "<div><img class='cart-img' src=" + flav + ".jpg></div>";
        cartItem.append(img);

        // capitalize first character
        flav = flav.charAt(0).toUpperCase() + flav.slice(1);


        //add proper flavor
        var cartDetail = $("<div class='cart-detail'></div");
        cartDetail.append("<h5>" + flav.split("-")[0] + "</5>");

        //add proper quant
        var qg = $("<div class='qg'></div");
        qg.append("<h7> Quantity: " + quant + " </h7>");
        qg.append("<h7> Glaze: " + glaze + " </h7>");
        cartDetail.append(qg);

        //add buttons and space between buttons
        var cartButtons = $("<div class='cart-buttons'></div>");
        cartButtons.append("<button class='button2'>Edit</button>");
        cartButtons.append("<div class='space'></div>");
        cartButtons.append("<button class='button2 delete-button'>Remove</button>");
        cartDetail.append(cartButtons);

        //attach all cart details to this cart item
        cartItem.append(cartDetail);

        //calculate cart item price
        cartItem.append("<div class='item-price'><h5>$"+quant*3+"</h5></div>");
        bunTotal = bunTotal+quant*3;

        $(".cart-list").append(cartItem);
    }

    //update total price
    $("#total").text("Total: $"+bunTotal);
    console.log(bunTotal)


    var allItems = $(".cart-item");
    console.log(allItems);

    //deleting item from cart
    $(".delete-button").click(function() {
        console.log($(this).parent().parent().parent().attr("id"));

        //get id of cart item for the corresponding cart item of clicked delete button
        var idNo = $(this).parent().parent().parent().attr("id");

        //get number to get cart item's position in arrays
        var no = idNo.slice(3);
        var k = parseInt(no);
        console.log(k);

        //remove cart item's data from arrays
        bun["flavs"].splice(k,1)
        bun["quants"].splice(k,1);
        bun["glazes"].splice(k,1);
        console.log(bun);

        //update local storage
        localStorage.setItem("bun", JSON.stringify(bun));

        //refresh page every time sth is deleted
        location.reload();

    });
}

function miniCart() {

    //load bun from storage
    var bun=JSON.parse(localStorage.getItem("bun"));

    //number of items = length of arrays
    $("#item-count").text(bun["quants"].length);
    console.log(bun["quants"].length);

}

function homePageImg() {
    var bannerArray= ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];
    var i = 0;
    $(".prev").click(function() {
        if (i==0){
            i = 2;
        } else {
            i--;
        }

        $(".banner img").attr('src',bannerArray[i]);
    })

    $(".next").click(function() {
        if (i==2){
            i=0;
        } else {
            i++;
        }

        $(".banner img").attr('src', bannerArray[i]);
    });
}
