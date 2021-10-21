const api_url = "http://localhost:8080/user"

function loadData(records = []) {
	var table_data = "";
/* 	var result; */

	for(let i=0; i<records.length; i++) {    //In a loop to fetch all entries one by one
		table_data += `<tr>`;  //STARTING A ROW

		table_data += `<td>${records[i].coin}</td>`;         //fetching coin i data
		table_data += `<td id="quantity">${records[i].quantity}</td>`;      //fetching quantity i data
		table_data += `<td id="price">${records[i].price}</td>`;         //fetching price i data

		table_data += `<td id ="result">${records[i].price * records[i].quantity}</td>`;           //Caculating price   */
		
		table_data += `<td>`;  //putting button in the line of table data

		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn text-white btn-default" style="background-color: #4e54c8">Edit</button></a>`;  //EDIT button
		table_data += '&nbsp;&nbsp;';  //SPACE BETWEEN BUTTONS
		table_data += `<button class="btn text-white btn-default"  style="background-color: #b51b60" onclick=deleteData('${records[i]._id}')>Delete</button>`; //DELETE button
		
		table_data += `</td>`; // CLOSING putting button in the line of table data 

		table_data += `</tr>`; //table row close
	}


 	document.getElementById("tbody").innerHTML = table_data;  //Putting the table data in HTML body
}


function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("coin").value = data.coin;
		document.getElementById("quantity").value = data.quantity;
		document.getElementById("price").value = data.price;
	})
}


function postData() {
	var coin = document.getElementById("coin").value;
	var quantity = document.getElementById("quantity").value;
	var price = document.getElementById("price").value;
	
	data = {coin: coin, quantity: quantity, price: price};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var coin = document.getElementById("coin").value;
	var quantity = document.getElementById("quantity").value;
	var price = document.getElementById("price").value;
	
	data = {_id: _id, coin: coin, quantity: quantity, price: price};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}