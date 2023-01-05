import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Background = styled.div`
    background-size: 50% 50%;
    background-color: #35495e;
    width: 500px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 50px;
`
const Block = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TittleBox = styled.div`
    border: none;
    position: absolute;
    margin-right: 25px;
    left: 180px;
    top: 30px;
`

const ButtonBox = styled.div`
    border: none;
    position: absolute;
    margin-right: 25px;
    left: 140px;
    top: 330px;
`

const HomeButton = styled.button`
    border-radius: 10px;
    background-color: #5ca1e1;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 20px;
    padding: 16px;
    width: 220px;
`

const Title = styled.h1`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Description = styled.b`
    border: none;
    position: absolute;
    left: 20px;
    top: 150px;
    font: sans-serif;
    padding: 50px;
    color: grey;
    font-size: 1em;
`

function LandingPage() {
    return (
        <Background className="landing">
            <Block>
                <TittleBox>
                    <Title>PI FOOD</Title>
                </TittleBox>
                <Description>Welcome to the individual proyect<hr/> of Ezequiel Correcher</Description>
                <ButtonBox>
                    <Link to="/home">
                        <HomeButton>Click to Start</HomeButton>
                    </Link>
                </ButtonBox>

            </Block>
        </Background>
    )
}

export default LandingPage;