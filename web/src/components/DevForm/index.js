import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
  const [ github_username, setGithubUsername] = useState('');
  const [ techs, setTechs] = useState('');
  const [ latitude, setLatitude] = useState('');
  const [ longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },{
        timeout: 30000,
      }
    )
  }, []);// getCurrentPosition()

  async function handleSubmit(event) {
    event.preventDefault(); 
    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
    });// passed from props to run in App.js context
    setGithubUsername('');
    setTechs('');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do GitHub</label>
        <input
          name="github_username"
          id="github_username" 
          value={github_username}
          onChange={event => setGithubUsername(event.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias de interesse</label>
        <input
          name="techs"
          id="techs"
          value={techs}
          onChange={event => setTechs(event.target.value)}
          required
        />
      </div>
      
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type= "number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={event => setLongitude(event.target.value)}
            required 
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
