import React, { Suspense, lazy, Component } from 'react';
import axios from "axios";
import Header from './components/header';
import "./App.css";

const Albums = lazy(() => import('./components/albums'));


class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get(`https://itunes.apple.com/us/rss/topalbums/limit=100/json`)
      .then(res => {
        this.setState({ posts: res.data.feed.entry });
      });
  }

  render() {
    const loadingImg = <div className="album-img">
      <img alt="loading" src="https://media0.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif?cid=ecf05e47u6mg2s52a1bg1h8u09lvbcoh93unv9ndwrfaq35k&ep=v1_gifs_related&rid=giphy.gif&ct=g" />
    </div>

    const albums = this.state.posts.map(e => {
      return (
        <Suspense key={e.id.label} fallback={loadingImg}>
          <Albums
            image={e["im:image"][2].label}
            title={e.title.label}
            link={e.id.label}
            price={e["im:price"].label}
            date={e["im:releaseDate"].label}
          />
        </Suspense>
      );
    });

    return (
      <div className="app">
        <Header />
        <div className="albums">
          {albums}
        </div>
      </div>
    );
  }
}

export default App;












