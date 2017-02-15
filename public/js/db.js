var newsDB = (function() {
  var tDB = {};
	  var datastore = null;

  // TODO: Add methods for interacting with the database here.

  // Export the tDB object.
  /**
 * Open a connection to the datastore.
 */
tDB.open = function(callback) {
  // Database version.
  var version = 17;

  // Open a connection to the datastore.
  var request = indexedDB.open('news', version);

  // Handle datastore upgrades.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    e.target.transaction.onerror = tDB.onerror;

    // Delete the old datastore.
    if (db.objectStoreNames.contains('news')) {
      db.deleteObjectStore('news');
    }

    // Create a new datastore.
    var store = db.createObjectStore('news', {
      keyPath: 'id',
      autoIncrement: false
    });
  };

  // Handle successful datastore access.
  request.onsuccess = function(e) {
    // Get a reference to the DB.
    datastore = e.target.result;

    // Execute the callback.
    callback();
  };

  // Handle errors when opening the datastore.
  request.onerror = tDB.onerror;
};


tDB.add = function(data,callback){
	
	var db= datastore;
	data.splice(0,1);
	console.log(db);
	
	var request;
	
	data.forEach(function(item){
		
		 request = db.transaction(["news"], "readwrite")
	    .objectStore("news")
	   .add(item);

		
	});	
	
	   
   request.onsuccess = function(event) {
      console.log("News has been added to your database.");
   };
   
   request.onerror = function(event) {
      console.log("Unable to add data is already exist in your database! ");
   }
	
	
};



tDB.fetchNews= function(callback){
	
	var db= datastore;
	
	var store = db.transaction(["news"], "readwrite")
	    .objectStore("news");	
	   
   request.onsuccess = function(event) {
      console.log("News has been fetched from your database.");
   };
   
   request.onerror = function(event) {
      console.log("some error while fetching! ");
   }
	
	
};
  
  
  return tDB;
}());