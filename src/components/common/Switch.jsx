import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatisticsContext } from '../../context/StatisticsContext';

const Switch = ({ checked, onChange }) => {
    const { monthCheckboxVisibility } = useContext(StatisticsContext)
    return (
      <StyledWrapper>
        <div className={`checkbox-wrapper-10 ${monthCheckboxVisibility}`}>
          <input 
            type="checkbox" 
            id="cb5" 
            className="tgl tgl-flip" 
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor="cb5" data-tg-on="Days" data-tg-off="Weeks" className="tgl-btn" />
        </div>
      </StyledWrapper>
    );
  }

const StyledWrapper = styled.div`
  .checkbox-wrapper-10 .tgl {
    display: none;
  }

  .checkbox-wrapper-10 .tgl,
    .checkbox-wrapper-10 .tgl:after,
    .checkbox-wrapper-10 .tgl:before,
    .checkbox-wrapper-10 .tgl *,
    .checkbox-wrapper-10 .tgl *:after,
    .checkbox-wrapper-10 .tgl *:before,
    .checkbox-wrapper-10 .tgl + .tgl-btn {
    box-sizing: border-box;
  }

  .checkbox-wrapper-10 .tgl::-moz-selection,
    .checkbox-wrapper-10 .tgl:after::-moz-selection,
    .checkbox-wrapper-10 .tgl:before::-moz-selection,
    .checkbox-wrapper-10 .tgl *::-moz-selection,
    .checkbox-wrapper-10 .tgl *:after::-moz-selection,
    .checkbox-wrapper-10 .tgl *:before::-moz-selection,
    .checkbox-wrapper-10 .tgl + .tgl-btn::-moz-selection,
    .checkbox-wrapper-10 .tgl::selection,
    .checkbox-wrapper-10 .tgl:after::selection,
    .checkbox-wrapper-10 .tgl:before::selection,
    .checkbox-wrapper-10 .tgl *::selection,
    .checkbox-wrapper-10 .tgl *:after::selection,
    .checkbox-wrapper-10 .tgl *:before::selection,
    .checkbox-wrapper-10 .tgl + .tgl-btn::selection {
    background: none;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:after,
    .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:after {
    left: 0;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    display: none;
  }

  .checkbox-wrapper-10 .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after,
    .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 4px;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after {
    content: attr(data-tg-on);
    background: #7802c6;
    transform: rotateY(-180deg);
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    background: #197dff;
    content: attr(data-tg-off);
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:active:before {
    transform: rotateY(-20deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:before {
    transform: rotateY(180deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: #7e09eb;
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:active:after {
    transform: rotateY(20deg);
  }`;

export default Switch;
