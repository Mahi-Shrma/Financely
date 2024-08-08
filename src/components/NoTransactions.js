import React from 'react';
import tran from '../images/pexels-gabby-k-6289028.jpg';

function NoTransactions() {
  return (
    <div
    style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem",
    }}
    >
        <img src={tran} style={{width:"400px", margin:"4rem"}}/>
        <p style={{textAlign:"center", fontSize:"1.2rem"}}>
            You Have No Transaction Currently
        </p>
    </div>
  );
}

export default NoTransactions;