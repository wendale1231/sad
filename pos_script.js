//Variables
var num = 0;
var sum = 0;
var product_details = [];
var reciept_item = [];
var counter = 0;
var lastnum = 0;
var amount = 0;
var itemNumber = 0;
var p_quantity = 0;
var quantity;


// Side Nav Section //
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}


function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Overlay Input
function on() {
	document.getElementById("overlay").style.display = "block";
}

function off() {
	document.getElementById("overlay").style.display = "none";
	if(document.getElementById("quantity")){
		verifyItems();
	}
	if(document.getElementById("cash")){
		pay_order();
	}
}


//Change Done Transaction To Quantity Vice Versa
function change(val){
	var tag;
	if(document.getElementById("quantity")){
		tag = document.getElementById("quantity");
	}
	else if(document.getElementById("cash")){
		tag = document.getElementById("cash");
	}
	else if(document.getElementById("delete")){
		tag = document.getElementById("delete");
	}

	if(val == 0){
		if(!(tag.id == "cash")){
			tag.id = "cash";
			document.getElementById("cash").type = "number";
			tag.placeholder = "Input Cash";
		}
	}
	else if(val == 1){
		if(!(tag.id == "quantity")){
			tag.id = "quantity";
			document.getElementById("quantity").type = "number";
			tag.placeholder = "Input Quantity";
		}
	}
	else if(val == 2){
		if(!(tag.id == "delete")){
			tag.id = "delete";
			document.getElementById("delete").type = "number";
			tag.placeholder = "Input ID or Name";
		}
	}
	else if(val == 2){
		if(!(tag.id == "delete")){
			tag.id = "delete";
			document.getElementById("delete").type = "number";
			tag.placeholder = "Input ID or Name";
		}
	}
	// else if(val == 3){
	// 	if(!(tag.id == "quantity")){
	// 		tag.id = "quantity";
	// 		document.getElementById("quantity").type = "number";
	// 		tag.placeholder = "Input Quantity";
	// 	}
	// }
	// if(val == 1){
	// 	if((tag = document.getElementById("cash").id) || (tag = document.getElementById("delete").id) || (tag = document.getElementById("delete").id)){
	// 		tag.id = "quantity";
	// 		document.getElementById("quantity").type = "number";
	// 		tag.placeholder = "Input Quantity";
	// 	}
	// }
	// else if(val == 0){
	// 	if((tag = document.getElementById("quantity").id) || (tag = document.getElementById("delete").id)){
	// 		tag.id = "cash";
	// 		document.getElementById("quantity").type = "number";
	// 		tag.placeholder = "Input Cash";
	// 	}
	// }
	// else if(val == 3){
	// 	if((tag = document.getElementById("quantity").id) || (tag = document.getElementById("cash").id)){
	// 		tag.id = "delete";
	// 		document.getElementById("quantity").type = "text";
	// 		tag.placeholder = "Input Product Name or ID";
	// 	}
	// }
	// else{
	// 	if((tag = document.getElementById("quantity").id) || (tag = document.getElementById("cash").id)){
	// 		tag.id = "delete";
	// 		document.getElementById(tag).type = "text";
	// 		tag.placeholder = "Input Product Name or ID to delete";
	// 	}
	// }
}



//POS Delete Table Setion//
function deleteOrder(){
	var id = document.querySelectorAll("td:nth-child(1)");
	var row = document.getElementById(parseInt(id[i].firstChild.data));
	var parent = row.parentNode;
	parent.removeChild(row);

}


//POS Table Section//
function getTotal() {

	var price = document.querySelectorAll("td:nth-child(4)");
	var quantity = document.querySelectorAll("td:nth-child(3)");
	if(price != NaN && quantity != NaN){
		for (var i = 0; i < price.length; i++) {
		   var priceval = parseFloat(price[i].firstChild.data);
		   var quantityval = parseFloat(quantity[i].firstChild.data);
		   amountsum = (priceval * quantityval);
		   sum += (priceval * quantityval);
		}
		document.getElementById("total").innerHTML = sum ;
	}


}


//Getting the ID
function buttonValues(id, quantity){
	itemNumber = parseInt(id) - 1;
	p_quantity = parseInt(quantity);
	// alert(p_quantity);
}


