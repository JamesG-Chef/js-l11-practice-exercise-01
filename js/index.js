const randomFolks = document.querySelector(".random-peeps");

// create a new variable called 'selectUserNumber' to capture the 'select' element
const selectUserNumber = document.querySelector("#users");

// Declare an async functin called 'getData'

const getData = async function (numUsers) {

	// Declare a variable called 'userRequests'. In the value, fetch data from the API 
	// with a parameter to access 5 results at a time
	
	const userRequests = await fetch (`https://randomuser.me/api/?results=${numUsers}`);

	// Declare a variable called 'data' to parse (split the data) captured in userRequests
	// using '.json()' (a lightweight data interchange format)
	
	const data = await userRequests.json();

	// Create a new variable called 'userResults' and map it to the property name for the array of 
	// objects

	const userResults = data.results //results is the array of objects


	// call the 'displayUsers' function and pass it to the 'userResults' array as an argument
	displayUsers(userResults);

};

// Call the getdata function
getData(1);



// create a new function and call it 'displayUsers' with the parameter of 'userResults' which will be an array
const displayUsers = function (userResults) {

	// empty the contents of the randomFolks element's contents so as not to duplicate any DOM elements
	randomFolks.innerHTML = "";

	// loop over the userResults, for every 'user' select their country, first name and avatar URL with a size of medium
	for (const user of userResults) {
		const country = user.location.country;
		const name = user.name.first;
		const imageURL = user.picture.medium;

	// Now that you have the data for each user, create a div element called 'userDiv' using 'document.createElement' and populate its innerHTML
	const userDiv = document.createElement("div");
	userDiv.innerHTML = `
			<h3>${name}</h3>
			<p>${country}</p>
			<img src=${imageURL} alt ="User avatar" />
			`;

	// Append userDiv to the 'randomFolks' element
	randomFolks.append(userDiv);
	}
};

// add a 'change' eventlistener for selectUserNumber
selectUserNumber.addEventListener("change", function (e) {
  const numUsers = e.target.value;
  getData(numUsers);
});