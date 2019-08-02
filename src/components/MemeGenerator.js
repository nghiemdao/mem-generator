import React, { Component } from "react";

class MemeGenerator extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg"
  };

  componentDidMount() {
    const memeApiUrl = "https://api.imgflip.com/get_memes";
    fetch(memeApiUrl)
      .then(response => response.json())
      .then(result => {
        const { memes } = result.data;
        this.setState({
          allMemeImgs: memes
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const randomIndex = this.getRandomInt(this.state.allMemeImgs.length);
    const randomMeme = allMemeImgs[randomIndex];

    this.setState({
      randomImg: randomMeme.url
    });
  };

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  render() {
    const { topText, bottomText, randomImg } = this.state;
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            value={topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={randomImg} alt="" />
          <h2 className="top">{topText}</h2>
          <h2 className="bottom">{bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
