import type { NextPage } from 'next'
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { gql } from "@apollo/client";
import client from "../apollo-client";

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <p>Hello</p>
    </div> 
  )
}

export default Home