//Verify Double
function verifyItems(){
	var id = document.querySelectorAll("td:nth-child(1)");
	var quantity = document.querySelectorAll("td:nth-child(3)");
	change(1);
	lastnum = 0;
	if(((p_quantity - parseInt(document.getElementById("quantity").value))) > 0){
		if(parseInt(document.getElementById("quantity").value)){
			try{
				for(var i = 0; i < counter; i++){
					if(parseInt(id[i].firstChild.data)){
						if(parseInt(id[i].firstChild.data)-1 == parseInt(itemNumber)){
							lastnum = parseInt(quantity[i].firstChild.data);
							// alert(lastnum + " " + document.getElementById("quantity").value + " " + (p_quantity - (parseInt(lastnum) + parseInt(document.getElementById("quantity").value))));
							if(((parseInt(lastnum) + parseInt(document.getElementById("quantity").value)) - p_quantity) > 0){
								document.getElementById("quantity").value = "";
								return false;
								break;
							}
							else{
								lastnum = parseInt(quantity[i].firstChild.data);
								var row = document.getElementById(parseInt(id[i].firstChild.data));
								var parent = row.parentNode;
								parent.removeChild(row);
							}
						}
					}
				}
				orderedProducts();
			}
			catch(err){
				orderedProducts();
			}
		}
		else{
			alert("Invalid Input!");
		}
	}
	else{
		document.getElementById("quantity").value = "";
	}

}

//Add Item to Table

function orderedProducts(){
	var value = document.getElementById("quantity").value;
	document.getElementById("quantity").value = "";

	var itemid = document.createElement("td");
	var id = itemNumber + 1;
	var nodeid = document.createTextNode(id);
	itemid.appendChild(nodeid);

	var itemname = document.createElement("td");
	var nodename = document.createTextNode(product_details[parseInt(itemNumber)][1]);
	itemname.appendChild(nodename);
	
	var itemquantity = document.createElement("td");
	var quantity = parseInt(value);
	var nodequantity = document.createTextNode(parseInt(quantity) + lastnum	);
	itemquantity.appendChild(nodequantity);

	var itemprice = document.createElement("td");
	var price = product_details[parseInt(itemNumber)][2];
	var nodeprice = document.createTextNode(price);
	itemprice.appendChild(nodeprice);
	
	var itemamount = document.createElement("td");
	amount = parseInt(price) * (quantity + lastnum);


	var nodeamount = document.createTextNode("" + amount);
	itemamount.appendChild(nodeamount);
	var node1 = document.createElement("tr");
	node1.setAttribute("id", itemNumber+1);
	node1.setAttribute("onclick", "javascript: change(3); on();");
	node1.appendChild(itemid);
	node1.appendChild(itemname);
	node1.appendChild(itemquantity);
	node1.appendChild(itemprice);
	node1.appendChild(itemamount);
	document.getElementById("table").appendChild(node1);
	// alert(counter);
	counter++;
	getData();
	getTotal();
}



//Item Section
function getProducts(name, price, id, prod_quantity){
	// alert(name + " " + price + " " + id + " " + prod_quantity);
	product_details.push([id,name,price,prod_quantity]);
	var node2 = document.createElement("form");
	node2.setAttribute("id", "products-" + num);
	// node2.setAttribute("action", "javascript:orderedProducts();");
	node2.setAttribute("method", "POST");
	// document.getElementById("prod").appendChild(node2);
	// var node1 = document.createElement("input");
	// node1.setAttribute("type", "hidden");
	// node1.setAttribute("name", "btn-value");
	// node1.setAttribute("value","" + name);

	// node2.insertBefore(node1, node2.childNodes[0]);
	var node = document.createElement("button");
	node.setAttribute("class", "item-button");
	node.setAttribute("value" , id);
	node.setAttribute("value1", prod_quantity);
	node.setAttribute("type", "submit");
	node.setAttribute("onclick", "javascript: buttonValues(this.value, this.getAttribute('value1'));on();change(1);maxQuantity();");
	var nodename = document.createTextNode(name);
	node.appendChild(nodename);
	document.getElementById("prod").appendChild(node);
	// alert(num);
	// node2.insertBefore(node, node2.childNodes[0]);
	num++;
}



//Search Section

