import { Observable } from "tns-core-modules/data/observable";


interface Source {
    id: string;
    name: string;
}

interface Article { 
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

export class HelloWorldModel extends Observable {

    allNews: Article[];

    fetchNews = function() {
        let allNews;
        allNews = fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=90e35208ebd3454395ec8af218be4417")
                    .then((res)=> {
                        if(res.status != 200){
                            throw new Error("There was some issue with api  " + res.status);
                        }
                        return res.json();
                    })
                    .catch((err)=> {
                        throw new Error("Unable to fetch api" + err)
                    })
        return allNews;
    }

    onItemTap = function(args){
        const index = args.index;
        args.object.page.frame.navigate({
            moduleName: 'article-page',
            context: this.allNews[index]
        });
    }

    constructor() {
        super();
        this.fetchNews().then((data) => {
            this.set("allNews",data.articles);
        });
    }
}
