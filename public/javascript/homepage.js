const displayArticle = function(search_term) {
    if (search_term) {
        //news box 1
        newsTitle1.textContent = search_term.data.results[0].title;
        image1.setAttribute("src", search_term.data.results[0].image);
        image1.setAttribute("style", "background: no-repeat top; background-size:cover; min-height:100%;");
        url1.setAttribute("href", search_term.data.results[0].url);
        url1.setAttribute("target", "_blank");
        date1.textContent = search_term.data.results[0].date;  
        source1.textContent = search_term.data.results[0].source_name; 


        newsTitle2.textContent = search_term.data.results[1].title;
        image2.setAttribute("src", search_term.data.results[1].image);
        image2.setAttribute("style", "background: no-repeat center; background-size:cover; min-height:100%;");
        url2.setAttribute("href", search_term.data.results[1].url);
        url2.setAttribute("target", "_blank");
        date2.textContent = search_term.data.results[1].date;  
        source2.textContent = search_term.data.results[1].source_name; 

        newsTitle3.textContent = search_term.data.results[2].title;
        image3.setAttribute("src", search_term.data.results[2].image);
        image3.setAttribute("style", "background: no-repeat center; background-size:cover;");
        url3.setAttribute("href", search_term.data.results[2].url);
        url3.setAttribute("target", "_blank");
        date3.textContent = search_term.data.results[2].date;  
        source3.textContent = search_term.data.results[2].source_name; 

        newsTitle4.textContent = search_term.data.results[3].title;
        image4.setAttribute("src", search_term.data.results[3].image);
        image4.setAttribute("style", "background: no-repeat center; background-size:cover;");
        url4.setAttribute("href", search_term.data.results[3].url);
        url4.setAttribute("target", "_blank");
        date4.textContent = search_term.data.results[3].date;  
        source4.textContent = search_term.data.results[3].source_name; 
        
    }
};

const getNews = function() {
    const apiUrl = fetch("https://webit-news-search.p.rapidapi.com/search?q=trending&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "feec356023msh7d505f582747ea5p199c91jsnd5a1909fc40a",
            "x-rapidapi-host": "webit-news-search.p.rapidapi.com"
        }
    })

    apiUrl.then(function(response) {
        if(response.ok) {
           response.json().then(function(data) {
               console.log("news", data);
               console.log(data.data.results[0].title);
               displayArticle(data);
           })
        }
    })

};


getNews();