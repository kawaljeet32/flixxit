import React from 'react'
import CardSlider from './CardSlider'
import styled from 'styled-components';

export default function Slider({ movies }) {
    const getMoviesFromRange = (from, to) => {
      return movies.slice(from, to);
    };
    return (
        <Container>
          <CardSlider data={getMoviesFromRange(0, 10)} title="Trending" />
          <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
          <CardSlider
            data={getMoviesFromRange(20, 30)}
            title="Blockbuster"
          />
          <CardSlider
            data={getMoviesFromRange(30, 40)}
            title="Popular on Flixxit"
          />
          <CardSlider data={getMoviesFromRange(40, 50)} title="Action" />
          <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
        </Container>
      );
    }
    
    const Container = styled.div``;
