MODULE.sub = (function (parentApp) {
	
	
	var newsFromStorage = parentApp.getPrivateParent();
	
	var article = function(){};
	
	article.prototype.create = function(el){
				
		parentApp.makeArticle(el);
		
	}
	
	
	

	
	newsFromStorage.forEach(function(arrayItem,index){
		
		console.log(arrayItem);
		
		if(index == 0)
		{
			
		}
		else
		{
		
			// Add the contents of options[0] to #foo:
			var parent = document.getElementById('articles');
			
			var articleObject = new article();
			
			articleObject.create(arrayItem);
		}
		
		
	})
	
	
	
	
	
}(MODULE));