function searchProduct(){
	var myNode = document.getElementById("prod");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
	var search = false;
	for(var i = 0; i < product_details.length; i++){
		if(parseInt(document.getElementById("search").value)){
			if(product_details[i][0] == parseInt(document.getElementById("search").value)){
				var node2 = document.createElement("form");
				node2.setAttribute("id", "products-" + i);
				// node2.setAttribute("action", "javascript:orderedProducts();");
				node2.setAttribute("method", "POST");
				// document.getElementById("prod").appendChild(node2);
				// var node1 = document.createElement("input");
				// node1.setAttribute("type", "hidden");
				// node1.setAttribute("name", "btn-value");
				// node1.setAttribute("value","" + product_details[i][1]);

				// node2.insertBefore(node1, node2.childNodes[0]);
				var node = document.createElement("button");
				node.setAttribute("class", "item-button");
				node.setAttribute("value" , product_details[i][0]);
				node.setAttribute("value1", p_quantity);
				node.setAttribute("type", "submit");
				node.setAttribute("onclick", "javascript: buttonValues(this.value, this.getAttribute('value1'));on();change(1);maxQuantity();");
				var nodename = document.createTextNode(product_details[i][1]);
				node.appendChild(nodename);
				document.getElementById("prod").appendChild(node);
				search = true;
			}
		}
		else{
			if(product_details[i][1].toLowerCase().includes(document.getElementById("search").value.toLowerCase(), 0)){
				var node2 = document.createElement("form");
				node2.setAttribute("id", "products-" + i);
				// node2.setAttribute("action", "javascript:orderedProducts();");
				node2.setAttribute("method", "POST");
				// document.getElementById("prod").appendChild(node2);
				// var node1 = document.createElement("input");
				// node1.setAttribute("type", "hidden");
				// node1.setAttribute("name", "btn-value");
				// node1.setAttribute("value","" + product_details[i][1]);

				// node2.insertBefore(node1, node2.childNodes[0]);
				var node = document.createElement("button");
				node.setAttribute("class", "item-button");
				node.setAttribute("value" , product_details[i][0]);
				node.setAttribute("value1", p_quantity);
				node.setAttribute("type", "submit");
				node.setAttribute("onclick", "javascript: buttonValues(this.value, this.getAttribute('value1'));on();change(1);maxQuantity();");
				var nodename = document.createTextNode(product_details[i][1]);
				node.appendChild(nodename);
				document.getElementById("prod").appendChild(node);
				search = true;
			}
		}
	}
	if(search == false){
		var node = document.createElement("p");
		var nodename = document.createTextNode("No Match Found!");
		node.appendChild(nodename);
		document.getElementById("prod").appendChild(node);
	}



}


function maxQuantity(){
	document.getElementById("quantity").placeholder = "Input Quantity (max:" + p_quantity + ")";
}


function pay_order(){
	var customer_cash = parseInt(document.getElementById("cash").value);
	var total_amount = sum;

	if((customer_cash - total_amount) >= 0){
		alert("Change: " + (customer_cash - total_amount));
		// window.location.href = 'reciept.php';
	}

}

function load_reciept(){
	for(var i = 0; i < counter; i++){
		var nodename = document.createElement("td");
		var textamount = document.createTextNode(reciept_item[i][1]);


		var nodeprice = document.createElement("td");
		var textamount = document.createTextNode(reciept_item[i][2]);


		var nodequantity = document.createElement("td");
		var textamount = document.createTextNode(reciept_item[i][3]);
		
		var nodeamount = document.createElement("td");
		var textamount = document.createTextNode(reciept_item[i][4]);

		var nodetable = document.createElement("tr");
		nodetable.appendChild(nodename);
		nodetable.appendChild(nodeprice);
		nodetable.appendChild(nodequantity);
		nodetable.appendChild(nodeamount);
		document.getElementById("item_table").appendChild(nodetable);
	}
}


function getData(){
	// alert(product_details[parseInt(itemNumber)][1] + " " + product_details[parseInt(itemNumber)][2] + " " + (quantity + lastnum) + " " + amount);
	// reciept_item[parseInt(counter)][0] = product_details[parseInt(itemNumber)][1].toString;
	// reciept_item[parseInt(counter)][1] = product_details[parseInt(itemNumber)][2].toString;
	// reciept_item[parseInt(counter)][2] = (quantity + lastnum).toString;
	// reciept_item[parseInt(counter)][3] = amount.toString;
}


function deleteItem(){
	//to be added
}
