import React, { useState, useEffect } from 'react';
import {HiArrowCircleDown} from "react-icons/hi";
import {HiArrowCircleUp} from "react-icons/hi";
import '../css/currency.css';
import axios from 'axios';

let base_url = "https://api.freecurrencyapi.com/v1/latest";
let api_key = "fca_live_NHNXKegRSRTkI3hU0VqTg065VxH2zSOuHRkhF2Q2";

function Currency() {
  const [dolar, setDolar] = useState(null);
  const [euro, setEuro] = useState(null);
  const [avustralya, setAvustralya] = useState(null);
  const [rus, setRus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dolarResponse = await axios.get(`${base_url}?apikey=${api_key}&base_currency=USD`);
        setDolar(dolarResponse.data.data['TRY'].toFixed(3));

        const euroResponse = await axios.get(`${base_url}?apikey=${api_key}&base_currency=EUR`);
        setEuro(euroResponse.data.data['TRY'].toFixed(3));

        const avustralyaResponse = await axios.get(`${base_url}?apikey=${api_key}&base_currency=AUD`);
        setAvustralya(avustralyaResponse.data.data['TRY'].toFixed(3));  

        const rusResponse = await axios.get(`${base_url}?apikey=${api_key}&base_currency=RUB`);
        setRus(rusResponse.data.data['TRY'].toFixed(3)); 
      } catch (err) {
        setError("Döviz verilerini alırken bir hata oluştu.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className='currency-div'>
      <div style={{ fontFamily: 'arial', textAlign: 'center', width: '100%', color: 'aquamarine', marginTop: '5px' }}>
        <h3>PİYASA ÖZETİ</h3>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Hata mesajı eklendi */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{marginTop:'-20px'}}>
          <thead>
            <tr>
              <th style={{ visibility: 'hidden' }}>isim,kod</th>
              <th style={{ visibility: 'hidden' }}>fiyat,değişim</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{color:'white'}}>
              <td>DOLAR</td>
              <td>
                <span style={{marginLeft: '10px'}}>{dolar}</span>
                <span><HiArrowCircleDown style={{marginLeft: '10px', color:'red'}}/></span>
              </td>
            </tr>
            <hr></hr>
            <tr style={{color:'white'}}>
              <td>EURO</td>
              <td>
                <span style={{marginLeft: '10px'}}>{euro}</span>
                <span><HiArrowCircleUp style={{marginLeft: '10px', color:'green'}}/></span>
              </td>
            </tr>
            <hr></hr>

            <tr style={{color:'white'}}>
              <td>Avustralya Doları</td>
              <td>
                <span style={{marginLeft: '10px'}}>{avustralya}</span>
                <span><HiArrowCircleUp style={{marginLeft: '10px', color:'green'}}/></span>
              </td>
            </tr>
            <hr></hr>

            <tr style={{color:'white'}}>
              <td>Rus Rublesi</td>
              <td>
                <span style={{marginLeft: '10px'}}>{rus}</span>
                <span><HiArrowCircleDown style={{marginLeft: '18px', color:'red'}}/></span>
              </td>
            </tr>
            

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Currency;
