import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country, category, apiKey, pageSize, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async () => {
    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      const response = await fetch(url);
      setProgress(30);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText} (${response.status})`);
      }
      const data = await response.json();
      setProgress(70);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, apiKey, page, pageSize, setProgress]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - EarlyNews`;
    updateNews();
  }, [category, country, pageSize, updateNews]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    setPage(nextPage);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch more data: ${response.statusText} (${response.status})`);
      }
      const data = await response.json();
      setArticles((prevArticles) => prevArticles.concat(data.articles));
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Error fetching more data:', error.message);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      {articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={article.title || ''}
                    description={article.description || ''}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
