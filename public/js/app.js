

var MODULE = (function () {
	//Private variables
	var privateParent,
	    app;
	
	privateParent = JSON.parse(localStorage.getItem('localArrayNews'));
	
	return app = {
		//Privileged method
		getPrivateParent: function() {
			return privateParent;
		},
		filterAscPointsExposed : function()
		{
			return newArray;
		},
		makeArticle : function(arrayEl){
			
			var section = document.getElementById('articles');
		
	   	    
	   	    var article = document.createElement('article');
	   	    
	   	    article.className += "col-12";
	
	   	    
	    
	     	// Create the child item:
	        var articleName = document.createElement('a');
	        
	        var articlePartition = document.createElement('div');
	        
	        var articleBody = document.createElement('div');
	        
	        
	        
	        var timeElement = document.createElement('time');
	        timeElement.className += "timeago";
	        
	        //var options={weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	        
	        var d = new Date(arrayEl.created_at); 
			d_string = d.format("d/m/y h:i");
			
			
	        timeElement.innerHTML = d.time_ago(d) + " - "+ d_string;
	        
	      
	        
	        
	        
	        var authorName = document.createElement('q');
	        authorName.innerHTML = arrayEl.author;
	        authorName.className += "source";
	        
	        var articleComments = document.createElement('small');
	        articleComments.innerHTML = arrayEl.num_comments + " "+ "comments";

			 var articlePoints = document.createElement('small');
	        articlePoints.innerHTML = arrayEl.num_points + " "+ "points";
	        
	        
	        var detailedSummary = document.createElement('p');
	        
	        var point  = document.createElement('i');
	        
	        point.className  +="fa fa-circle white";
	        
	        detailedSummary.appendChild(authorName);
	        detailedSummary.appendChild(point);
	        detailedSummary.appendChild(articleComments);
	        detailedSummary.appendChild(point);
	        detailedSummary.appendChild(articlePoints);
	        detailedSummary.appendChild(timeElement);
	       
	        
	        
	        
	        articleName.innerHTML = arrayEl.title;
	        articleName.setAttribute("target", "_blank");
	        articleName.setAttribute("href", arrayEl.url);
	        articleName.className +="articleName";
	        
	        
	        articlePartition.className += "line";
	        
	        
	        
	        
	        articleBody.className += "articleBody";
	        articleBody.className += "clear";
	        
	        
			articleBody.appendChild(detailedSummary);
	        
	
	        // Add it to the list:
	        article.appendChild(articleName);
	        article.appendChild(articlePartition);
	        article.appendChild(articleBody);
	        
	        
	        section.appendChild(article);
		}
		
	};
}());







function rerenderHTML(newArr)
{
	var section = document.getElementById('articles');
			
			
	section.innerHTML="";
	newArr.forEach(function(arrayItem,index){
	
		if(arrayItem.id !=undefined)
			MODULE.makeArticle(arrayItem);	
	})
}






var hackerNewsData = {
	
	//fetch the data from API 
	fetch: function(apiUrl,callback){
		
		newsDB.open(storeinDB);
		
		if (localStorage) {
			return JSON.parse(localStorage.getItem('localArrayNews'));
		}
		else
		{
			
			 var request = new XMLHttpRequest();
		    request.onreadystatechange = function()
		    {
		        if (request.readyState == 4 && request.status == 200)
		        {
		            callback(request.responseText); // Another callback here
		        }
		    }; 
		    request.open('GET', apiUrl);
		    request.send();
			
		}	
		
		
				
		
	},
	
	//store the array in local storage
	storeInLocalStorage : function(arrayData) {
		
		
		newsDB.add(arrayData,callbackindex);
		
		
		
		function callbackindex(data)
		{
			console.log(data.responseText);
		}
		
		
		if (localStorage) {
			
			localStorage.localArrayNews = JSON.stringify(arrayData) ;
		  
		  
		} else {
		  // No support. Use a fallback such as browser cookies or store on the server.
		}
		
		return localStorage;
	}
	
	
	
};


function storeinDB(data)
{
	
}


var arrayNews;

function handleRequest(data)
{
	
	hackernews.storeInLocalStorage(JSON.parse(data));
}




var hackernews = Object.create(hackerNewsData);

//var arrayNews = JSON.parse(hackernews.fetch('http://starlord.hackerearth.com/cleartrip/hackernews', handleRequest));

hackernews.fetch('http://starlord.hackerearth.com/cleartrip/hackernews', handleRequest)





function filterAscPoints()
	{
		//get the global array and filter it based on points from low to high
		
		var newArray = MODULE.getPrivateParent().sort(function(a,b){
			
			return a.num_points > b.num_points ? 1 : -1; 
		})
		
		rerenderHTML(newArray);
		
}


function filterDesPoints()
	{
		//get the global array and filter it based on points from low to high
		
		var newArray = MODULE.getPrivateParent().sort(function(a,b){
			
			return a.num_points > b.num_points ? -1 : 1; 
		})
		
		rerenderHTML(newArray);
		
}



function filterNewFirst()
{
	
		
		
		var newArray = MODULE.getPrivateParent().sort(function(a,b){
			
			return (new Date(a.created_at).getTime()) > (new Date(b.created_at).getTime()) ? -1 : 1;
		})
		
		rerenderHTML(newArray);
	
	
}


function filterOldFirst()
{
	
		
		
		var newArray = MODULE.getPrivateParent().sort(function(a,b){
			
			return (new Date(a.created_at).getTime()) > (new Date(b.created_at).getTime()) ? 1 : -1;
		})
		
		rerenderHTML(newArray);
	
	
}


function SearchByAuthor()
{
	var searchKeyword = document.getElementById('search').value;
	
	if(searchKeyword == undefined || searchKeyword == ' ')
	{
		return;
	}
	   
	   
	    
	 newArray_search = MODULE.getPrivateParent().filter(function(item){
		 
		 
		 if(item.hasOwnProperty('author') || item.hasOwnProperty('title'))
		 {
			 
			 	var authorToBeSearched = item.author.toString().toLowerCase();
			 	var titleToBeSearched = item.title.toString().toLowerCase();
			 	
			 	return (~authorToBeSearched.indexOf(searchKeyword.toLowerCase()) || ~titleToBeSearched.indexOf(searchKeyword.toLowerCase()));
		 }
		 	 
	 })
	 
	 
	 rerenderHTML(newArray_search);   
}



