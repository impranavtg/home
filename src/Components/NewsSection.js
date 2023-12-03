import React, { Component } from "react";
import NewsCard from "./NewsCard";
import "./NewsSection.css";
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsSection extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    // console.log(this.state.page);
  }

  

  
  static defaultProps = {
    page: 1,
  };
  async componentDidMount() {
    this.setState({ loading: true });   
     await axios.request("https://newsdata.io/api/1/news?apikey=pub_34008949953e9376384e4768edc2829ff2126&q=crypto").then(async(response)=> {
      console.log(response.data);
      let parsedJsonData = await response.data;
      this.setState({
        articles: parsedJsonData.results,
        totalResults: parsedJsonData.totalResults,
        loading: false,
        page:parsedJsonData.nextPage,
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  fetchMoreData = async () => {

    
    if(!this.state.page){
      return;
    }
    
    
    const url=`https://newsdata.io/api/1/news?apikey=pub_34008949953e9376384e4768edc2829ff2126&q=crypto&language=en&page=${this.state.page}`;

    await axios.request(url).then(async(response)=> {
      console.log(response.data);
      let parsedJsonData = await response.data;
      this.setState({
        articles: this.state.articles.concat(parsedJsonData.results),
        totalResults: parsedJsonData.totalResults,
        loading: false,
        page:parsedJsonData.nextPage,
      });
    })

  };

  render() {
    return (
      <>
        <div className="heading">
          <h2>
            Top Articles Related to Crypto Currency
          </h2>
        </div>
        <div style={{display:"flex","justifyContent":"center",alignItems:"center",margin:"10px 0"}}>
        {this.state.loading && <CircularProgress style={{color:"#08D9D6"}} thickness={2}/>}</div>
        <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<CircularProgress style={{color:"#08D9D6"}} thickness={2}/>}
          style={{ overflow: "hidden" }}
        ></InfiniteScroll>
          <div className="newsContainer">
            {this.state.articles
              ? this.state.articles.map((element) => {
                  return (
                    <NewsCard
                      title={element?.title}
                      description={element?.content}
                      imgUrl={element?.image_url}
                      key={element?.article_id}
                      myUrl={element?.link}
                      author={element?.creator}
                      date={element?.pubDate}
                   />
                  );
                })
              : ""}
          </div>
      </>
    );
  }
}
